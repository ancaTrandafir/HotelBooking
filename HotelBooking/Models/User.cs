using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HotelBooking.Models
{

    public class User 
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PictureURL { get; set; }
        [JsonIgnore]
        public byte[] PasswordHash { get; set; }
        [JsonIgnore]
        public byte[] PasswordSalt { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        [JsonIgnore]
        public List<Review> Reviews{ get; set; }
        [JsonIgnore] 
        public List<Reservation> Reservations{ get; set; }

       
    }
}
