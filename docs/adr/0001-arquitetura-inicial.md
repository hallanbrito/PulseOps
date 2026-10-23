# ADR-001 — Arquitetura inicial do PulseOps

- **Data:** 2026-10-23
- **Estado:** Aceita
- **Decisor:** PO Hallan

## Contexto
O projeto deve demonstrar competência profissional em C#/.NET e capacidade full-stack com uma tecnologia de front-end corporativa.

## Decisão
- ASP.NET Core em .NET 10 LTS.
- Angular 22 + TypeScript.
- PostgreSQL como persistência alvo.
- Monólito modular: Domain, Application, Infrastructure e API.
- REST/JSON entre frontend e backend.
- Worker .NET quando o monitoramento periódico entrar no escopo.

## Consequências
**Positivas:** stack reconhecível, baixa complexidade inicial, separação de responsabilidades e boa demonstrabilidade em entrevistas.

**Trade-offs:** mais estrutura do que um CRUD simples; persistência e Worker entram incrementalmente; microsserviços ficam deliberadamente fora até existir necessidade real.
