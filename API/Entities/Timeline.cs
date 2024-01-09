namespace API.Entities
{
    public class Timeline
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public string Caption { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public bool IsDeleted { get; set; } = false;
        public bool IsPrivate { get; set; } = false;
        public int LikeCount { get; set; }
        public int CommentCount { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public List<TimelineLike> Like { get; set; }
        public List<TimelineComment> Comments { get; set; }
    }
}