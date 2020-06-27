//using HotelBooking.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;


//// https://jasonwatmore.com/post/2019/10/16/aspnet-core-3-role-based-authorization-tutorial-with-example-api

//// The extension methods class adds a couple of simple convenience methods for removing passwords from User instances and IEnumerable<User> collections. 
//// These methods are called by the Authenticate, GetAll and GetById methods in the UserService to ensure the user objects returned don't include passwords.


//namespace HotelBooking.Helpers
//{
//    public class ExtensionMethods
//    {

//        public static IEnumerable<User> WithoutPasswords(this IEnumerable<User> users)
//        {
//            if (users == null) return null;

//            return users.Select(x => x.WithoutPassword());
//        }


//        public static User WithoutPassword(this User user)
//        {
//            if (user == null) return null;

//            user.PasswordHash = null;
//            user.PasswordSalt = null;

//            return user;
//        }
//    }

//}

