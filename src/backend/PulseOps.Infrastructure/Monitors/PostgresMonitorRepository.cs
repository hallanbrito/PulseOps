using Microsoft.EntityFrameworkCore;
using PulseOps.Application.Monitors;
using PulseOps.Domain.Monitors;
using PulseOps.Infrastructure.Persistence;

namespace PulseOps.Infrastructure.Monitors;

public sealed class PostgresMonitorRepository(
    PulseOpsDbContext dbContext) : IMonitorRepository
{
    public async Task<IReadOnlyCollection<ServiceMonitor>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        return await dbContext.Monitors
            .AsNoTracking()
            .OrderBy(monitor => monitor.Name)
            .ToArrayAsync(cancellationToken);
    }

    public async Task<ServiceMonitor?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return await dbContext.Monitors
            .AsNoTracking()
            .SingleOrDefaultAsync(
                monitor => monitor.Id == id,
                cancellationToken);
    }

    public async Task AddAsync(
        ServiceMonitor monitor,
        CancellationToken cancellationToken = default)
    {
        var alreadyExists = await dbContext.Monitors
            .AnyAsync(
                item => item.Id == monitor.Id,
                cancellationToken);

        if (alreadyExists)
            throw new InvalidOperationException(
                "Monitor already exists.");

        await dbContext.Monitors.AddAsync(
            monitor,
            cancellationToken);

        await dbContext.SaveChangesAsync(
            cancellationToken);
    }
}
