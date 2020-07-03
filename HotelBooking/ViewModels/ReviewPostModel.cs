using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.ViewModels
{
    public class ReviewPostModel
    {

        public long Id { get; set; }
        public long HotelId { get; set; } 
        public long UserId { get; set; } 
        public string Text { get; set; }
        public int Rating { get; set; }


    }
}
