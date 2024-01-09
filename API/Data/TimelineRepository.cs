using API.Controllers.DTO;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TimelineRepository : ITimelineRepository
    {
        private readonly DataContext _context;
        public ILikeRepository _LikeRepository { get; }
        private readonly IMapper _mapper;
        public TimelineRepository(DataContext context, ILikeRepository likeRepository, IMapper mapper)
        {
            this._mapper = mapper;
            this._LikeRepository = likeRepository;
            this._context = context;
        }
        public void AddComment(CommentDTO comment)
        {
            throw new NotImplementedException();
        }

        public void AddLike(int UserID, int PostID)
        {
            throw new NotImplementedException();
        }

        public void AddReply(CommentDTO ParentComment, CommentDTO Reply)
        {
            throw new NotImplementedException();
        }

        public void AddTimeline(TimelineDTO timeline)
        {
            throw new NotImplementedException();
        }

        public void DeleteComment(int CommentID)
        {
            throw new NotImplementedException();
        }

        public bool DeleteReply(int replyID)
        {
            throw new NotImplementedException();
        }

        public bool DeleteTimeline(int TimelineID)
        {
            throw new NotImplementedException();
        }

        public async Task<ActionResult<List<TimelineDTO>>> GetAllTimelinePosts(int UserID)
        {
            var LikedUser = _LikeRepository.GetLikedUsersID(UserID);
            var timelinePosts = await _context.Timelines
                .Include(post => post.AppUser)
                .Include(post => post.Like)
                .Include(post => post.Comments)
                    .ThenInclude(comment => comment.Replies)
                        .ThenInclude(reply => reply.User)
                .Where(post => LikedUser.Contains(post.AppUserId) && post.IsDeleted != true)
                .ProjectTo<TimelineDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return timelinePosts;
        }

        public async Task<ActionResult<TimelineDTO>> GetTimelineByID(int id)
        {
            return await _context.Timelines
                .Include(post => post.AppUser)
                .Include(post => post.Like)
                .Include(post => post.Comments)
                    .ThenInclude(comment => comment.Replies)
                .Where(t=> t.ID == id)
                .ProjectTo<TimelineDTO>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
        }

        public void UpdateReply(CommentDTO reply)
        {
            throw new NotImplementedException();
        }

        public void UpdateTimeline(TimelineDTO timeline)
        {
            throw new NotImplementedException();
        }
    }
}