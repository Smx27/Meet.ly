using API.Controllers.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikeRepository
    {
        private readonly DataContext _context;
        public LikesRepository(DataContext context)
        {
            this._context = context;
            
        }
        public async Task<UserLike> GetUserLike(int SourceUserId, int TargetUserId)
        {
            return await _context.Likes.FindAsync(SourceUserId,TargetUserId);
        }

        public async Task<IEnumerable<LikeDTO>> GetUserLike(string pradicate, int userId)
        {
            var users = _context.Users.OrderBy(u=> u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();
            
            if(pradicate == "liked"){
                likes = likes.Where(l=> l.SourceUserId == userId);
                users = likes.Select(l=> l.TargetUser);
            }

            if(pradicate == "likedBy"){
                likes = likes.Where(l=> l.TargetUserId == userId);
                users = likes.Select(l=> l.SourceUser);
            }
            
            return await users.Select(u=> new LikeDTO
            {
                UserName = u.UserName,
                KnownAs = u.KnownAs,
                Age = u.DateOfBirth.CalculateAge(),
                City = u.City,
                Id = u.Id,
                PhotoUrl = u.Photos.FirstOrDefault(p=> p.IsMain).Url
            }).ToListAsync();
        }

        public async Task<AppUser> GetUserWithLike(int userId)
        {
            return await _context.Users
            .Include(u=> u.LikedUsers)
            .FirstOrDefaultAsync(u=> u.Id == userId);
        }
    }
}