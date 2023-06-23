using JwtBackend.Model;
using Microsoft.EntityFrameworkCore;

namespace JwtBackend.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> User { get; set; }
    }
}
