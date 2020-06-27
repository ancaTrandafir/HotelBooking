using HotelBooking;
using HotelBooking.Models;
using HotelBooking.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Movies.Models
{
    public static class BookingsDbSeeder
    {


        public static byte[] SHA512(string input)
        {
            var bytes = System.Text.Encoding.UTF8.GetBytes(input);
            using (var hash = System.Security.Cryptography.SHA512.Create())
            {
                var hashedInputBytes = hash.ComputeHash(bytes);

                return hashedInputBytes;
            }
        }


        public static byte[] SaltedPassword(string username, string password)
        {
            byte[] pwdBytes = Encoding.UTF8.GetBytes(password);
            // byte[] salt = BitConverter.GetBytes(userId);
            byte[] salt = Encoding.UTF8.GetBytes(username);
            byte[] saltedPassword = new byte[pwdBytes.Length + salt.Length];

            Buffer.BlockCopy(pwdBytes, 0, saltedPassword, 0, pwdBytes.Length);
            Buffer.BlockCopy(salt, 0, saltedPassword, pwdBytes.Length, salt.Length);

            SHA1 sha = SHA1.Create();

            return sha.ComputeHash(saltedPassword);
        }



        public static void Initialize(BookingsDbContext context)

        {
            if (context.Users.Count() > 4) // la momentul seed-ului am 3 inregistrari in DB, de-asta 3
            {
                return;
            }

            context.Users.AddRange(
                new User
                {
                    FirstName = "Admin",
                    LastName = "Admin",
                    Username = "admin",
                    PasswordHash = SHA512("admin"),
                    PasswordSalt = SaltedPassword("admin", "admin"),
                    Role = Role.Admin
                },

                 new User
                 {
                     FirstName = "Anda",
                     LastName = "Murarescu",
                     Username = "anda",
                     PasswordHash = SHA512("anda"),
                     PasswordSalt = SaltedPassword("anda", "anda"),
                     Role = Role.User
                 }

                 );





            if (context.Hotels.Count() >= 100)
            {
                return;
            }


            for (int i = 1; i <= 50; ++i)
            {
                context.Hotels.Add(
                    new Hotel
                    {
                        HotelName = $"Hotel-{i}",
                        City = $"City-{i}",
                        Capacity = i,
                        Rating = i
                    }
                );

                context.SaveChanges();

            }
        }

    }
}
