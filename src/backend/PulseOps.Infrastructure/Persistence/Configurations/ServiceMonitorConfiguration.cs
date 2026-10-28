using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PulseOps.Domain.Monitors;

namespace PulseOps.Infrastructure.Persistence.Configurations;

public sealed class ServiceMonitorConfiguration
    : IEntityTypeConfiguration<ServiceMonitor>
{
    public void Configure(EntityTypeBuilder<ServiceMonitor> builder)
    {
        builder.ToTable("service_monitors");

        builder.HasKey(monitor => monitor.Id);

        builder.Property(monitor => monitor.Id)
            .ValueGeneratedNever();

        builder.Property(monitor => monitor.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(monitor => monitor.Url)
            .HasConversion(
                url => url.ToString(),
                value => new Uri(value))
            .HasColumnType("text")
            .IsRequired();

        builder.Property(monitor => monitor.IntervalSeconds)
            .IsRequired();

        builder.Property(monitor => monitor.Enabled)
            .IsRequired();

        builder.Property(monitor => monitor.CreatedAtUtc)
            .IsRequired();
    }
}
