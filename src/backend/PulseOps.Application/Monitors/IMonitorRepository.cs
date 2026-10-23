using PulseOps.Domain.Monitors;

namespace PulseOps.Application.Monitors;

public interface IMonitorRepository
{
    Task<IReadOnlyCollection<ServiceMonitor>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ServiceMonitor?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task AddAsync(ServiceMonitor monitor, CancellationToken cancellationToken = default);
}
