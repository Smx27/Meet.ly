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
        /// Constructor to Init Automapper
        /// </summary>
        private readonly IMapper _mapper;
        
        /// <summary>
        /// Constructor to Init Userrepository
        /// </summary>
        /// <param name="userRepository"></param>
        /// <param name="mapper"></param> 
        public UsersController(IUserRepository userRepository,IMapper mapper) 
        {
            this._mapper = mapper;
            this._userRepository = userRepository;
        }
        
        /// <summary>
        /// Api To get all User URL: api/users
        /// </summary>
        /// <returns>List Of all User in JSON</returns>
        [HttpGet]
        public async Task< ActionResult<IEnumerable<MemberDTO>>> GetUsers(){
            var Users = await _userRepository.GetMembersAsync();
            return Ok(Users);
        }

        [HttpGet("id/{id}")]
        /// <summary>
        /// Api to get Specific user using id URL:api/users/5
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Specific Users Details In JSON</returns>
        public async Task<ActionResult<MemberDTO>> GetUserbyID(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            return Ok(_mapper.Map<MemberDTO>(user));
        }

        [HttpGet("{username}")]
        /// <summary>
        /// Api to get Specific user using username URL:api/users/username
        /// </summary>
        /// <param name="username"></param>
        /// <returns>A specific user by username</returns>
        public async Task<ActionResult<MemberDTO>> GetUser(string username)
        {
            var user = await _userRepository.GetMemberAsync(username);
            return Ok(user);
        }

    }
}