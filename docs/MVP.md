# MVP — PulseOps

## Problema
Equipes precisam saber se um serviço HTTP está disponível e acompanhar incidentes básicos.

## Entrega mínima
1. Health check da API.
2. Cadastro/listagem de monitores.
3. PostgreSQL.
4. Worker periódico.
5. Histórico de checks.
6. Dashboard Angular.
7. Abertura/fechamento automático de incidente por política simples.

## Fatias
- **W0:** fundação C.H., arquitetura, backend mínimo e geração Angular.
- **W1:** PostgreSQL + EF Core + migrations.
- **W2:** engine de checks + proteção SSRF.
- **W3:** incidentes e histórico.
- **W4:** dashboard Angular integrado.
- **W5:** testes, CI, Docker e documentação de demonstração.

Cada fatia termina em Draft PR, evidências e decisão do PO.
