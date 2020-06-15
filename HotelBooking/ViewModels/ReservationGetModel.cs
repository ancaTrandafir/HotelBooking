using HotelBooking.Models;
using MoviesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.ViewModels
{
    public class ReservationGetModel
    {

        public long Id { get; set; }
        public string Guest { get; set; }
        public int NoOfPersons { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime DepartureDate { get; set; }
        public RoomType RoomType { get; set; }
        public float RoomFare { get; set; }
        public bool BreakfastIncluded { get; set; }
        public User User { get; set; }
        public Hotel Hotel { get; set; }



        public static ReservationGetModel GetReservationModel(Reservation reservation, BookingsDbContext context)      
        {

            return new ReservationGetModel       
            {
                Id = reservation.Id,
                Guest = reservation.Guest,
                NoOfPersons = reservation.NoOfPersons,
                ArrivalDate = reservation.ArrivalDate,
                DepartureDate = reservation.DepartureDate,
                RoomType = reservation.RoomType,
                RoomFare = reservation.RoomFare,
                BreakfastIncluded = reservation.BreakfastIncluded,

                Hotel = context.Hotels
                        .FirstOrDefault(h => reservation.HotelId == h.Id),

                User = context.Users     
                        .FirstOrDefault(u => reservation.UserId == u.Id),

            };
        }


     
    }
}
