namespace Backend.Dtos.OrderDraftDtos
{
  public class OrderDraftCreateDto
  {
    public required string PaymentMethod { get; set; }
    public required string AddressLine { get; set; }
    public required string City { get; set; }
    public required string ZipCode { get; set; }
  }
}