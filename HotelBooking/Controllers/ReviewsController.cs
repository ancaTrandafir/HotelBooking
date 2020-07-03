using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelBooking.Models;
using HotelBooking.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;


namespace HotelBooking.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly BookingsDbContext _context;

        public ReviewsController(BookingsDbContext context)
        {
            _context = context;
        }




        // GET: /reviews
        /// <summary>
        /// Retrieves a list of all reviews from DB.
        /// </summary>
        /// <returns>List of reviews.</returns>
        [HttpGet]
        public ActionResult<IEnumerable<Review>> GetReviews()
        {
            return _context.Reviews.ToList();
        }





        /// <summary>
        /// Retrieves a specific review by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns the  specified review by id.</returns>
        // GET: /reviews/5
        [HttpGet("{id}")]
        public ActionResult<Review> GetReview(long id)
        {
            var review = _context.Reviews.Find(id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }





        /// <summary>
        /// Edit any properties of a specific review you mention by id.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="review"></param>
        /// <returns></returns>
        // PUT: reviews/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public IActionResult PutReview(long id, [FromBody] Review review)
        {
           

            if (id != review.Id)
            {
                return BadRequest();
            }

            _context.Entry(review).State = EntityState.Modified;

            try
            {
                 _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }







        /// <summary>
        /// Creates a new review.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /review
        ///          {
        ///            "HotelId": 2,
        ///            "UserId": 2,
        ///            "Text": "Awesome view to the ocean.",
        ///            "Rating": 9
        ///           }
        ///
        /// </remarks>
        /// <param name="review"></param>
        /// <returns>A newly created review.</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response> 
        // POST: /reviews
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public ActionResult<Review> PostReview(Review review)
        {

            _context.Reviews.Add(review);
            _context.SaveChanges();

            return CreatedAtAction("GetReview", new { id = review.Id }, review);
        }






        /// <summary>
        /// Deletes a specific review.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns the deleted review.</returns>
        // DELETE: /reviews/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Review>> DeleteReview(long id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return review;
        }






        private bool ReviewExists(long id)
        {
            return _context.Reviews.Any(r => r.Id == id);
        }







    }
}
