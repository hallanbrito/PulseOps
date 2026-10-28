namespace PulseOps.Domain.Monitors;

public sealed class ServiceMonitor
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public Uri Url { get; private set; }
    public int IntervalSeconds { get; private set; }
    public bool Enabled { get; private set; }
    public DateTimeOffset CreatedAtUtc { get; private set; }

    public ServiceMonitor(string name, Uri url, int intervalSeconds)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException(
                "Monitor name is required.",
                nameof(name));

        if (url.Scheme is not ("http" or "https"))
            throw new ArgumentException(
                "Only HTTP/HTTPS URLs are allowed.",
                nameof(url));

        if (intervalSeconds < 30)
            throw new ArgumentOutOfRangeException(
                nameof(intervalSeconds),
                "Minimum interval is 30 seconds.");

        Id = Guid.NewGuid();
        Name = name.Trim();
        Url = url;
        IntervalSeconds = intervalSeconds;
        Enabled = true;
        CreatedAtUtc = DateTimeOffset.UtcNow;
    }

    public void Disable() => Enabled = false;
    public void Enable() => Enabled = true;
}
