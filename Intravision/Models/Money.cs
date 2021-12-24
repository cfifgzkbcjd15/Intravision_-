using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Intravision.Models
{
    public class Money
    {
        [Key]
        public int Id { get; set; }
        public int Count { get; set; }
        public int CountMoney { get; set; }
        public bool Status { get; set; }
    }
}
