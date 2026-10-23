# PulseOps

Plataforma de monitoramento de serviços e gestão de incidentes, construída como projeto-vitrine full-stack com **C#/.NET + Angular**.

## Objetivo

Permitir cadastrar serviços HTTP, acompanhar disponibilidade e histórico de verificações e evoluir para abertura/fechamento automatizado de incidentes.

## Stack alvo

- Backend: ASP.NET Core / C# / .NET 10 LTS
- Frontend: Angular 22 / TypeScript
- Persistência: PostgreSQL
- Qualidade: testes automatizados, CI e documentação
- Governança: Método C.H. / CHDevFlow

## Arquitetura

O projeto começa como **monólito modular**, separando domínio, aplicação, infraestrutura e API. O front-end Angular permanece desacoplado por REST.

```text
Angular
   |
 REST API
   |
ASP.NET Core
   |
Application
   |
Domain
   |
Infrastructure
   |
PostgreSQL
```

## Estado

Repositório inicial criado. A primeira fatia será **W0 — Fundação C.H. + esqueleto executável do MVP**.

Consulte `docs/PROJETO.md` e `docs/STATUS.md` quando a fundação estiver integrada.
