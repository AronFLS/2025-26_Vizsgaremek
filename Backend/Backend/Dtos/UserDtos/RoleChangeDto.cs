namespace Backend.Dtos.UserDtos
{
  public class RoleChangeDto
  {
    public required string Email { get; set; }
    public int RoleId { get; set; }
  }
}