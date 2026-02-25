using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public class CartProduct : BaseClass
    {
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public int CartId { get; set; }
        public Cart Cart { get; set; } = null!;
        public int Quantity { get; set; }
        public bool Active { get; set; }
    }
}
