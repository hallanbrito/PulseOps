using PulseOps.Domain.Monitors;

namespace PulseOps.Domain.Tests;

public class ServiceMonitorTests
{
    [Fact]
    public void Deve_rejeitar_intervalo_menor_que_30_segundos()
    {
        // Preparar
        var nome = "Minha API";
        var url = new Uri("https://example.com");
        var intervalo = 29;

        // Executar
        var acao = () => new ServiceMonitor(nome, url, intervalo);

        // Verificar
        Assert.Throws<ArgumentOutOfRangeException>(acao);
    }
}
