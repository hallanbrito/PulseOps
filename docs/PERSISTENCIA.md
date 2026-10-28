# Persistência PostgreSQL — PulseOps

## Visão geral

A partir da W1, os monitores são persistidos em PostgreSQL usando EF Core, Npgsql e PostgreSQL 18.6.

Fluxo:

API -> MonitorService -> IMonitorRepository -> PostgresMonitorRepository -> PulseOpsDbContext -> PostgreSQL

## Ambiente local

Copie `.env.example` para `.env`, defina uma senha local e nunca versione o `.env`.

Subir o PostgreSQL:

```bash
docker compose up -d
docker compose ps
```

## Connection string

A connection string local deve ser armazenada com .NET User Secrets no projeto PulseOps.Api.

## Executar a API

```bash
ASPNETCORE_ENVIRONMENT=Development dotnet run --project src/backend/PulseOps.Api --urls http://127.0.0.1:5000
```

## Migrations

Criar migration:

```bash
dotnet tool run dotnet-ef migrations add NomeDaMigration --project src/backend/PulseOps.Infrastructure --startup-project src/backend/PulseOps.Api --output-dir Persistence/Migrations
```

Aplicar migrations:

```bash
dotnet tool run dotnet-ef database update --project src/backend/PulseOps.Infrastructure --startup-project src/backend/PulseOps.Api
```

## Rollback

Para retornar ao estado anterior à primeira migration:

```bash
dotnet tool run dotnet-ef database update 0 --project src/backend/PulseOps.Infrastructure --startup-project src/backend/PulseOps.Api
```

Rollback pode destruir dados e não deve ocorrer automaticamente em produção.

## Testes

```bash
dotnet test PulseOps.slnx
```

Os testes de Infrastructure usam Testcontainers com PostgreSQL descartável.

## Evidência W1

Foi validado manualmente o fluxo POST -> PostgreSQL -> restart da API -> GET.
Os registros permaneceram após o restart.
