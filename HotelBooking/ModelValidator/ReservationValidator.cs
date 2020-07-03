using FluentValidation;
using HotelBooking.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.ModelValidator
{
	public class ReservationValidator : AbstractValidator<Reservation>
	{
		public ReservationValidator(BookingsDbContext context)
		{
			RuleFor(x => x.NoOfPersons).NotEmpty()
				.GreaterThan(0)
				.LessThan(4);

			RuleFor(x => x.ArrivalDate).NotEmpty();
			RuleFor(x => x.DepartureDate).NotEmpty();

			RuleFor(x => (x.ArrivalDate) > (DateTime.Now.Date));
			RuleFor(x => (x.DepartureDate) > (DateTime.Now.Date));
		}


	}
}

