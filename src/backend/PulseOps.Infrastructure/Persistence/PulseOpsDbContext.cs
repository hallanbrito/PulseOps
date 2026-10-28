using Microsoft.EntityFrameworkCore;
using PulseOps.Domain.Monitors;

namespace PulseOps.Infrastructure.Persistence;

public sealed class PulseOpsDbContext(
    DbContextOptions<PulseOpsDbContext> options)
    : DbContext(options)
{
    public DbSet<ServiceMonitor> Monitors =>
        Set<ServiceMonitor>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(PulseOpsDbContext).Assembly);
    }
}
