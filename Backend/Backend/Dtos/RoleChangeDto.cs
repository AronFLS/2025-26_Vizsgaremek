namespace Backend.Dtos
{
  public class RoleChangeDto
  {
    public required string Email { get; set; }
    public int RoleId { get; set; }
  }
}