using API.Data;
using API.Entities;
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
        private readonly DataContext _context;
        
        /// <summary>
        /// Constructor to Init DataContext
        /// </summary>
        /// <param name="context"></param>
        public UsersController(DataContext context)
        {
            _context = context;   
        }
        
        [AllowAnonymous]
        /// <summary>
        /// Api To get all User URL: api/users
        /// </summary>
        /// <returns>List Of all User in JSON</returns>
        [HttpGet]
        public async Task< ActionResult<IEnumerable<AppUser>>> GetUsers(){
            var Users= await _context.Users.ToListAsync();
            return Users;
        }

        /// <summary>
        /// Api to get Specific user using id URL:api/users/5
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Specific Users Details In JSON</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }

    }
}