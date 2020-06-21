using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.Models
{
    public class Review
    {

        public int Id { get; set; }
        public long HotelId { get; set; } 
        public long UserId { get; set; } 
        public string Text { get; set; }
        public int Rating { get; set; }
        public Hotel Hotel{ get; set; }
        public User User { get; set; }

    }
}
