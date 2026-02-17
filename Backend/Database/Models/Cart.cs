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
        public int UserId { get; set; }
        public bool Active { get; set; }
    }
}
