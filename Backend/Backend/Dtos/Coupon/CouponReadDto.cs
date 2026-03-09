namespace Backend.Dtos.Coupon
{
  public class CouponReadDto
  {
    public int Id { get; set; }
    public required string Code { get; set; }
    public int Discount { get; set; }
    public int MaxUsage { get; set; }
    public int Uses { get; set; }
  }
}
