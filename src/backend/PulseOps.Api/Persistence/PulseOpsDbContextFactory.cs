using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using PulseOps.Infrastructure.Persistence;

namespace PulseOps.Api.Persistence;

public sealed class PulseOpsDbContextFactory
    : IDesignTimeDbContextFactory<PulseOpsDbContext>
{
    public PulseOpsDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .AddUserSecrets<PulseOpsDbContextFactory>(optional: true)
            .AddEnvironmentVariables()
            .Build();

        var connectionString =
            configuration.GetConnectionString("PulseOps")
            ?? throw new InvalidOperationException(
                "Connection string 'PulseOps' was not configured for design time.");

        var options = new DbContextOptionsBuilder<PulseOpsDbContext>()
            .UseNpgsql(connectionString)
            .Options;

        return new PulseOpsDbContext(options);
    }
}
