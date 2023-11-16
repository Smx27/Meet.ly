using API.Controllers.DTO;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<IEnumerable<AppUser>> GetUsersAsync(); 
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        
        Task<MemberDTO> GetMemberAsync(string username);
        Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams);
        Task<string> GetUserGender(string username);
    }
}