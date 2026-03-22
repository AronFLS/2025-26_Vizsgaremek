namespace Backend.Dtos.OrderDtos
{
  public class OrderStatusChangeDto
  {
    public int Id { get; set; }
    public string Status { get; set; } = null!;
  }
}