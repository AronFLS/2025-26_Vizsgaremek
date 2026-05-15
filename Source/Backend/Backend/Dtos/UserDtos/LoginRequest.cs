using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.UserDtos
{
    public class LoginRequest
    {
        [Required]
        public required string Email { get; set; } = string.Empty;
        [Required]
        public required string Password { get; set; } = string.Empty;
    }
}
