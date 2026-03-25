namespace Backend.Dtos.OrderDraftDtos
{
  public class OrderDraftReadDto
  {
    public int Id { get; set; }
    public required string PaymentMethod { get; set; }
    public required string AddressLine { get; set; }
    public required string City { get; set; }
    public required string ZipCode { get; set; }
    public DateTime ExpiresAt { get; set; }
    public int UserId { get; set; }
  }
}