using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MoviesAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using HotelBooking.Services;
using HotelBooking;
using HotelBooking.ViewModels;

namespace HotelBooking.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [ApiController]
    [Route("[controller]")]
    public class ReservationsController : ControllerBase
    {

        private IReservationService reservationService;


        public ReservationsController(IReservationService reservationService)
        {
            this.reservationService = reservationService;
        }




        /// <summary>
        /// Retrieves a list of all reservtaions from DB.
        /// </summary>
        /// <returns>List of reservations</returns>
        // GET: /reservations
        //[AllowAnonymous]
        //[HttpGet]
        //public IActionResult GetReservations([FromQuery] PagingParameters pagingParameters)
        //{
        //    var reservations = reservationService.GetReservationsPaginated(pagingParameters);

        //    var metadata = new
        //    {
        //        reservations.TotalCount,
        //        reservations.PageSize,
        //        reservations.CurrentPage,
        //        reservations.TotalPages,
        //        reservations.HasNext,
        //        reservations.HasPrevious
        //    };

        //    Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

        //    return Ok(reservations);
        //}






        /// <summary>
        /// Retrieves a list of all reservations from DB.
        /// </summary>
        /// <returns>List of reservations</returns>
        // GET: /R
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetReservations()
        {
            var reservations = reservationService.GetReservations();

            return Ok(reservations);
        }







        /// <summary>
        /// Retrieves a specific reservation by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns the reservation specified by id.</returns>
        // GET: reservations/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public Reservation GetReservationById(long id)
        {
           return reservationService.GetReservationById(id);      
        }






        /// <summary>
        /// Retrieves filtered reservations, added between certain dates, also ordered by hotel.
        /// </summary>
        /// <remarks>
        /// Sample URL request:
        ///    https://localhost:44335/reservations/filter?$from=2020-05-15T00:00:00&to=2020-05-17T00:00:00
        /// Sample parameter: yyyy-MM-dd   
        /// </remarks>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <returns>A list of reservations with arrivalDate and departureDate between the two specified dates.</returns>
        // GET: reservations/filter?from=a&to=b
        [AllowAnonymous]
        [HttpGet("filter")]
        public IEnumerable<ReservationGetModel> GetFilteredReservations(
            [FromQuery] string from,
            [FromQuery] string to)
        {
            return reservationService.FilterByDate(from, to);
        }








        /// <summary>
        /// Edit any properties of a specific reservation you mention by id.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="reservation"></param>
        /// <returns></returns>
        // PUT: reservations/5
        [HttpPut("{id}")]
        public IActionResult PutReservation(long id, [FromBody] Reservation reservation)
        {
            var result = reservationService.Update(id, reservation);
            return Ok(result);
        }








        /// <summary>
        /// Creates a new reservation.
        /// </summary>
        /// <param name="reservation"></param>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /reservations
        ///      {
        ///         "HotelId": 1,
        ///         "Guest": "Anca Trandafir",
        ///         "NoOfPersons": 1,
        ///         "ArrivalDate": "2020-09-10",
        ///         "DepartureDate": "2020-09-12",
        ///         "RoomType": "Seaview",
        ///         "RoomFare": 250,
        ///         "BreakfastIncluded": True
        ///       }
        ///
        /// </remarks>
        /// <param name="reservation"></param>
        /// <returns>A newly created reservation.</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response> 
        // POST: /reservations
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public void PostReservation([FromBody] ReservationPostModel reservation)
        {
           
            reservationService.Create(reservation);
        }








        /// <summary>
        /// Deletes the reservation you specify by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns the deleted reservation.</returns>
        // DELETE: reservations/5
        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(long id)
        {
            var result = reservationService.Delete(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }








        private bool ReservationExists(long id)
        {
            return reservationService.GetReservations().Any(e => e.Id == id);
        }







        /// <summary>
        /// Retrieves filtered reservations by id of user that added it.
        /// </summary>
        /// <remarks>
        /// Sample URL request:
        ///    https://localhost:44331/reservations/filter?userId=2
        /// Sample parameter: 2  
        /// </remarks>
        /// <param name="userId"></param>
        /// <returns>A list of reservations with arrivalDate and departureDate between the two specified dates.</returns>
        // GET: reservations/filter?from=a&to=b
        [AllowAnonymous]
        [HttpGet("filter")]
        public IEnumerable<ReservationGetModel> GetFilteredReservations(
            [FromQuery] string userId )
        {
            return reservationService.FilterByUserId(userId);
        }

    }
}

