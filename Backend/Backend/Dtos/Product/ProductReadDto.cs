namespace Backend.Dtos.Product
{
  public class ProductReadDto
  {
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public int Price { get; set; }
    public string Description { get; set; } = null!;
    public int Discount { get; set; }
    public int StorageQuantity { get; set; }
    public bool Active { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ModifiedAt { get; set; }

    public int CategoryId { get; set; }
    //public int CouponId { get; set; }
    public List<ProductSpecsDto> Specs { get; set; } = [];
  }
}
