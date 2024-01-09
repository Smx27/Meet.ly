using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Controllers.DTO
{
    public class TimelineDTO
    {
         public int ID { get; set; }
        public string Username { get; set; }
        public string Caption { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public bool IsDeleted { get; set; }
        public bool IsPrivate { get; set; }
        public int LikeCount { get; set; }
        public int CommentCount { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public List<TimelineLike> Like { get; set; }
        public List<TimelineComment> Comments { get; set; }
    }
}