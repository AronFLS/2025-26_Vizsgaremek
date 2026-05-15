using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.Product
{
  public class ProductCreateDto
  {
    [Required]
    [StringLength(150, MinimumLength = 2)]
    public required string Name { get; set; }
    [Required]
    public required string ImageUrl { get; set; }
    [Required]
    [Range(1, int.MaxValue)]
    public required int Price { get; set; }
    [Required]
    [StringLength(5000, MinimumLength = 10)]
    public required string Description { get; set; }
    [Range(0, 100)]
    public int? Discount { get; set; }
    [Required]
    [Range(1, int.MaxValue)]
    public required int StorageQuantity { get; set; }
    [Required]
    public required int CategoryId { get; set; }
    [Required]
    public required List<int> SpecIds { get; set; } = [];
  }
}
