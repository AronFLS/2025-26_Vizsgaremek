using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.UserDtos
{
  public class RoleChangeDto
  {
    [Required]
    public required string Email { get; set; }
    public int RoleId { get; set; }
  }
}