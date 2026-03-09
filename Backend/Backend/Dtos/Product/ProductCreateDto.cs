namespace Backend.Dtos.Product
{
  public class ProductCreateDto
  {
    public required string Name { get; set; }
    public required string ImageUrl { get; set; }
    public required int Price { get; set; }
    public required string Description { get; set; }
    public int? Discount { get; set; }
    public required int StorageQuantity { get; set; }
    public required int CategoryId { get; set; }
    public int? CouponId { get; set; } 
    public required List<int> SpecIds { get; set; } = [];
  }
}
