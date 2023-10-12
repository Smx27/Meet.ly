using System.ComponentModel.DataAnnotations;

namespace API.Controllers.DTO
{
    public class RegisterDTO
    {
        [Required]
        public string Username { get; set; }

        [Required] 
        public string KnownAs { get; set; }
        [Required] 
        public string Gender { get; set; }
        [Required] 
        public DateOnly? DateOfBirth { get; set; } //has to make optional to use required validator

        [Required] 
        public string City { get; set; }
        [Required] 
        public string Country { get; set; }
        [Required]
        [StringLength(8,MinimumLength =4)]
        public string Password { get; set; }
    }
}