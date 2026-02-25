using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public class ProductSpec
    {
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public int SpecId { get; set; }
        public Spec Spec { get; set; } = null!;
    }
}
