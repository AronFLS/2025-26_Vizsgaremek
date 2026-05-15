using Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations
{
  internal class RoleEntityTypeConfiguration : IEntityTypeConfiguration<Role>
  {
    public void Configure(EntityTypeBuilder<Role> builder)
    {
      builder.HasKey(r => r.Id);
      builder.HasIndex(r => r.Name);

      builder.HasData(new Role { Id = 1, Name = BuiltInRoles.User });
      builder.HasData(new Role { Id = 2, Name = BuiltInRoles.Admin });
    }
  }
}