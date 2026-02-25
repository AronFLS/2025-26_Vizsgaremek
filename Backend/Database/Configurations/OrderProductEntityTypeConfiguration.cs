using Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations
{
  internal class OrderProductEntityTypeConfiguration : IEntityTypeConfiguration<OrderProduct>
  {
    public void Configure(EntityTypeBuilder<OrderProduct> builder)
    {
      builder.HasKey(op => new { op.OrderId, op.ProductId });

      builder.HasOne(op => op.Order).WithMany(o => o.OrderProducts).HasForeignKey(op => op.OrderId);
      builder.HasOne(op => op.Product).WithMany(p => p.OrderProducts).HasForeignKey(op => op.ProductId);
    }
  }
}