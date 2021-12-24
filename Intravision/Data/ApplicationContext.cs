using Intravision.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Intravision.Data
{
    public class ApplicationContext: IdentityDbContext<User>
    {
        public DbSet<Drinks> Drinks { get; set; }
        public DbSet<Money> Moneys { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
          //Database.EnsureDeleted();   // ������� �� �� ������ ������
          //Database.EnsureCreated();   // ������� �� � ����� ������
        }
    }
}