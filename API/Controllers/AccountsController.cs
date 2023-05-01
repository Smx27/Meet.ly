using System.Security.Cryptography;
using System.Text;
using API.Controllers.DTO;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        /// <summary>
        /// Constructor to Init Datacontext and Token services
        /// </summary>
        /// <param name="context"></param>
        /// <param name="tokenService"></param>
        public AccountsController(DataContext context,ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context=context;
        }   
        
        
        [HttpPost("register")] //url: Api/accounts/register
        /// <summary>
        /// Api to Register User Through this Endpoint
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns>Newly Created Users data</returns>
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO userDTO)
        {
            //Checking if user exist in DB return error
            if (await UserExist(userDTO.Username)) 
                return BadRequest("Username taken");
            
            //Creating A salted Hash To generate Encoded Password
            using var hmac =new HMACSHA512();
            var user= new AppUser{
                UserName=userDTO.Username,
                PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password)),
                PasswordSalt=hmac.Key
            };

            //If all dont then adding user in DB
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            //Returning the newly created user details 
            return new UserDTO{
                Username=user.UserName,
                Token= _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        /// <summary>
        /// Api endpoint to Login a user
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns>User Data</returns>
        public async Task<ActionResult<UserDTO>> Login(LoginDTO userDTO){
            //fetching the user
            var user = await _context.Users.SingleOrDefaultAsync(u=> u.UserName==userDTO.Username);

            //if no User Found Then Sending NULL/Unauth Error
            if(user==null) return Unauthorized();

            //building Hased string which is provided bu the user to check from db
            using var hmac = new HMACSHA512(user.PasswordSalt);
             var Hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
            for (int i=0; i < Hash.Length;i++)
            {
                if(Hash[i]!=user.PasswordHash[i]) return Unauthorized("invalid Password !!");
            }

            //returning user If its a valid user 
            return new UserDTO{
                Username=user.UserName,
                Token= _tokenService.CreateToken(user)
            };
        }

        /// <summary>
        /// Method To check is user exist in DB 
        /// </summary>
        /// <param name="username"></param>
        /// <returns>True/False</returns>
        private async Task<bool> UserExist(string username)
        {
            return await _context.Users.AnyAsync(u=> u.UserName == username.ToLower());
        }
    }
}