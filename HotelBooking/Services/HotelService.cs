using MoviesAPI.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using HotelBooking.Models;
using HotelBooking.ViewModels;

namespace HotelBooking.Services
{
    public interface IHotelService
    {
        PaginatedList<HotelGetModel> GetHotelsPaginated(PagingParameters pagingParameters);
        IEnumerable<HotelGetModel> GetHotels();
        IQueryable<HotelGetModel> FilterByCity(string city); //, PagingParameters pagingParameters);
        Hotel GetHotelById(long id);
        Hotel Create(Hotel hotel);
        Hotel Update(long id, Hotel hotel);
        Hotel Delete(long id);
    }


    public class ReviewService : IHotelService
    {
        private BookingsDbContext context;
       


        public ReviewService(BookingsDbContext context)         {
            this.context = context;
      
        }



        //public Movie Create(Movie movieToAdd)
        //{
        //    // TODO: how to store the user that added the movie as a field in Movie?
        //    context.Movies.Add(movieToAdd);
        //    context.SaveChanges();
        //    return movieToAdd;
        //}





        public Hotel Create(Hotel hotel)
        { 
            context.Hotels.Add(hotel);
            context.SaveChanges();
            return hotel;
        }






        public Hotel Delete(long id)
        {
            var existing = context.Hotels
                .Include(m => m.Reviews)
                .FirstOrDefault(hotel => hotel.Id == id);
            if (existing == null)
            {
                return null;
            }
            context.Remove(existing);
            context.SaveChanges();

            return existing;
        }








        public PaginatedList <HotelGetModel> GetHotelsPaginated(PagingParameters pagingParameters)
        {
            var result = context.Hotels
                .OrderBy(h => h.Id)
                .Select(h => HotelGetModel.GetHotelModel(h, context));

            var resultList = result
                .Skip(pagingParameters.PageNumber * pagingParameters.PageSize)
                .Take(pagingParameters.PageSize)
                .ToList();

            var totalItems = resultList.Count();

            var paginatedList = new PaginatedList<HotelGetModel>(totalItems, pagingParameters.PageNumber, pagingParameters.PageSize);
            paginatedList.Items.AddRange(resultList);

            return paginatedList;

            
        }









        // Nepaginat
        public IEnumerable<HotelGetModel> GetHotels()    
        {
            IQueryable<Hotel> result = context.Hotels
                                        .Include(h => h.Reviews);

            return result.Select(h => HotelGetModel.GetHotelModel(h, context));
        }










        public IQueryable<HotelGetModel> FilterByCity(string city) //, PagingParameters pagingParameters)
        {
            IQueryable<Hotel> hotels = context.Hotels
                .OrderBy(h => h.Id)
                .Include(h => h.Reviews)
                .Where(h => (h.City.ToLower() == city))
                .OrderByDescending(h => h.Rating);

            return hotels.Select(h => HotelGetModel.GetHotelModel(h, context)); //, pagingParameters.PageNumber, pagingParameters.PageSize);
        }









        public Hotel GetHotelById(long id)
        {

            return context.Hotels
                .Include(h => h.Reviews)
                .FirstOrDefault(h => h.Id == id);
        }








        public Hotel Update(long id, Hotel hotel)
        {
            var existing = context.Hotels.AsNoTracking().FirstOrDefault(h => h.Id == id);
            
            if (existing == null)
            {
                context.Hotels.Add(hotel);
                context.SaveChanges();
                return hotel;
            }

            hotel.Id = id;
            context.Hotels.Update(hotel);
            context.SaveChanges();
            return hotel;
        }




    }
}
