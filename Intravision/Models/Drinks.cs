using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Intravision.Models
{
    public class Drinks
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string PathPhoto { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }
    }
}
