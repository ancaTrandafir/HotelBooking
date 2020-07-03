using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelBooking.Models;
using HotelBooking.Services;
using HotelBooking.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Newtonsoft.Json;

namespace HotelBooking.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private IHotelService hotelService;

        public HotelsController(IHotelService hotelService)
        {
            this.hotelService = hotelService;
        }




        // GET: /hotels
        /// <summary>
        ///  Retrieves a list of all hotels from DB.
        /// </summary>
        /// <returns>A list of hotels.</returns>
        //[AllowAnonymous]
        //[HttpGet]
        //public IActionResult GetHotelsPaginated([FromQuery] PagingParameters pagingParameters)
        //{
        //    var hotels = hotelService.GetHotelsPaginated(pagingParameters);

        //    var metadata = new
        //    {
        //        hotels.TotalCount,
        //        hotels.PageSize,
        //        hotels.CurrentPage,
        //        hotels.TotalPages,
        //        hotels.HasNext,
        //        hotels.HasPrevious
        //    };

        //    Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

        //    return Ok(hotels);
        //}









        ///// <summary>
        ///// Retrieves a list of all hotels from DB.
        ///// </summary>
        ///// <returns>List of hotels</returns>
        // GET: hotels
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetHotels()
        {
            var hotels = hotelService.GetHotels();

            return Ok(hotels);
        }











        // GET: /hotels/5
        /// <summary>
        ///  Retrieves a specific hotel by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A hotel with a specific id.</returns>
        [AllowAnonymous]
        [HttpGet("{id}")]
        public Hotel GetHotelById(long id)
        {
            return hotelService.GetHotelById(id);
        }











        /// <summary>
        /// Retrieves filtered hotels by city, descending ordered by rating.
        /// </summary>
        /// <remarks>
        /// Sample URL request:
        ///    https://localhost:44335/reservations/filter?$city=braila
        /// Sample parameter: braila  
        /// </remarks>
        /// <param name="city"></param>
        /// <returns>A list of hotels located in the specified city, descending ordered by rating.</returns>
        // GET: hotels/filter?$city=a
        [AllowAnonymous]
        [HttpGet("filter")]
        public IQueryable<HotelGetModel> GetFilteredHotels(
            [FromQuery] string city)
        {
            return hotelService.FilterByCity(city);
        }











        // PUT: hotel/5
        /// <summary>
        ///  Edit any properties of a specific hotel you mention by id.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="hotel"></param>
        /// <returns></returns>
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize(Roles = Role.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHotel(long id, Hotel hotel)
        {
            var result = hotelService.Update(id, hotel);
            return Ok(result);
        }








        /// <summary>
        ///  Creates a new hotel.
        /// </summary>
        /// <param name="hotel"></param>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /hotels
        ///      {
        ///         "HotelName": "Belvedere",
        ///         "City": "Cluj Napoca",
        ///         "Capacity": 154,
        ///         "Rating": 7.9
        ///       }
        ///
        /// </remarks>
        /// <returns>A newly created hotel.</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response> 
        // POST: /hotels
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize(Roles = Role.Admin)]
        [HttpPost]
        public void PostHotel(Hotel hotel)
        {
            hotelService.Create(hotel);

        }








        // DELETE: /hotels/5
        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public IActionResult DeleteHotel(long id)
        {
            var result = hotelService.Delete(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }






        private bool HotelExists(long id)
        {
            return hotelService.GetHotels().Any(h => h.Id == id);
        }







    }
}
