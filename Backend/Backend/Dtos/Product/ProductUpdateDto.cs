namespace Backend.Dtos.Product
{
  public class ProductUpdateDto
  {
    public int? Id { get; set; }
    public required int Price { get; set; }
    public int? Discount { get; set; }
    public required int StorageQuantity { get; set; }
    public bool Active { get; set; }

  }
}
