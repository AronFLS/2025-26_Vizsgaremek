namespace Backend.Dtos.Product
{
  public class ProductReadDto
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string ImageUrl { get; set; }
    public int Price { get; set; }
    public string Description { get; set; }
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
