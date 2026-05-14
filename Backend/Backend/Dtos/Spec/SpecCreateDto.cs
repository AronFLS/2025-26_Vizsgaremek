using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.Spec
{
    public class SpecCreateDto
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public required string Name { get; set; }
    }
}
