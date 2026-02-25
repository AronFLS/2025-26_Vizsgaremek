using Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations
{
  internal class CartProductEntityTypeConfiguration : IEntityTypeConfiguration<CartProduct>
  {
    public void Configure(EntityTypeBuilder<CartProduct> builder)
    {
      builder.HasKey(cp => new { cp.CartId, cp.ProductId });

      builder.HasOne(cp => cp.Cart).WithMany(c => c.CartProducts).HasForeignKey(cp => cp.CartId);
      builder.HasOne(cp => cp.Product).WithMany(p => p.CartProducts).HasForeignKey(cp => cp.ProductId);
    }
  }
}