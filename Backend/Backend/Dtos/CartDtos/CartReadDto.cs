namespace Backend.Dtos.CartDtos
{
  public class CartReadDto
  {
    public List<CartProductListItem> Products { get; set; } = [];
    public int CartId { get; set; }
    public string UserEmail { get; set; } = null!;
  }
}