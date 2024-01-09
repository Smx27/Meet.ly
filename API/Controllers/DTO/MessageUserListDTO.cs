namespace API.Controllers.DTO
{
    public class MessageUserListDTO
    {
        public string Username { get; set; }
        public string LastMessage { get; set; } 
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; } 
        public string PhotoUrl { get; set; }
    }
}