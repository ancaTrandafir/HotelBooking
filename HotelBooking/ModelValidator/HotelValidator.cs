using FluentValidation;
using HotelBooking.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.ModelValidator
{
	public class HotelValidator : AbstractValidator<Hotel>
	{
		public HotelValidator(BookingsDbContext context)
		{
			RuleFor(x => x.HotelName).NotEmpty()
				.MinimumLength(3)
				.MaximumLength(100);

			RuleFor(x => x.Capacity).NotEmpty()
				.GreaterThan(0);

			//RuleFor(x => x.Rating).NotEmpty()
			//	.GreaterThan(0)
			//	.LessThan(11);

		}


	}
}

