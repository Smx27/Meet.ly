/* The code is a C# implementation of a RESTful API endpoint for user registration and login. It uses
the ASP.NET Core framework and Entity Framework Core for data access. The `AccountsController` class
defines two HTTP POST methods: `Register` and `Login`. */
using System.Security.Cryptography;
using System.Text;
using API.Controllers.DTO;
using API.Data;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        /// <summary>
        /// Constructor to Init Datacontext and Token services
        /// </summary>
        /// <param name="context"></param>
        /// <param name="tokenService"></param>
        public AccountsController(DataContext context,ITokenService tokenService, IMapper mapper)
        {
            _tokenService = tokenService;
            _mapper = mapper;
            _context =context;
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
            /* This code block is part of the `Register` method in the `AccountsController` class. It
            checks if the username provided in the `RegisterDTO` object already exists in the
            database by calling the `UserExist` method. If the username already exists, it returns a
            `BadRequest` response with the message "Username taken". If the username does not exist,
            it creates a new `AppUser` object with the username and a salted hash of the password
            using the `HMACSHA512` algorithm. The salt is generated using the `Key` property of the
            `HMACSHA512` object. The newly created `AppUser` object is then added to the database
            and a `UserDTO` object with the username and a JWT token is returned. */
            if (await UserExist(userDTO.Username)) 
                return BadRequest("Username taken");

            var user = _mapper.Map<AppUser> (userDTO);
            
            //Creating A salted Hash To generate Encoded Password
            /* This code block is part of the `Register` method in the `AccountsController` class. It
            creates a new `AppUser` object with the username and a salted hash of the password using
            the `HMACSHA512` algorithm. The salt is generated using the `Key` property of the
            `HMACSHA512` object. The `ComputeHash` method of the `HMACSHA512` object is used to
            generate the hash of the password, which is then stored in the `PasswordHash` property
            of the `AppUser` object. The `PasswordSalt` property of the `AppUser` object is set to
            the `Key` property of the `HMACSHA512` object, which is the randomly generated salt. */
            using var hmac =new HMACSHA512();
            
            user.UserName = userDTO.Username;
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
            user.PasswordSalt = hmac.Key;
            

            //If all dont then adding user in DB
           /* This code block is part of the `Register` method in the `AccountsController` class. It
           creates a new `AppUser` object with the username and a salted hash of the password using
           the `HMACSHA512` algorithm. The salt is generated using the `Key` property of the
           `HMACSHA512` object. The newly created `AppUser` object is then added to the database
           using `_context.Users.Add(user)` and saved using `await _context.SaveChangesAsync()`.
           Finally, a `UserDTO` object with the username and a JWT token is returned using `return
           new UserDTO{ Username=user.UserName, Token= _tokenService.CreateToken(user) }`. */
             _context.Users.Add(user);

            await _context.SaveChangesAsync();

            //Returning the newly created user details 
             return new UserDTO
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        [HttpPost("login")]
        [AllowAnonymous]
        /// <summary>
        /// Api endpoint to Login a user
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns>User Data</returns>
        public async Task<ActionResult<UserDTO>> Login(LoginDTO userDTO){
            //fetching the user
            var user = await _context.Users
            .Include(p=> p.Photos)
            .SingleOrDefaultAsync(u=> u.UserName==userDTO.Username);

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
                Token= _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(p=> p.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender
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