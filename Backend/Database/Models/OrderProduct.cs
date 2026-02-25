using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public class OrderProduct : BaseClass
    {
        public int Quantity { get; set; }
        public bool Active { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;

        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;
    }
}
