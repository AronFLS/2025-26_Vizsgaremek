using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public class Order : BaseClass
    {
        public int Id { get; set; }
        public required string PaymentMethod { get; set; }
        public required string Status { get; set; }
        public required string AddressLine { get; set; }
        public required string City { get; set; }
        public required string ZipCode { get; set; }
        public bool Active { get; set; }

        public int UserId { get; set; }
        public required User User { get; set; }

        public ICollection<OrderProduct> OrderProducts { get; set; } = [];
    }
}
