using API.Controllers.DTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface ITimelineRepository
    {
        public Task<ActionResult<List<TimelineDTO>>> GetAllTimelinePosts(int UserID);
        public Task<ActionResult<TimelineDTO>> GetTimelineByID(int id);
        public void AddTimeline(TimelineDTO timeline);
        public void UpdateTimeline(TimelineDTO timeline);
        public bool DeleteTimeline(int TimelineID);
        public void AddLike(int UserID, int  PostID);
        public void AddComment(CommentDTO comment);
        public void DeleteComment(int CommentID);
        public void AddReply(CommentDTO ParentComment, CommentDTO Reply);
        public void UpdateReply(CommentDTO reply);
        public bool DeleteReply(int replyID);
    }
}