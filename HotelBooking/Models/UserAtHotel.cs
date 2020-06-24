using HotelBooking.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;

namespace HotelBooking

{
    public class UserAtHotel
    {

        public long Id { get; set; }
        public long HotelId { get; set; }
        public Hotel Hotel { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }


    }
}
