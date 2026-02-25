using Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations
{
  internal class OrderEntityTypeConfiguration : IEntityTypeConfiguration<Order>
  {
    public void Configure(EntityTypeBuilder<Order> builder)
    {
      builder.HasKey(o => o.Id);

      builder.HasOne(o => o.User).WithMany(u => u.Orders).HasForeignKey(o => o.UserId);
    }
  }
}