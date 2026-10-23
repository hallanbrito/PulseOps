using PulseOps.Application.Monitors;
using PulseOps.Infrastructure.Monitors;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IMonitorRepository, InMemoryMonitorRepository>();
builder.Services.AddScoped<MonitorService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("frontend");

app.MapGet("/health", () => Results.Ok(new
{
    status = "ok",
    service = "PulseOps.Api",
    utc = DateTimeOffset.UtcNow
}));

app.MapGet("/api/monitors", async (MonitorService service, CancellationToken ct) =>
    Results.Ok(await service.ListAsync(ct)));

app.MapGet("/api/monitors/{id:guid}", async (Guid id, MonitorService service, CancellationToken ct) =>
{
    var monitor = await service.GetAsync(id, ct);
    return monitor is null ? Results.NotFound() : Results.Ok(monitor);
});

app.MapPost("/api/monitors", async (
    CreateMonitorRequest request,
    MonitorService service,
    CancellationToken ct) =>
{
    try
    {
        var monitor = await service.CreateAsync(request.Name, request.Url, request.IntervalSeconds, ct);
        return Results.Created($"/api/monitors/{monitor.Id}", monitor);
    }
    catch (ArgumentException exception)
    {
        return Results.BadRequest(new { error = exception.Message });
    }
});

app.Run();

public sealed record CreateMonitorRequest(string Name, string Url, int IntervalSeconds = 60);
