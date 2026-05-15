using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.Category
{
  public class CategoryCreateDto
  {
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public required string Name { get; set; }
  }
}
