using Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations
{
  internal class CategoryEntityTypeConfiguration : IEntityTypeConfiguration<Category>
  {
    public void Configure(EntityTypeBuilder<Category> builder)
    {
      builder.HasKey(c => c.Id);
      builder.HasIndex(c => c.Name);

      builder.HasData(new Category { Id = 1, Name = BuiltInCategories.Phones });
      builder.HasData(new Category { Id = 2, Name = BuiltInCategories.Macbooks });
      builder.HasData(new Category { Id = 3, Name = BuiltInCategories.Accessories });
    }
  }
}