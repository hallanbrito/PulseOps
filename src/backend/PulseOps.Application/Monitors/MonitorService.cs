using PulseOps.Domain.Monitors;

namespace PulseOps.Application.Monitors;

public sealed class MonitorService(IMonitorRepository repository)
{
    public Task<IReadOnlyCollection<ServiceMonitor>> ListAsync(CancellationToken cancellationToken = default)
        => repository.GetAllAsync(cancellationToken);

    public Task<ServiceMonitor?> GetAsync(Guid id, CancellationToken cancellationToken = default)
        => repository.GetByIdAsync(id, cancellationToken);

    public async Task<ServiceMonitor> CreateAsync(
        string name,
        string url,
        int intervalSeconds,
        CancellationToken cancellationToken = default)
    {
        if (!Uri.TryCreate(url, UriKind.Absolute, out var parsedUrl))
            throw new ArgumentException("A valid absolute URL is required.", nameof(url));

        var monitor = new ServiceMonitor(name, parsedUrl, intervalSeconds);
        await repository.AddAsync(monitor, cancellationToken);
        return monitor;
    }
}
