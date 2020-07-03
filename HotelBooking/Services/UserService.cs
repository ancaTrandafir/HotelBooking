using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using HotelBooking.Models;
using HotelBooking.Helpers;
using Microsoft.EntityFrameworkCore;

namespace HotelBooking.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        User AuthenticateFacebook(User model);
        IEnumerable<UserGetModel> GetUsers();
        User GetCurrentUser(HttpContext httpContext);
        User GetById(long id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(long id);
        IEnumerable<UserGetModel> FilterUsersByCountRes(int count);

    }

    public class UserService : IUserService

    {

        private BookingsDbContext _dbContext;
        private readonly AppSettings _appSettings;

        public UserService(BookingsDbContext context, IOptions<AppSettings> appSettings, BookingsDbContext dbContext)
        {
            _appSettings = appSettings.Value;
            _dbContext = dbContext;
        }





        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _dbContext.Users.SingleOrDefault(x => x.Username == username);

            // // check if username is correct, else return null if user not found
            if (user == null)
                return null;

            // check if password is correct, else return null
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // authentication successful
            return user;         //user.WithoutPassword(); ;
        }




        public User AuthenticateFacebook(User userdata)
        {

            var alreadySaved = _dbContext.Users.Where(x => x.Token == userdata.Token).FirstOrDefault();

            if (alreadySaved != null)
            {
                return alreadySaved;
            }

            var user = new User
            {
                Id = userdata.Id,
                FirstName = userdata.FirstName,
                LastName = userdata.LastName,
                Email = userdata.Email,
                PictureURL = userdata.PictureURL,
                Role = "User"       // by default every user that signs-in with FB has User role
            };


            // generez propriul jwt token si nu folosesc token de la FB
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                     new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            user.Token = tokenHandler.WriteToken(token);


            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

            // authentication successful
            return user;    //user.WithoutPassword();

        }







        public IEnumerable<UserGetModel> GetUsers()
        {
            var result = _dbContext.Users.ToList();
            return result.Select(u => UserGetModel.GetUserModel(u, _dbContext));

        }









        public User GetCurrentUser(HttpContext httpContext)
        {
            string email = httpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email).Value;
            return _dbContext
                .Users
                .FirstOrDefault(u => u.Email == email);
        }







        public User GetById(long id)
        {
            return _dbContext.Users.Find(id);
        }








        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_dbContext.Users.Any(x => x.Username == user.Username))
                throw new AppException("Username \"" + user.Username + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

            return user;
        }








        public void Update(User userParam, string password = null)
        {
            var user = _dbContext.Users.Find(userParam.Id);

            if (user == null)
                throw new AppException("User not found");

            // update username if it has changed
            if (!string.IsNullOrWhiteSpace(userParam.Username) && userParam.Username != user.Username)
            {
                // throw error if the new username is already taken
                if (_dbContext.Users.Any(x => x.Username == userParam.Username))
                    throw new AppException("Username " + userParam.Username + " is already taken");

                user.Username = userParam.Username;
            }

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(userParam.FirstName))
                user.FirstName = userParam.FirstName;

            if (!string.IsNullOrWhiteSpace(userParam.LastName))
                user.LastName = userParam.LastName;

            // update password if provided
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
        }






        public void Delete(long id)
        {
            var user = _dbContext.Users.Find(id);
            if (user != null)
            {
                _dbContext.Users.Remove(user);
                _dbContext.SaveChanges();
            }
        }









        // private helper methods

        public static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }



        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }





        public IEnumerable<UserGetModel> FilterUsersByCountRes(int count)
        {
            var result = _dbContext.Users
                                      .Include(u => u.Reservations)
                                      .ToList();

            return result.Select(u => UserGetModel.GetUserModel(u, _dbContext))
                 .Where(u => u.CountReservations >= count);

        }
    }
}
