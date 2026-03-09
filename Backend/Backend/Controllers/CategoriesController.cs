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

    private CategoryReadDto MapToDto(Category category)
    {
      return new CategoryReadDto
      {
        Id = category.Id,
        Name = category.Name,
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
