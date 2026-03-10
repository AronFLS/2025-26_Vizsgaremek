//using Backend.Dtos.Coupon;
//using Database;
//using Database.Models;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;

//namespace Backend.Controllers
//{
//  [Route("api/[controller]")]
//  [ApiController]
//  public class CouponsController : ControllerBase
//  {
//    private readonly CoreDbContext _context;

//    public CouponsController(CoreDbContext context)
//    {
//      _context = context;
//    }

//    [HttpGet]
//    public async Task<ActionResult<IEnumerable<CouponReadDto>>> GetCoupons()
//    {
//      var coupons = await _context.Coupons.ToListAsync();
//      return coupons.Select(MapToDto).ToList();
//    }

//    [Authorize(Roles = "Admin")]
//    [HttpPost]
//    public async Task<ActionResult<CouponReadDto>> PostCoupon(CouponCreateDto couponCreateDto)
//    {
//      var coupon = new Coupon
//      {
//        Code = couponCreateDto.Code,
//        Discount = couponCreateDto.Discount,
//        MaxUsage = couponCreateDto.MaxUsage,
//        Uses = couponCreateDto.Uses,
//        Active = true
//      };

//      _context.Coupons.Add(coupon);
//      var mapped = MapToDto(coupon);
//      await _context.SaveChangesAsync();
//      return CreatedAtAction(nameof(GetCoupons), new { id = coupon.Id }, mapped);
//    }

//    private CouponReadDto MapToDto(Coupon coupon)
//    {
//      return new CouponReadDto
//      {
//        Id = coupon.Id,
//        Code = coupon.Code,
//        Discount = coupon.Discount,
//        MaxUsage = coupon.MaxUsage,
//        Uses = coupon.Uses
//      };
//    }
//  }
//}
