using API.Entities;

namespace API.Controllers.DTO
{
    public class CommentDTO
    {
        public int ID { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public int AppUserId { get; set; }
        public AppUser User { get; set; }
        public int TimelineID { get; set; }
        public Timeline Timeline { get; set; }
    }
}