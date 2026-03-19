namespace Backend.Dtos.Category
{
  public class CategoryReadDto
  {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<CategoryProductDto> Products { get; set; } = [];
  }
}
