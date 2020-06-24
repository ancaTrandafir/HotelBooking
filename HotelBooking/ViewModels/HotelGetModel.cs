using HotelBooking.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.ViewModels
{
    public class HotelGetModel
    {

        public long Id { get; set; }
        public string HotelName { get; set; }
        public string City { get; set; }
        public int Capacity { get; set; }
        public double Rating{ get; set; }
        public int UserCount { get; set; }




        public static HotelGetModel GetHotelModel(Hotel hotel, BookingsDbContext context)     
        {
            return new HotelGetModel
            {
                Id = hotel.Id,
                HotelName = hotel.HotelName,
                City = hotel.City,
                Capacity = hotel.Capacity,
                Rating = hotel.Rating,

                UserCount = context.UsersAtHotels
                        .Where(u => hotel.Id == u.HotelId)
                        .Count()

            };
        }


     
    }
}
