using Backend.Dtos.Product;

namespace Backend.Dtos.OrderDtos
{
  public class OrderReadDto
  {
    public int Id { get; set; }
    public required string PaymentMethod { get; set; }
    public required string Status { get; set; }
    public required string AddressLine { get; set; }
    public required string City { get; set; }
    public required string ZipCode { get; set; }
    public bool Active { get; set; }
    public int UserId { get; set; }

    public List<OrderProductListItem> Products { get; set; } = [];
  }
}