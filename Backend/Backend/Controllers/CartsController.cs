using Backend.Dtos.CartDtos;
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

  public class CartsController(CoreDbContext coreDbContext) : ControllerBase
  {
    private readonly CoreDbContext coreDbContext = coreDbContext;

    [Authorize]
    [HttpPost("AddProduct")]
    public async Task<ActionResult<CartReadDto>> AddProductToCart(AddProductToCartDto cartProductDto)
    {
      var now = DateTime.Now;
      var loggedInUserId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value!);

      var currentCart = await coreDbContext.Carts
        .Include(c => c.CartProducts)
        .ThenInclude(cp => cp.Product)
        .ThenInclude(p => p.ProductSpecs)
        .ThenInclude(ps => ps.Spec)
        .Include(c => c.CartProducts)
        .ThenInclude(cp => cp.Product)
        .ThenInclude(p => p.Category)
        .Include(c => c.User)
        .SingleOrDefaultAsync(c => c.UserId == loggedInUserId);

      var existingProductIds = await coreDbContext.CartProducts
        .Where(cp => cp.CartId == currentCart!.Id)
        .Select(cp => cp.ProductId)
        .ToListAsync();

      if (existingProductIds.Contains(cartProductDto.ProductId))
      {
        var cartProduct = await coreDbContext.CartProducts
          .Where(cp => cp.CartId == currentCart!.Id && cp.ProductId == cartProductDto.ProductId)
          .SingleOrDefaultAsync();

        if (cartProductDto.Quantity <= 0)
        {
          coreDbContext.CartProducts.Remove(cartProduct!);
        }
        else
        {
          cartProduct!.Quantity = cartProductDto.Quantity;
          cartProduct.ModifiedAt = now;
        }

        await coreDbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCartByUserId), new { id = currentCart!.Id }, MapToDto(currentCart!));
      }

      else
      {
        if (cartProductDto.Quantity <= 0) return NotFound($"Can't add a product with {cartProductDto.Quantity} quantity");

        var product = await coreDbContext.Products
          .Include(p => p.ProductSpecs)
          .ThenInclude(ps => ps.Spec)
          .Where(p => p.Id == cartProductDto.ProductId)
          .SingleOrDefaultAsync();

        if (product == null) return NotFound($"Product with id : {cartProductDto.ProductId} not found");

        var cartProduct = new CartProduct
        {
          ProductId = cartProductDto.ProductId,
          Product = product,
          CartId = currentCart!.Id,
          Quantity = cartProductDto.Quantity,
          Active = true,
          CreatedAt = now,
          ModifiedAt = now
        };

        await coreDbContext.AddAsync(cartProduct);
        await coreDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCartByUserId), new { id = currentCart.Id }, MapToDto(currentCart));
      }
    }

    [Authorize]
    [HttpGet("Current")]
    public async Task<ActionResult<CartReadDto>> GetCurrentCart()
    {
      var loggedInUserId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value!);

      var cart = await coreDbContext.Carts
        .Include(c => c.CartProducts)
        .ThenInclude(cp => cp.Product)
        .ThenInclude(p => p.ProductSpecs)
        .ThenInclude(ps => ps.Spec)
        .Include(c => c.User)
        .Where(c => c.UserId == loggedInUserId)
        .SingleOrDefaultAsync();

      var cartDto = MapToDto(cart!);

      return Ok(cartDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CartReadDto>> GetCartByUserId(int id)
    {
      var cart = await coreDbContext.Carts
        .Include(c => c.CartProducts)
        .ThenInclude(cp => cp.Product)
        .ThenInclude(p => p.ProductSpecs)
        .ThenInclude(ps => ps.Spec)
        .Include(c => c.User)
        .Where(c => c.Id == id)
        .SingleOrDefaultAsync();

      if (cart == null) return NotFound($"Cart with id : {id} not found");
      var cartDto = MapToDto(cart);

      return Ok(cartDto);
    }

    [HttpGet]
    public async Task<ActionResult<List<CartReadDto>>> GetCarts()
    {
      var carts = await coreDbContext.Carts
        .Include(c => c.User)
        .Include(c => c.CartProducts)
        .ThenInclude(cp => cp.Product)
        .ThenInclude(p => p.ProductSpecs)
        .ThenInclude(ps => ps.Spec)
        .Select(c => MapToDto(c)).ToListAsync();

      if (carts == null) return NotFound("There are no carts");

      return Ok(carts);
    }

    private static CartReadDto MapToDto(Cart cart)
    {
      return new CartReadDto
      {
        Products = cart.CartProducts.Select(cp => new CartProductListItem
        {
          Quantity = cp.Quantity,
          Product = new ProductReadDto
          {
            Id = cp.ProductId,
            Name = cp.Product.Name,
            ImageUrl = cp.Product.ImageUrl,
            Price = cp.Product.Price,
            Description = cp.Product.Description,
            Discount = cp.Product.Discount,
            StorageQuantity = cp.Product.StorageQuantity,
            Active = cp.Product.Active,
            CreatedAt = cp.Product.CreatedAt,
            ModifiedAt = cp.Product.ModifiedAt,
            CategoryId = cp.Product.CategoryId,
            Specs = cp.Product.ProductSpecs.Select(ps => new ProductSpecsDto
            {
              Id = ps.SpecId,
              Name = ps.Spec.Name
            }).ToList(),
          }
        }).ToList(),
        CartId = cart.Id,
        UserEmail = cart.User.Email,
      };
    }
  }
}