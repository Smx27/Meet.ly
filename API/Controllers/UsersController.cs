using API.Controllers.DTO;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        private readonly IPhotoService _photoService;
        public UsersController(IUserRepository userRepository,IMapper mapper, IPhotoService photoService) 
        {
            this._photoService = photoService;
            this._mapper = mapper;
            this._userRepository = userRepository;
        }
        
        /// <summary>
        /// Api To get all User URL: api/users
        /// </summary>
        /// <returns>List Of all User in JSON</returns>
        [HttpGet]
        public async Task< ActionResult<PagedList<MemberDTO>>> GetUsers([FromQuery]UserParams userParams){

            var currentUser = await _userRepository.GetUserByUsernameAsync(User.getUserName());

            userParams.CurrentUsername = currentUser.UserName;
            
            if(string.IsNullOrEmpty(userParams.Gender)){
                userParams.Gender = currentUser.Gender == "male" ? "female" : "male";
            }

            var Users = await _userRepository.GetMembersAsync(userParams);

            Response.AddPaginationHeader(new PaginationHeader(Users.CurrentPage,Users.PageSize,Users.TotalCount,Users.TotalPages));
            
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

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO member){

            var user = await _userRepository.GetUserByUsernameAsync(User.getUserName());

            if(user==null) return BadRequest();

            _mapper.Map(member,user);

            if(await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("unable to update user");
        } 

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDTO>> AddPhoto(IFormFile file){
            var user = await _userRepository.GetUserByUsernameAsync(User.getUserName());

            if(user == null) return NotFound();

            var result = await _photoService.AddPhotoAsync(file);

            if(result.Error != null) return BadRequest(result.Error.Message);

            var Photo = new Photo{
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if(user.Photos.Count == 0) Photo.IsMain = true;

            user.Photos.Add(Photo);

           if (await _userRepository.SaveAllAsync()) {
            return CreatedAtAction(nameof(GetUser),new {username = user.UserName}, _mapper.Map<PhotoDTO>(Photo));
           }

           return BadRequest("Error while adding photo!");
        }
        [HttpPost("add-photo-local")]
        public async Task<ActionResult<PhotoDTO>> AddPhotoToLocsl(IFormFile file){
            var user = await _userRepository.GetUserByUsernameAsync(User.getUserName());

            if(user == null) return NotFound();

            var result = await _photoService.AddPhotoAsync(file);

            if(result.Error != null) return BadRequest(result.Error.Message);

            var Photo = new Photo{
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if(user.Photos.Count == 0) Photo.IsMain = true;

            user.Photos.Add(Photo);

           if (await _userRepository.SaveAllAsync()) {
            //send 201 result
            return CreatedAtAction(nameof(GetUser),new {username = user.UserName}, _mapper.Map<PhotoDTO>(Photo));
           }

           return BadRequest("Error while adding photo!");
        }

        [HttpPut("add-main-photo/{photoId}")]
        public async Task<ActionResult> addMainPhoto(int photoId){
            AppUser user = await _userRepository.GetUserByUsernameAsync(User.getUserName());
            if(user == null) return NotFound();

            var photo = user.Photos.FirstOrDefault(p=> p.Id == photoId);

            if(photo == null) return NotFound();
            
            if(photo.IsMain) return BadRequest("Photo already set to main.");

            var currentPhoto = user.Photos.FirstOrDefault(p=> p.IsMain);

            if(currentPhoto != null) currentPhoto.IsMain = false;

            photo.IsMain = true;

            if(await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Problem while setting the photo as main");
            
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId){
            AppUser user = await _userRepository.GetUserByUsernameAsync(User.getUserName());
            if(user == null) return NotFound();

            var photo = user.Photos.FirstOrDefault(p=> p.Id == photoId);

            if(photo == null) return NotFound();

            if(photo.IsMain) return BadRequest("This is your main photo you cant delete!");

            if(!string.IsNullOrEmpty(photo.PublicId)){
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if(result.Error != null) return BadRequest(result.Error.Message);
            }
            user.Photos.Remove(photo);
            if(await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Problem while setting the photo as main");
            
        }
    }
}