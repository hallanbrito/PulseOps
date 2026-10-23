using System.Collections.Concurrent;
using PulseOps.Application.Monitors;
using PulseOps.Domain.Monitors;

namespace PulseOps.Infrastructure.Monitors;

public sealed class InMemoryMonitorRepository : IMonitorRepository
{
    private readonly ConcurrentDictionary<Guid, ServiceMonitor> _items = new();

    public Task<IReadOnlyCollection<ServiceMonitor>> GetAllAsync(CancellationToken cancellationToken = default)
        => Task.FromResult<IReadOnlyCollection<ServiceMonitor>>(
            _items.Values.OrderBy(x => x.Name).ToArray());

    public Task<ServiceMonitor?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        _items.TryGetValue(id, out var monitor);
        return Task.FromResult(monitor);
    }

    public Task AddAsync(ServiceMonitor monitor, CancellationToken cancellationToken = default)
    {
        if (!_items.TryAdd(monitor.Id, monitor))
            throw new InvalidOperationException("Monitor already exists.");

        return Task.CompletedTask;
    }
}
