using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HotelBooking.Models
{
    public class UserGetModel
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public int CountReservations { get; set; }



        public static UserGetModel GetUserModel(User user, BookingsDbContext context)
        {
            return new UserGetModel        // populeaza cu date din User
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email, 
                Role = user.Role,
                CountReservations = context.Reservations
                               .Where(u => user.Id == u.UserId)
                               .Count(),
            };
        }

    }
}
