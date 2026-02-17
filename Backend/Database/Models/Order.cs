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
        public int UserId { get; set; }
        public string PaymentMethod { get; set; }
        public string Status { get; set; }
        public string AddressLine { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public bool Active { get; set; }
    }
}
