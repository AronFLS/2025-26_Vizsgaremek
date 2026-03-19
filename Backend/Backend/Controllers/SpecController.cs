using Backend.Dtos.Spec;
using Database;
using Database.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.Xml;

namespace Backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class SpecController (CoreDbContext coreDbContext) : ControllerBase
  {
    private readonly CoreDbContext coreDbContext = coreDbContext;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SpecReadDto>>> GetSpecs()
    {
      var specs = await coreDbContext.Specs.ToListAsync();
      var specsMapped = specs.Select(s => MaptoDto(s)).ToList();
      return specsMapped;
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<SpecCreateDto>> PostSpec(SpecCreateDto specCreateDto)
    {
      var spec = new Spec
      {
        Name = specCreateDto.Name
      };

      coreDbContext.Specs.Add(spec);
      await coreDbContext.SaveChangesAsync();
      return CreatedAtAction(nameof(GetSpecs), new {id = spec.Id}, specCreateDto);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<ActionResult> PutSpec(int id, SpecCreateDto specDto)
    {
      var spec = await coreDbContext.Specs.FindAsync(id);

      if (spec == null)
      {
        return NotFound();
      }

      spec.Name = specDto.Name;

      try
      {
        await coreDbContext.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!SpecExist(id))
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
    public async Task<ActionResult> DeleteSpec(int id)
    {
      var spec = await coreDbContext.Specs.FindAsync(id);

      if (spec == null)
      {
        return NotFound();
      }

      coreDbContext.Specs.Remove(spec);
      await coreDbContext.SaveChangesAsync();

      return NoContent();
    }

    private bool SpecExist(int id)
    {
      return coreDbContext.Specs.Any(e => e.Id == id);
    }

    private SpecReadDto MaptoDto (Spec spec)
    {
      return new SpecReadDto
      {
        Id = spec.Id,
        Name = spec.Name
      };
    }
  }
}
