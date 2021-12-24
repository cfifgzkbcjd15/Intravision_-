using Intravision.Data;
using Intravision.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Intravision.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuyApiController : ControllerBase
    {
        private readonly ApplicationContext db;
        public BuyApiController(ApplicationContext context)
        {
            db = context;
        }
        [HttpGet]
        public async Task<IEnumerable<Money>> Get()
        {
            return await db.Moneys.ToListAsync();
        }
    }
}
