using Backend.Dtos.Product;

namespace Backend.Dtos.OrderDtos
{
  public class OrderProductListItem
  {
    public int Quantity { get; set; }
    public ProductReadDto Product { get; set; } = null!;
  }
}