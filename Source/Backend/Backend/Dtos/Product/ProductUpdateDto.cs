using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.Product
{
  public class ProductUpdateDto
  {
    public int? Id { get; set; }
    [Required]
    [Range(1, int.MaxValue)]
    public required int Price { get; set; }
    [Range(0, 100)]
    public int? Discount { get; set; }
    [Required]
    [Range(0, int.MaxValue)]
    public required int StorageQuantity { get; set; }
    public bool Active { get; set; }

  }
}
