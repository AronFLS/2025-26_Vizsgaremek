using Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations
{
  internal class OrderDraftEntityTypeConfiguration : IEntityTypeConfiguration<OrderDraft>
  {
    public void Configure(EntityTypeBuilder<OrderDraft> builder)
    {
      builder.HasKey(od => od.Id);

      builder.HasOne(od => od.User).WithOne(u => u.OrderDraft).HasForeignKey<OrderDraft>(od => od.UserId);
    }
  }
}