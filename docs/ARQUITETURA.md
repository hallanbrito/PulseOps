# Arquitetura — PulseOps

## Visão
O PulseOps começa como um **monólito modular** para manter clareza, testabilidade e baixo custo operacional.

```text
src/frontend/pulseops-web (Angular)
              |
           REST/JSON
              |
        PulseOps.Api
              |
      PulseOps.Application
         /          \
PulseOps.Domain   PulseOps.Infrastructure
                         |
                    PostgreSQL
```

## Backend
- **Domain:** entidades e invariantes; não conhece banco ou HTTP.
- **Application:** casos de uso e interfaces, como `IMonitorRepository`.
- **Infrastructure:** persistência e integrações. W0 começa com repositório em memória para manter o esqueleto simples e compilável.
- **API:** endpoints REST e composição de dependências.
- **Worker:** verificações periódicas em fatia posterior.

## Front-end
Angular 22, standalone components, roteamento e serviços HTTP. A geração via Angular CLI será validada por build na W0.

## Persistência
PostgreSQL + EF Core/Npgsql entram na próxima fatia, mantendo o domínio desacoplado.

## Segurança inicial
- Nenhum segredo versionado.
- Antes do monitoramento HTTP real, URLs terão proteção contra SSRF/redes internas.
- CORS limitado aos ambientes conhecidos.
