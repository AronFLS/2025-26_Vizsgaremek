using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public class Coupon
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int Discount { get; set; }
        public int MaxUsage { get; set; }
        public int Uses { get; set; }
        public bool Active { get; set; }
    }
}
