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
      var specMapped = MaptoDto(spec);
      return NoContent();
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
