using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intravision.ViewModels
{
    public class DrinksViewModel
    {
        public string Name { get; set; }
        public IFormFile Photo { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }
    }
}
