using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.Models
{
    public class Review
    {

        public long Id { get; set; }
        public long HotelId { get; set; }
        public long UserId { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public int Rating { get; set; }
        public Hotel Hotel{ get; set; }
        public User User { get; set; }

    }
}
