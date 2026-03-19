namespace Backend.Dtos.OrderDtos
{
  public class OrderCreateDto
  {
    public required string PaymentMethod { get; set; }
    public required string Status { get; set; }
    public required string AddressLine { get; set; }
    public required string City { get; set; }
    public required string ZipCode { get; set; }
  }
}