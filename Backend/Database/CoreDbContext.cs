using System.Reflection;
using Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Database
{
  public class CoreDbContext(DbContextOptions<CoreDbContext> options) : DbContext(options)
  {
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Spec> Specs { get; set; }
    public DbSet<SpecProduct> ProductSpecs { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderProduct> OrderProducts { get; set; }
    //public DbSet<Coupon> Coupons { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartProduct> CartProducts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
  }
}