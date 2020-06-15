using AutoMapper;
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