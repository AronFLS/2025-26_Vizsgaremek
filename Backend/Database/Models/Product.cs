using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public class Product : BaseClass
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string ImageUrl { get; set; }
        public int Price { get; set; }
        public required string Description { get; set; }
        public int Discount { get; set; }
        public int StorageQuantity { get; set; }
        public bool Active { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;

        //public int CouponId { get; set; }
        //public Coupon? Coupon { get; set; }

        public ICollection<OrderProduct> OrderProducts { get; set; } = [];

        public ICollection<SpecProduct> ProductSpecs { get; set; } = [];

        public ICollection<CartProduct> CartProducts { get; set; } = [];
    }
}
