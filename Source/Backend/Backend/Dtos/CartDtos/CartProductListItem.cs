using Backend.Dtos.Product;

namespace Backend.Dtos.CartDtos
{
  public class CartProductListItem
  {
    public int Quantity { get; set; }
    public ProductReadDto Product { get; set; } = null!;
  }
}