using HotelBooking;
using HotelBooking.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Movies.Models
{
    public static class BookingsDbSeeder
    {

        public static void Initialize(BookingsDbContext context)

        {
            if (context.Hotels.Count() >= 100)
            {
                return;
            }


            for (int i = 1; i <= 50; ++i)
            {
                context.Hotels.Add(
                    new Hotel
                    {
                        HotelName = $"Hotel-{i}",
                        City = $"City-{i}",
                        Capacity = i,
                        Rating = i
                    }
                );

                context.SaveChanges();

            }
        }

    }
}
