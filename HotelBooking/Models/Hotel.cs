using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;

namespace HotelBooking

{
    public class Hotel
    {

        public long Id { get; set; }
        public string HotelName { get; set; }
        public string City { get; set; }
        public int Capacity{ get; set; }
        public float Rating { get; set; }

    }
}
