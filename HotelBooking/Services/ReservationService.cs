using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using HotelBooking.ViewModels;
using MoviesAPI.ViewModels;
using HotelBooking.Models;

namespace HotelBooking.Services
{
    public interface IReservationService
    {
       // PaginatedList<ReservationGetModel> GetReservationsPaginated(PagingParameters pagingParameters);
        IEnumerable<ReservationGetModel> GetReservations();
        IEnumerable<ReservationGetModel> FilterByDate(string from, string to);
        IEnumerable<ReservationGetModel> FilterByUserAndDate(string userId, string from, string to);
        IQueryable<ReservationGetModel> FilterByUserId(string id);
        Reservation GetReservationById(long id);
        Reservation Create(ReservationPostModel reservation);
        Reservation Update(long id, Reservation reservation);
        Reservation Delete(long id);
    }


    public class ReservationService : IReservationService
    {
        private BookingsDbContext context;


        public ReservationService(BookingsDbContext context) {
            this.context = context;
        }



        public Reservation Create(ReservationPostModel reservation)
        {
            Reservation reservationToAdd = ReservationPostModel.PostReservationModel(reservation);

            context.Reservations.Add(reservationToAdd);
            context.SaveChanges();
            return reservationToAdd;
        }






        public Reservation Delete(long id)
        {
            var existing = context.Reservations
              //  .Include(m => m.User)
              //  .Include(m => m.UserId)
                .FirstOrDefault(movie => movie.Id == id);
            if (existing == null)
            {
                return null;
            }
            context.Remove(existing);
            context.SaveChanges();

            return existing;
        }












        // Nepaginat
        public IEnumerable<ReservationGetModel> GetReservations()    
        {
            IQueryable<Reservation> result = context.Reservations;

            return result.Select(r => ReservationGetModel.GetReservationModel(r, context));
        }









        public IEnumerable<ReservationGetModel> FilterByDate(string from, string to)
        { 
            DateTime fromDate = DateTime.Parse(from);
            DateTime toDate = DateTime.Parse(to);
    
            var result = this.GetReservations()      
                .Where(r => (r.ArrivalDate > fromDate) && (r.DepartureDate < toDate));

            var query = result
                .OrderBy(r => r.ArrivalDate);

            return query;
        }









        public IEnumerable<ReservationGetModel> FilterByUserAndDate(string userId, string from, string to)
        {
            DateTime fromDate = DateTime.Parse(from);
            DateTime toDate = DateTime.Parse(to);

            var result = this.GetReservations()
                .Where(r => (r.ArrivalDate > fromDate) && (r.DepartureDate < toDate));

            var query = result
                .Where(r => r.UserId == Convert.ToInt64(userId))
                .OrderBy(r => r.ArrivalDate);

            return query;
        }











        public Reservation GetReservationById(long id)
        {
            return context.Reservations
             //   .Include(r => r.User)  // ?????
                .FirstOrDefault(r => r.Id == id);
        }








        public Reservation Update(long id, Reservation reservation)
        {
            var existing = context.Reservations.AsNoTracking()
                .Include(r => r.User);
            //.FirstOrDefault(r => r.Id == id);

            if (existing == null)
            {
                context.Reservations.Add(reservation);
                context.SaveChanges();
                return reservation;
            }

            reservation.Id = id;
            context.Reservations.Update(reservation);
            context.SaveChanges();
            return reservation;
        }









        public IQueryable<ReservationGetModel> FilterByUserId(string id)
        {
            long userId = long.Parse(id);

            IQueryable<Reservation> reservations = context.Reservations
                .Where(r => r.UserId == userId);

            var query =  reservations
                .OrderBy(r => r.ArrivalDate);

            return query.Select(r => ReservationGetModel.GetReservationModel(r, context));

        }
    }
}
