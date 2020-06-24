using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelBooking.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;


namespace HotelBooking.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersAtHotelsController : ControllerBase
    {
        private readonly BookingsDbContext _context;

        public UsersAtHotelsController(BookingsDbContext context)
        {
            _context = context;
        }




        /// <summary>
        ///  Retrieves how many times a user made a reservation to a specific hotel.
        /// </summary>
        /// <remarks>
        /// Sample URL request:
        ///    https://localhost:44331/usersathotels/filter?$hotelId=2&userId=1
        /// Sample parameter: 2
        /// </remarks>
        /// <param name="hotelId"></param>
        /// <param name="userId"></param>
        /// <returns>A count.</returns>
        // GET: usersathotels/filter?from=a&to=b
        [HttpGet("filter")]
        public int GetCountOfUsersByIDHotel(
           //  [FromQuery] long hotelId,
             [FromQuery] long userId         )         
        {
            var count = _context.UsersAtHotels
               // .Where(u => u.HotelId == hotelId && u.UserId == userId)
                .Where(u => u.UserId == userId)
                .Count();
                
                

            return count;
        }


     /// Retrieves how many times a user made a reservation to a specific hotel.





    }
}
