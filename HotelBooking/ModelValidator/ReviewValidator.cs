using FluentValidation;
using HotelBooking.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.ModelValidator
{
    public class ReviewValidator : AbstractValidator<Review>
	{
		public ReviewValidator(BookingsDbContext context)
		{
			RuleFor(x => x.Text).NotEmpty()
				.MinimumLength(2);

			RuleFor(x => x.Rating).NotEmpty()
				.GreaterThan(0)
				.LessThan(11);

		}


	}
}
