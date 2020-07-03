using HotelBooking.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Runtime.Serialization;

namespace HotelBooking

{
    public enum RoomType
    {
        [EnumMember]
        Economy,
        Balcony,
        Seaview,
        Deluxe
    }

    public class Reservation
    {

        public long Id { get; set; }
        [Required]
        public long UserId { get; set; }
        [Required]
        public long HotelId { get; set; }
        [Required]
        public string Guest { get; set; }
        [Required]
        public int NoOfPersons { get; set; }
        [DataType(DataType.Date)]
        [Required]
        public DateTime ArrivalDate { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime DepartureDate { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public RoomType RoomType { get; set; }
        public float RoomFare { get; set; }
        public bool BreakfastIncluded { get; set; }
        public User User;
        public Hotel Hotel;

    }
}
