using Backend.Dtos.OrderDraftDtos;
using Database;
using Database.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class OrderDraftsController(CoreDbContext coreDbContext) : ControllerBase
  {
    private readonly CoreDbContext coreDbContext = coreDbContext;

    [Authorize]
    [HttpPost]
    public async Task<ActionResult> CreateOrderDraft(OrderDraftCreateDto orderDraftDto)
    {
      var loggedInUserId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value!);
      var now = DateTime.Now;

      var orderDraft = await coreDbContext.OrderDrafts
        .Where(od => od.UserId == loggedInUserId)
        .SingleOrDefaultAsync();

      RemoveIfExpired(orderDraft!);

      orderDraft = await coreDbContext.OrderDrafts
       .Where(od => od.UserId == loggedInUserId)
       .SingleOrDefaultAsync();

      if (orderDraft != null)
      {
        orderDraft.PaymentMethod = orderDraftDto.PaymentMethod;
        orderDraft.AddressLine = orderDraftDto.AddressLine;
        orderDraft.City = orderDraftDto.City;
        orderDraft.ZipCode = orderDraftDto.ZipCode;
        orderDraft.ExpiresAt = now.AddMinutes(30);
        orderDraft.UserId = loggedInUserId;

        await coreDbContext.SaveChangesAsync();
        return Ok(MapToDto(orderDraft));
      }
      else
      {
        var newOrderDraft = new OrderDraft
        {
          PaymentMethod = orderDraftDto.PaymentMethod,
          AddressLine = orderDraftDto.AddressLine,
          City = orderDraftDto.City,
          ZipCode = orderDraftDto.ZipCode,
          ExpiresAt = now.AddMinutes(30),
          UserId = loggedInUserId
        };
        await coreDbContext.OrderDrafts.AddAsync(newOrderDraft);
        await coreDbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetOrderDraftById), new { id = newOrderDraft.Id }, MapToDto(newOrderDraft));
      }


    }

    [Authorize]
    [HttpGet("Current")]
    public async Task<ActionResult> GetCurrentOrderDraft()
    {
      var now = DateTime.Now;
      var loggedInUserId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value!);
      var orderDraft = await coreDbContext.OrderDrafts
        .Where(od => od.UserId == loggedInUserId)
        .SingleOrDefaultAsync();

      RemoveIfExpired(orderDraft!);

      orderDraft = await coreDbContext.OrderDrafts
       .Where(od => od.UserId == loggedInUserId)
       .SingleOrDefaultAsync();

      if (orderDraft == null) return NotFound($"OrderDraft with userId : {loggedInUserId} not found");

      return Ok(MapToDto(orderDraft));
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDraftReadDto>> GetOrderDraftById(int id)
    {
      var orderDraft = await coreDbContext.OrderDrafts
        .Where(od => od.Id == id)
        .SingleOrDefaultAsync();

      RemoveIfExpired(orderDraft!);

      orderDraft = await coreDbContext.OrderDrafts
       .Where(od => od.Id == id)
       .SingleOrDefaultAsync();


      if (orderDraft == null) return NotFound($"OrderDraft with id : {id} not found");
      return Ok(MapToDto(orderDraft));
    }

    [HttpGet]
    public async Task<ActionResult<List<OrderDraft>>> GetOrderDrafts()
    {
      var orderDrafts = await coreDbContext.OrderDrafts.Select(od => od).ToListAsync();

      if (orderDrafts.Count <= 0) return NotFound("Did not find any OrderDrafts");

      foreach (var od in orderDrafts)
      {
        RemoveIfExpired(od);
      }

      orderDrafts = await coreDbContext.OrderDrafts.Select(od => od).ToListAsync();

      return Ok(orderDrafts.Select(MapToDto));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteOrderDraftById(int id)
    {
      var orderDraft = await coreDbContext.OrderDrafts
        .Where(od => od.Id == id)
        .SingleOrDefaultAsync();

      if (orderDraft == null) return NotFound($"OrderDraft with id : {id} not found");

      coreDbContext.OrderDrafts.Remove(orderDraft);
      await coreDbContext.SaveChangesAsync();

      return NoContent();
    }

    private async void RemoveIfExpired(OrderDraft orderDraft)
    {
      if (orderDraft != null)
      {
        var now = DateTime.Now;
        if (orderDraft.ExpiresAt <= now)
        {
          coreDbContext.OrderDrafts.Remove(orderDraft);
          await coreDbContext.SaveChangesAsync();
        }
      }
    }

    private static OrderDraftReadDto MapToDto(OrderDraft orderDraft)
    {
      return new OrderDraftReadDto
      {
        Id = orderDraft.Id,
        PaymentMethod = orderDraft.PaymentMethod,
        AddressLine = orderDraft.AddressLine,
        City = orderDraft.City,
        ZipCode = orderDraft.ZipCode,
        ExpiresAt = orderDraft.ExpiresAt,
        UserId = orderDraft.UserId
      };
    }
  }
}