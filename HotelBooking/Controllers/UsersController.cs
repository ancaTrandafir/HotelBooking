using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MoviesAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;    
using Microsoft.Extensions.Options;
using HotelBooking.Services;
using HotelBooking.Helpers;
using HotelBooking.ViewModels;
using HotelBooking.Models;

namespace HotelBooking.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;



        public UsersController(IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }






        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticatePostModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });
            
            // return basic user info and authentication token
            return Ok(user);
        }






        [AllowAnonymous]
        [HttpPost("authenticate-facebook")]
        public IActionResult AuthenticateFacebook([FromBody]User model)     // fac POST cu date venite de la FB
        {
            var user = _userService.AuthenticateFacebook(model);

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.First().Errors;
                return BadRequest(new JsonResult(errors));              
            }
            // if (user != null)
            //    return Ok(new { message = "User data has already been saved." });
            //else return Ok(new { message = "User Login successful" });
            return Ok(user);


        }







        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterModel registerModel)
        {
            // map model to entity
            var user = _mapper.Map<User>(registerModel);

            try
            {
                // create user
                _userService.Create(user, registerModel.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }





        [Authorize(Roles = Role.Admin)]
        [HttpGet]
        public IActionResult GetAll()
        {
            var localUsers = _userService.GetUsers();
            var FBUsers = _userService.GetUsers();
            return Ok(localUsers);
        }





        [HttpGet("{id}")]
        public User GetUserById(int id)
        {
            return _userService.GetById(id);
        }
    }
}