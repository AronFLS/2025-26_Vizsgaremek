using Backend.Dtos.Category;
using Database;
using Database.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CategoriesController : Controller
  {
    private readonly CoreDbContext _context;

    public CategoriesController(CoreDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryReadDto>>> GetCategories()
    {
      var categories = await _context.Categories.ToListAsync();
      var mappedCatgoires = categories.Select(c => MapToDto(c)).ToList();
      return Ok(mappedCatgoires);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<CategoryCreateDto>> PostCategories(CategoryCreateDto categoryCreateDto)
    {
      var category = new Category
      {
        Name = categoryCreateDto.Name
      };
      _context.Categories.Add(category);
      await _context.SaveChangesAsync();
      return CreatedAtAction(nameof(GetCategories), new { id = category.Id }, categoryCreateDto);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCategory(int id, CategoryCreateDto categoryDto)
    {
      var category = await _context.Categories.FindAsync(id);
      if (category == null)
      {
        return NotFound();
      }
      category.Name = categoryDto.Name;
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!CategoryExists(id))
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

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
      var category = await _context.Categories.FindAsync(id);

      if (category == null)
      {
        return NotFound();
      }
      _context.Categories.Remove(category);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool CategoryExists(int id)
    {
      return _context.Categories.Any(e => e.Id == id);
    }
    private CategoryReadDto MapToDto(Category category)
    {
      return new CategoryReadDto
      {
        Id = category.Id,
        Name = category.Name ,
        Products = category.Products.Select(p => new CategoryProductDto
        {
          Id = p.Id,
          Name = p.Name,
          Description = p.Description,
          StorageQuantity = p.StorageQuantity
        }).ToList()
      };
    }
  }
}
