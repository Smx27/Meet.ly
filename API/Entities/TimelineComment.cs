namespace API.Entities
{
    public class TimelineComment
    {
        public int ID { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public int AppUserId { get; set; }
        public AppUser User { get; set; }
        public int TimelineID { get; set; }
        public Timeline Timeline { get; set; }
        public int? ParentCommentID { get; set; }
        public TimelineComment ParentComment { get; set; }
        public List<TimelineComment> Replies { get; set; }
    }
}