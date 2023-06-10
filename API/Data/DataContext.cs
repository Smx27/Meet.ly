using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    /* The DataContext class is a DbContext that contains a DbSet of AppUser objects. */
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<AppUser> Users { get; set; }
    }
}