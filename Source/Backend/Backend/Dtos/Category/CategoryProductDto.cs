namespace Backend.Dtos.Category
{
  public class CategoryProductDto
  {
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public int StorageQuantity { get; set; }
  }
}
