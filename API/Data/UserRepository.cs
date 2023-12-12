using API.Controllers.DTO;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            this._mapper = mapper;
            this._context = context;
        }

        public async Task<MemberDTO> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x=> x.UserName == username)
                .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }
        
        public async Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users
                .AsQueryable();

            query = query.Where(u=> u.UserName != userParams.CurrentUsername);
            query = query.Where(u=> u.Gender == userParams.Gender);

            var minDOB = DateOnly.FromDateTime(DateTime.Now.AddYears(-userParams.MaxAge -1));
            var maxDOB = DateOnly.FromDateTime(DateTime.Now.AddYears(-userParams.MinAge));

            query = query.Where(u=> u.DateOfBirth >= minDOB && u.DateOfBirth <= maxDOB);
            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u=> u.Created),
                _ => query.OrderByDescending(u=> u.LastActive)
            };

            return await PagedList<MemberDTO>.CreateAsync(
                query.AsNoTracking().ProjectTo<MemberDTO>(_mapper.ConfigurationProvider),
                userParams.PageNumber,
                userParams.PageSize
                );
        }

        /// <summary>
        /// Get User by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
        /// <summary>
        /// Get User by username
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p=> p.Photos)
                .SingleOrDefaultAsync(u=> u.UserName == username);
        }

        public async Task<string> GetUserGender(string username)
        {
            return await _context.Users.Where(u=> u.UserName == username).Select(u=> u.Gender).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Get all Users
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p=> p.Photos)
                .ToListAsync();
        }

        /// <summary>
        /// Update User and modified the state
        /// </summary>
        /// <param name="user"></param>
        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}