using Backend.Dtos.OrderDtos;
using Backend.Dtos.Product;
using Database;
using Database.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class OrdersController(CoreDbContext coreDbContext) : ControllerBase
  {
    private readonly CoreDbContext coreDbContext = coreDbContext;

    [Authorize]
    [HttpPost]
    public async Task<ActionResult> CreateOrder(OrderCreateDto orderDto)
    {
      var loggedInUserId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value!);
      var now = DateTime.Now;
      var cart = await coreDbContext.Carts
        .Include(c => c.CartProducts)
        .Include(c => c.User)
        .Where(c => c.UserId == loggedInUserId)
        .SingleOrDefaultAsync();

      if (cart!.CartProducts.ToList().Count <= 0) return NotFound("Can't order because cart is empty");

      var newOrder = new Order
      {
        PaymentMethod = orderDto.PaymentMethod,
        Status = orderDto.Status,
        AddressLine = orderDto.AddressLine,
        City = orderDto.City,
        ZipCode = orderDto.ZipCode,
        Active = true,
        UserId = loggedInUserId,
        CreatedAt = now,
        ModifiedAt = now
      };
      coreDbContext.Orders.Add(newOrder);

      await coreDbContext.SaveChangesAsync();

      var cartProducts = cart!.CartProducts;

      foreach (var cp in cartProducts)
      {
        var orderProduct = new OrderProduct
        {
          Quantity = cp.Quantity,
          Active = true,
          ProductId = cp.ProductId,
          OrderId = newOrder.Id,
          CreatedAt = now,
          ModifiedAt = now
        };

        coreDbContext.OrderProducts.Add(orderProduct);
        coreDbContext.CartProducts.Remove(cp);
      }
      await coreDbContext.SaveChangesAsync();

      var order = await coreDbContext.Orders
        .Include(o => o.OrderProducts)
        .ThenInclude(op => op.Product)
        .ThenInclude(p => p.ProductSpecs)
        .ThenInclude(ps => ps.Spec)
        .Where(o => o.Id == newOrder.Id)
        .SingleOrDefaultAsync();

      if (order == null) return NotFound("Order not found");
      return CreatedAtAction(nameof(GetOrderById), new { id = newOrder.Id }, MapToDto(order));
    }

    [Authorize]
    [HttpGet("Current")]
    public async Task<ActionResult<List<OrderReadDto>>> GetCurrentOrders()
    {
      var loggedInUserId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value!);

      var orders = await coreDbContext.Orders
        .Include(o => o.User)
        .Include(o => o.OrderProducts)
        .ThenInclude(op => op.Product)
        .ThenInclude(p => p.ProductSpecs)
        .ThenInclude(ps => ps.Spec)
        .Where(o => o.UserId == loggedInUserId)
        .Select(o => MapToDto(o))
        .ToListAsync();

      return Ok(orders);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<OrderReadDto>> GetOrderById(int id)
    {
      var order = await coreDbContext.Orders
        .Include(o => o.OrderProducts)
        .ThenInclude(op => op.Product)
        .ThenInclude(p => p.ProductSpecs)
        .ThenInclude(ps => ps.Spec)
        .Where(o => o.Id == id)
        .SingleOrDefaultAsync();

      if (order == null) return NotFound($"Order with id : {id} not found");

      var orderDto = MapToDto(order);

      return Ok(orderDto);
    }

    [HttpGet]
    public async Task<ActionResult<List<OrderReadDto>>> GetOrders()
    {
      var orders = await coreDbContext.Orders
        .Include(o => o.OrderProducts)
        .ThenInclude(op => op.Product)
        .ThenInclude(p => p.ProductSpecs)
        .ThenInclude(ps => ps.Spec)
        .Select(o => MapToDto(o))
        .ToListAsync();

      if (orders.Count <= 0) return NotFound("There are no orders");
      return Ok(orders);
    }

    private static OrderReadDto MapToDto(Order order)
    {
      return new OrderReadDto
      {
        Id = order.Id,
        PaymentMethod = order.PaymentMethod,
        Status = order.Status,
        AddressLine = order.AddressLine,
        City = order.City,
        ZipCode = order.ZipCode,
        UserId = order.UserId,
        Products = order.OrderProducts.Select(op => new OrderProductListItem
        {
          Quantity = op.Quantity,
          Product = new ProductReadDto
          {
            Id = op.Product.Id,
            Name = op.Product.Name,
            ImageUrl = op.Product.ImageUrl,
            Price = op.Product.Price,
            Description = op.Product.Description,
            Discount = op.Product.Discount,
            StorageQuantity = op.Product.StorageQuantity,
            CategoryId = op.Product.CategoryId,
            Specs = op.Product.ProductSpecs.Select(ps => new ProductSpecsDto
            {
              Id = ps.SpecId,
              Name = ps.Spec.Name
            }).ToList()
          }
        }).ToList()
      };
    }
  }
}