using API.Controllers.DTO;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikeRepository
    {
        Task<UserLike> GetUserLike(int SourceUserId, int TargetUserId);
        Task<AppUser> GetUserWithLike(int userId);
        Task<PagedList<LikeDTO>> GetUserLike(LikesParams likesParams);   
        
    }
}