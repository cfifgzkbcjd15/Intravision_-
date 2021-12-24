using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Intravision.Models
{
    public class User : IdentityUser
    {
        public string FIO { get; set; }
        public int CountMoney { get; set; }
    }
}
