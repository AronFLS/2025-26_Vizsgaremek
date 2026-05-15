using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class UploadController(IWebHostEnvironment webHostEnvironment) : ControllerBase
  {
    private readonly IWebHostEnvironment webHostEnvironment = webHostEnvironment;

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<string>> UploadImage(IFormFile image)
    {
      if (image == null || image.Length == 0)
      {
        return BadRequest("No file uploaded.");
      }

      var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };

      var extension = Path.GetExtension(image.FileName).ToLower();

      if (!allowedExtensions.Contains(extension))
      {
        return BadRequest("Only JPG, PNG and JPEG files are allowed.");
      }

      if (image.Length > 5 * 1024 * 1024)
      {
        return BadRequest("File size must be less than 5MB.");
      }


      string uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "uploads");
      if (!Directory.Exists(uploadsFolder))
      {
        Directory.CreateDirectory(uploadsFolder);
      }

      var filename = $"{Guid.NewGuid()}_{image.FileName}";
      var filePath = Path.Combine(uploadsFolder, filename);

      using (var stream = new FileStream(filePath, FileMode.Create))
      {
        await image.CopyToAsync(stream);
      }

      var fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{filename}";

      return Ok(fileUrl);
    }
  }
}
