using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public class Spec
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public ICollection<SpecProduct> ProductSpecs { get; set; } = [];
    }
}
