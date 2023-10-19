using System.Runtime.InteropServices.ComTypes;
using API.Controllers.DTO;
using API.Data;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LikesController : BaseApiController
    {
        private readonly IUserRepository _user;
        private readonly ILikeRepository _like;

        public LikesController(IUserRepository user, ILikeRepository like)
        {
            this._user = user;
            this._like = like;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = int.Parse(User.getID());
            var likedUser = await _user.GetUserByUsernameAsync(username);

            var sourceUser = await _like.GetUserWithLike(sourceUserId);

            if(likedUser == null) return NotFound();

            if(sourceUser.UserName == username) return  BadRequest("You can't like yourself"); 

            var userLike = await _like.GetUserLike(sourceUserId,likedUser.Id);

            if(userLike != null) return BadRequest("You already liked this user!");

            userLike = new UserLike
            {
                SourceUserId = sourceUser.Id,
                TargetUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike);

            if(await _user.SaveAllAsync()) return Ok();

            return BadRequest("Failed to like user");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDTO>>> GetUserLikes(string predicates){
            var users = await _like.GetUserLike(predicates, int.Parse(User.getID()));
            
            return Ok(users);
        }
    }
}