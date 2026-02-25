using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public class User : BaseClass
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public required string PhoneNumber { get; set; }
        public bool Active { get; set; }

        public int RoleId { get; set; }
        public Role Role { get; set; } = null!;

        public Cart Cart { get; set; } = null!;

        public ICollection<Order> Orders { get; set; } = [];
    }
}
