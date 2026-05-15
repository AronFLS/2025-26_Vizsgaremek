using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public class Cart : BaseClass
    {
        public int Id { get; set; }
        public bool Active { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public ICollection<CartProduct> CartProducts { get; set; } = [];
    }
}
