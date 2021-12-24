using Intravision.Data;
using Intravision.Models;
using Intravision.ViewModels;
using Microsoft.AspNetCore.Hosting;
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
    public class MachineApiController : ControllerBase
    {
        private ApplicationContext db;
        private readonly IWebHostEnvironment _env;
        public MachineApiController(ApplicationContext context, IWebHostEnvironment env)
        {
            db = context;
            _env = env;
        }
        [HttpGet]
        public async Task<IEnumerable<Drinks>> Get()
        {
            return await db.Drinks.ToListAsync();
        }
        [HttpPost]
        public async Task<JsonResult> Post(Drinks drinks)
        {
            db.Drinks.Add(drinks);
            await db.SaveChangesAsync();
            return new JsonResult("Успешно");

        }
        [HttpPut]
        public async Task<JsonResult> Put(Drinks drinks)
        {
            db.Drinks.Update(drinks);
            await db.SaveChangesAsync();
            return new JsonResult("Изменено");
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            Drinks drinks = await db.Drinks.FirstOrDefaultAsync(x => x.Id == id);
            db.Drinks.Remove(drinks);
            await db.SaveChangesAsync();
            return new JsonResult("Удалено");
        }
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/wwwroot/photo/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }
    }
}
