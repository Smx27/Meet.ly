using API.Controllers.DTO;
using API.Entities;

namespace API.Interfaces
{
    public interface ILikeRepository
    {
        Task<UserLike> GetUserLike(int SourceUserId, int TargetUserId);
        Task<AppUser> GetUserWithLike(int userId);
        Task<IEnumerable<LikeDTO>> GetUserLike(string pradicate, int userId);   
        
    }
}