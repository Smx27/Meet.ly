using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        /// <summary>
        /// DataContext Variable
        /// </summary>
        //private readonly DataContext _context;
        
        /// <summary>
        /// Constructor to Init Userrepository
        /// </summary>
        private readonly IUserRepository _userRepository;

        /// <summary>
        /// Constructor to Init userrepository interface
        /// </summary>
        /// <param name="context"></param>
        public UsersController(IUserRepository userRepository)
        {
            this._userRepository = userRepository;
        }
        
        /// <summary>
        /// Api To get all User URL: api/users
        /// </summary>
        /// <returns>List Of all User in JSON</returns>
        [HttpGet]
        public async Task< ActionResult<IEnumerable<AppUser>>> GetUsers(){
            var Users = await _userRepository.GetUsersAsync();
            return Ok(Users);
        }

        [HttpGet("id/{id}")]
        /// <summary>
        /// Api to get Specific user using id URL:api/users/5
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Specific Users Details In JSON</returns>
        public async Task<ActionResult<AppUser>> GetUserbyID(int id)
        {
            return await _userRepository.GetUserByIdAsync(id);
        }

        [HttpGet("{username}")]
        /// <summary>
        /// Api to get Specific user using username URL:api/users/username
        /// </summary>
        /// <param name="username"></param>
        /// <returns>A specific user by username</returns>
        public async Task<ActionResult<AppUser>> GetUser(string username)
        {
            return await _userRepository.GetUserByUsernameAsync(username);
        }

    }
}