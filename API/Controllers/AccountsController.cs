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
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountsController : BaseApiController
{
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;
    private readonly UserManager<AppUser> _userManager;

    /// <summary>
    /// Constructor to Init Datacontext and Token services
    /// </summary>
    /// <param name="userManager"></param>
    /// <param name="tokenService"></param>
    /// <param name="mapper"></param>
    public AccountsController(UserManager<AppUser> userManager,ITokenService tokenService, IMapper mapper)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _mapper = mapper;
    }


    /// <summary>
    /// Api to Register User Through this Endpoint
    /// </summary>
    /// <param name="userDto"></param>
    /// <returns>Newly Created Users data</returns>
    [HttpPost("register")] //url: Api/accounts/register
    public async Task<ActionResult<UserDTO>> Register(RegisterDTO userDto)
    {
        //Checking if user exist in DB return error
        /* This code block is part of the `Register` method in the `AccountsController` class. It
        checks if the username provided in the `RegisterDTO` object already exists in the
        database by calling the `UserExist` method. If the username already exists, it returns a
        `BadRequest` response with the message "Username taken". If the username does not exist,
        it creates a new `AppUser` object with the username and a salted hash of the password
        using the `HMACSHA512` algorithm. The salt is generated using the `Key` property of the
        `HMACSHA512` object. The newly created `AppUser` object is then added to the database,
        and a `UserDTO` object with the username and a JWT token is returned. */
        if (await UserExist(userDto.Username)) 
            return BadRequest("Username taken");

        var user = _mapper.Map<AppUser> (userDto);
            
            
        user.UserName = userDto.Username;
          
        //If all don't, then add user in DB
        /* This code block is part of the `Register` method in the `AccountsController` class. It
        creates a new `AppUser` object with the username and a salted hash of the password using
        the `HMACSHA512` algorithm. The salt is generated using the `Key` property of the
        `HMACSHA512` object. The newly created `AppUser` object is then added to the database
        using `_context.Users.Add(user)` and saved using `await _context.SaveChangesAsync()`.
        Finally, a `UserDTO` object with the username and a JWT token is returned using `return
        new UserDTO{ Username=user.UserName, Token= _tokenService.CreateToken(user) }`. */
        var result = _userManager.CreateAsync(user,userDto.Password);
            
        if(!result.IsCompletedSuccessfully)
            if (result.Exception != null)
                return BadRequest(result.Exception.Message);

        var roleResult = await _userManager.AddToRoleAsync(user, "Member");

        if(!roleResult.Succeeded) return BadRequest(roleResult.Errors);
            
        //Returning the newly created user details 
        return new UserDTO
        {
            Username = user.UserName,
            Token = await _tokenService.CreateToken(user),
            KnownAs = user.KnownAs,
            Gender = user.Gender
        };
    }

    /// <summary>
    /// Api endpoint to Login a user
    /// </summary>
    /// <param name="userDto"></param>
    /// <returns>User Data</returns>
    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO userDto){
        //fetching the user
        var user = await _userManager.Users
            .Include(p=> p.Photos)
            .SingleOrDefaultAsync(u=> u.UserName==userDto.Username);

        //if no User Found Then Sending NULL/Unauth Error
        if(user==null) return Unauthorized();
            
        var result = await _userManager.CheckPasswordAsync(user, userDto.Password);
            

        if(!result) return Unauthorized("Invalid Password");

        //returning user If it's a valid user 
        return new UserDTO{
            Username=user.UserName,
            Token= await _tokenService.CreateToken(user),
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
        return await _userManager.Users.AnyAsync(u=> u.UserName == username.ToLower());
    }
}