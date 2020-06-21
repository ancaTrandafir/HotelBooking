using HotelBooking;
using HotelBooking.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.ViewModels
{
    public class ReservationPostModel                     
                                                   
    {
        public long Id { get; set; }
        public long HotelId { get; set; }
        public string Guest { get; set; }
        public int NoOfPersons { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime DepartureDate { get; set; }
        public RoomType RoomType { get; set; }
        public float RoomFare { get; set; }
        public bool BreakfastIncluded { get; set; }
        public User User { get; set; }
        public Hotel Hotel { get; set; }


        public static Reservation PostReservationModel(ReservationPostModel reservation)           
        {                                                                  
            return new Reservation     
            {
                Id = reservation.Id,
                HotelId = reservation.HotelId,
                Guest = reservation.Guest,
                NoOfPersons = reservation.NoOfPersons,
                ArrivalDate = reservation.ArrivalDate,
                DepartureDate = reservation.DepartureDate,
                RoomType = reservation.RoomType,
                RoomFare = reservation.RoomFare,
                BreakfastIncluded = reservation.BreakfastIncluded,

            };
        }
    }
}
