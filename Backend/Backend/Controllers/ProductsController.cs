using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Database;
using Database.Models;
using Backend.Dtos.Product;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProductsController : ControllerBase
  {
    private readonly CoreDbContext _context;
    public ProductsController(CoreDbContext context)
    {
      _context = context;
    }

    // GET: api/Products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductReadDto>>> GetProducts()
    {
      var products = await _context.Products
        .Include(p => p.Category)
        //.Include(p => p.Coupon)
        .Include(p => p.ProductSpecs)
          .ThenInclude(ps => ps.Spec)
        .ToListAsync();

      return products.Select(p => MapToDto(p)).ToList();

    }

    // GET: api/Products/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductReadDto>> GetProduct(int id)
    {
      var product = await _context.Products
        .Include(p => p.Category)
        //.Include(p => p.Coupon)
        .Include(p => p.ProductSpecs)
          .ThenInclude(ps => ps.Spec)
        .FirstOrDefaultAsync(p => p.Id == id);

      if (product == null)
      {
        return NotFound();
      }

      return MapToDto(product);
    }

    // PUT: api/Products/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProduct(int id, Product product)
    {
      if (id != product.Id)
      {
        return BadRequest();
      }

      _context.Entry(product).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ProductExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/Products
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ProductReadDto>> PostProduct(ProductCreateDto productDto)
    {
      var now = DateTime.Now;
      var product = new Product
      {
        Name = productDto.Name,
        ImageUrl = productDto.ImageUrl,
        Price = productDto.Price,
        Description = productDto.Description,
        Discount = productDto.Discount ?? 0,
        StorageQuantity = productDto.StorageQuantity,
        CategoryId = productDto.CategoryId,
        //CouponId = productDto.CouponId ?? 1,
        Active = true,
        CreatedAt = now,
        ModifiedAt = now
      };

      if (productDto.SpecIds != null && productDto.SpecIds.Count > 0)
      {
        var specs = await _context.Specs
          .Where(s => productDto.SpecIds.Contains(s.Id))
          .ToListAsync();

        if (specs == null && specs.Count == 0)
        {
          return BadRequest("Invalid specification entered");
        }

        foreach (var spec in specs)
        {
          product.ProductSpecs.Add(
            new SpecProduct
            {
              Spec = spec
            }
          );
        }
      }

      _context.Products.Add(product);

      await _context.SaveChangesAsync();

      return CreatedAtAction("GetProduct", new { id = product.Id }, MapToDto(product));
    }

    // DELETE: api/Products/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
      var product = await _context.Products.FindAsync(id);
      if (product == null)
      {
        return NotFound();
      }

      _context.Products.Remove(product);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool ProductExists(int id)
    {
      return _context.Products.Any(e => e.Id == id);
    }

    private ProductReadDto MapToDto (Product product)
    {
      return new ProductReadDto
      {
        Id = product.Id,
        Name = product.Name,
        ImageUrl = product.ImageUrl,
        Price = product.Price,
        Description = product.Description,
        Discount = product.Discount,
        StorageQuantity = product.StorageQuantity,
        CategoryId = product.CategoryId,
        //CouponId = product.CouponId,
        Specs = product.ProductSpecs.Select(ps => new ProductSpecsDto
        {
          Id = ps.Spec.Id,
          Name = ps.Spec.Name
        }).ToList(),
        Active = product.Active,
        CreatedAt = product.CreatedAt,
        ModifiedAt = product.ModifiedAt
      };
    }
  }
}
