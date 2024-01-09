namespace API.Entities
{
    public class TimelineLike
    {
        public int ID { get; set; }
        public DateTime LikeTime { get; set; } = DateTime.UtcNow;
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public int TimelineID { get; set; }
        public Timeline Timeline { get; set; }        
    }
}