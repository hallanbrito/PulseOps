using Microsoft.EntityFrameworkCore;
using PulseOps.Domain.Monitors;
using PulseOps.Infrastructure.Monitors;
using PulseOps.Infrastructure.Persistence;
using Testcontainers.PostgreSql;

namespace PulseOps.Infrastructure.Tests;

public sealed class PostgresMonitorRepositoryTests
{
    [Fact]
    public async Task AddAsync_ShouldPersistMonitorAcrossDbContexts()
    {
        await using var postgres = new PostgreSqlBuilder("postgres:18.6")
            .WithDatabase("pulseops_tests")
            .WithUsername("pulseops")
            .WithPassword("pulseops-tests-only")
            .Build();

        await postgres.StartAsync();

        var options =
            new DbContextOptionsBuilder<PulseOpsDbContext>()
                .UseNpgsql(postgres.GetConnectionString())
                .Options;

        Guid monitorId;

        await using (var writeDb = new PulseOpsDbContext(options))
        {
            await writeDb.Database.MigrateAsync();

            var repository =
                new PostgresMonitorRepository(writeDb);

            var monitor = new ServiceMonitor(
                "Integration Monitor",
                new Uri("https://example.com"),
                60);

            await repository.AddAsync(monitor);

            monitorId = monitor.Id;
        }

        await using (var readDb = new PulseOpsDbContext(options))
        {
            var repository =
                new PostgresMonitorRepository(readDb);

            var persisted =
                await repository.GetByIdAsync(monitorId);

            Assert.NotNull(persisted);
            Assert.Equal(monitorId, persisted.Id);
            Assert.Equal("Integration Monitor", persisted.Name);
            Assert.Equal(
                new Uri("https://example.com"),
                persisted.Url);
            Assert.Equal(60, persisted.IntervalSeconds);
            Assert.True(persisted.Enabled);

            var all = await repository.GetAllAsync();

            Assert.Contains(
                all,
                monitor => monitor.Id == monitorId);
        }
    }
}
