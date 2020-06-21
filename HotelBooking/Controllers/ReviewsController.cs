using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelBooking.Models;
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
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            return await _context.Reviews.ToListAsync();
        }





        /// <summary>
        /// Retrieves a specific review by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns the  specified review by id.</returns>
        // GET: /reviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReviews(int id)
        {
            var review = await _context.Reviews.FindAsync(id);

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
        public async Task<IActionResult> PutReview(int id, Review review)
        {
            if (id != review.Id)
            {
                return BadRequest();
            }

            try
            {
                await _context.SaveChangesAsync();
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
        ///            "MovieId": 2,
        ///            "Text": "Awesome view to the ocean.",
        ///            "Rating": 9.5
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
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReview", new { id = review.Id }, review);
        }






        /// <summary>
        /// Deletes a specific review.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns the deleted review.</returns>
        // DELETE: /reviews/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Review>> DeleteReview(int id)
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






        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(r => r.Id == id);
        }







    }
}
