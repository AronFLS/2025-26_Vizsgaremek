using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Product : BaseClass
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int Discount { get; set; }
        public int CouponId { get; set; }
        public int StorageQuantity { get; set; }
        public bool Active { get; set; }
    }
}
