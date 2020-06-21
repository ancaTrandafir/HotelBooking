using AutoMapper;
using HotelBooking.Models;
using HotelBooking.ViewModels;
using MoviesAPI.ViewModels;

namespace HotelBooking.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, AuthenticatePostModel>();
            CreateMap<RegisterModel, User>();
        }
    }
}