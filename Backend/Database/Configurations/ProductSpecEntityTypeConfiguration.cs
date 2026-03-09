using Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations
{
  internal class ProductSpecEntityTypeConfigurations : IEntityTypeConfiguration<SpecProduct>
  {
    public void Configure(EntityTypeBuilder<SpecProduct> builder)
    {
      builder.HasKey(ps => new { ps.ProductId, ps.SpecId });

      builder.HasOne(ps => ps.Product).WithMany(p => p.ProductSpecs).HasForeignKey(ps => ps.ProductId);
      builder.HasOne(ps => ps.Spec).WithMany(s => s.ProductSpecs).HasForeignKey(ps => ps.SpecId);
    }
  }
}