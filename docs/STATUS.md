# Status — PulseOps

**Último marco homologado e integrado:** W0 — Fundação C.H. + esqueleto executável do MVP (**HOMOLOGADO COM RESSALVA**, 2026-10-23).

## Estado integrado da branch principal
- Baseline inicial: `aa2278071bc8165cf48efa872fa4e70f0991a473`
- W0: integrada em `main` pelo PR #2.
- Merge commit: `971cc1634f50f78f89d9249693bb024604463e8f`.
- Issue #1: concluída.
- PR #2: mergeado.

## Evidências da W0
- Backend .NET 10: build e testes validados.
- API ASP.NET Core: health check e fluxo inicial de monitores validados.
- Angular 22: scaffold, `npm ci`, testes e build validados.
- Método C.H.: fundação, árvore do projeto, RUC e decisões registrados.

## Ressalvas aceitas
- `npm ci` reportou 2 vulnerabilidades: 1 low e 1 high.
- 4 install scripts foram bloqueados pelo npm.
- Nenhum `npm audit fix --force` foi autorizado.
- Persistência continua in-memory nesta fatia; PostgreSQL/EF Core pertence à W1.

## Próximo marco
- W1 — persistência com EF Core + PostgreSQL.
- A ressalva npm deve ser analisada antes de qualquer deploy/produção.

> Este arquivo registra marcos homologados e o estado factual da branch principal.
