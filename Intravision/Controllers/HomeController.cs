using Intravision.Data;
using Intravision.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Intravision.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private ApplicationContext db;
        public HomeController(ApplicationContext context)
        {
            db = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> AddMoney([FromQuery]int count)
        {
            var httpRequest = HttpContext.Request;
            var money = db.Moneys.FirstOrDefault(x => x.Count == count);
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = db.Users.FirstOrDefault(x => x.Id == userId);
            user.CountMoney += count;
            money.CountMoney -= 1;
            db.Moneys.Update(money);
            db.Users.Update(user);
            await db.SaveChangesAsync();
            return new JsonResult($"Ваш закинули {count} монет");
        }
        [HttpPost]
        public async Task<JsonResult> AddCountMoney([FromQuery] int id,int count)
        {
            var httpRequest = HttpContext.Request;
            var money = db.Moneys.FirstOrDefault(x => x.Id==id);
            money.CountMoney +=count;
            db.Moneys.Update(money);
            await db.SaveChangesAsync();
            return new JsonResult($"Успешно");
        }
        [HttpPost]
        public async Task<JsonResult> DisableMoney([FromQuery] int id, [FromQuery] bool status)
        {
            var money = db.Moneys.FirstOrDefault(x => x.Id == id);
            money.Status = status;
            db.Moneys.Update(money);
            await db.SaveChangesAsync();
            return new JsonResult($"Успешно");
        }
        [HttpPost]
        public async Task<JsonResult> UpdateMoney([FromQuery] int id, [FromQuery] int count)
        {
            var money = db.Moneys.FirstOrDefault(x => x.Id == id);
            money.CountMoney = count;
            db.Moneys.Update(money);
            await db.SaveChangesAsync();
            return new JsonResult($"Успешно");
        }
        [HttpPost]
        public async Task<JsonResult> BuyDrinks([FromQuery] int price,[FromQuery] int id)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = db.Users.FirstOrDefault(x => x.Id == userId);
            var drinks = db.Drinks.FirstOrDefault(x => x.Id == id);
            if (user.CountMoney >= price && drinks.Count >= 1)
            {
                drinks.Count -= 1;
                user.CountMoney -= price;
                db.Users.Update(user);
                db.Drinks.Update(drinks);
                await db.SaveChangesAsync();
                return new JsonResult("Успешно");
            }
            else
            {
                return new JsonResult("Недостаточно стредств");
            }
        }
        public IActionResult Details()
        {
            return View();
        }
    }
}
