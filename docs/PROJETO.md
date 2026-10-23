# Projeto — PulseOps

## Visão e valor
- **Objetivo:** monitorar serviços HTTP, registrar seu estado e evoluir para gestão automatizada de incidentes.
- **Usuários:** equipes de desenvolvimento, suporte, QA e operações.
- **Critério de sucesso do MVP:** cadastrar monitores, consultar estado, executar verificações e visualizar o resultado em uma interface Angular.

## Arquitetura atual
- **Backend:** C# / ASP.NET Core / .NET 10 LTS.
- **Frontend:** Angular 22 / TypeScript.
- **Persistência alvo:** PostgreSQL.
- **Estilo:** monólito modular com Domain, Application, Infrastructure e API.
- **Integração:** REST/JSON.
- **Automação:** Worker .NET em fatia posterior.
- **Qualidade:** testes automatizados + CI antes de integração.

## Componentes previstos
- `PulseOps.Domain`: entidades e regras centrais.
- `PulseOps.Application`: casos de uso e portas.
- `PulseOps.Infrastructure`: persistência e integrações.
- `PulseOps.Api`: endpoints HTTP e composição.
- `PulseOps.Worker`: verificações agendadas (posterior).
- `src/frontend/pulseops-web`: aplicação Angular.

## Limites e decisões
- O MVP começa simples; sem microsserviços.
- PostgreSQL será integrado sem acoplar regras de domínio ao EF Core.
- Autenticação, alertas externos e deploy público ficam fora da W0.
- Merge e deploy exigem autorização explícita do PO.

## Fontes de verdade
- `AGENTS.md`: regras dos agentes.
- `docs/STATUS.md`: marcos homologados.
- Issues do GitHub: trabalho corrente.
- `docs/CH/DECISOES.md`: decisões aceitas.
- `docs/ARQUITETURA.md`: arquitetura vigente.
- `docs/ARVORE_PROJETO.md`: árvore gerada localmente pelo `ch_tree.py`.
