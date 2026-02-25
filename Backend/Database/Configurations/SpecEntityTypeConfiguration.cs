using Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations
{
  internal class SpecEntityTypeConfiguration : IEntityTypeConfiguration<Spec>
  {
    public void Configure(EntityTypeBuilder<Spec> builder)
    {
      builder.HasKey(s => s.Id);
      builder.HasIndex(s => s.Name);
    }
  }
}