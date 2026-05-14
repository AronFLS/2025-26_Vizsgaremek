using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.UserDtos
{
  public class UserRegister
  {
    [Required]
    [StringLength(50, MinimumLength = 2)]
    public required string FirstName { get; set; }
    [Required]
    [StringLength(50, MinimumLength = 2)]
    public required string LastName { get; set; }
    
    [Required]
    [RegularExpression(
      @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
      ErrorMessage = "Invalid email format"
    )]
    public required string Email { get; set; }
    [Required]
    [RegularExpression(
      @"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{12,24}$",
      ErrorMessage = "Invalid password format. Password must be 12-24 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%_)."
    )]
    public required string Password { get; set; }
    [Required]
    [RegularExpression(
      @"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$",
      ErrorMessage = "Invalid phone number"
    )]
    public required string PhoneNumber { get; set; }
  }
}