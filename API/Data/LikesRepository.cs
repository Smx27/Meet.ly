using API.Controllers.DTO;
using API.Entities;
using API.Extensions;
using API.Helpers;
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

        public async Task<PagedList<LikeDTO>> GetUserLike(LikesParams likesParams)
        {
            var users = _context.Users.OrderBy(u=> u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();
            
            if(likesParams.Predicates == "liked"){
                likes = likes.Where(l=> l.SourceUserId == likesParams.UserId);
                users = likes.Select(l=> l.TargetUser);
            }

            if(likesParams.Predicates == "likedBy"){
                likes = likes.Where(l=> l.TargetUserId == likesParams.UserId);
                users = likes.Select(l=> l.SourceUser);
            }
            
            var likedUsers =  users.Select(u=> new LikeDTO
            {
                UserName = u.UserName,
                KnownAs = u.KnownAs,
                Age = u.DateOfBirth.CalculateAge(),
                City = u.City,
                Id = u.Id,
                PhotoUrl = u.Photos.FirstOrDefault(p=> p.IsMain).Url
            });
            
            return await PagedList<LikeDTO>.CreateAsync(likedUsers,likesParams.PageNumber,likesParams.PageSize);
        }

        public async Task<AppUser> GetUserWithLike(int userId)
        {
            return await _context.Users
            .Include(u=> u.LikedUsers)
            .FirstOrDefaultAsync(u=> u.Id == userId);
        }
    }
}