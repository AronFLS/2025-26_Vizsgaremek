using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.OrderDtos
{
  public class OrderCreateDto
  {
    [Required]
    public required string PaymentMethod { get; set; }
    [Required]
    public required string Status { get; set; }
    [Required]
    [StringLength(200, MinimumLength = 5)]
    public required string AddressLine { get; set; }
    [Required]
    [StringLength(100,MinimumLength = 2)]
    public required string City { get; set; }
    [Required]
    [RegularExpression(
      @"^\d+$",
      ErrorMessage = "Zip code must contain only digits"
    )]
    public required string ZipCode { get; set; }
  }
}