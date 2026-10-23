# Status — PulseOps

**Último marco homologado:** W0 — Fundação C.H. + esqueleto executável do MVP (**HOMOLOGADO COM RESSALVA**, 2026-10-23).

## Estado integrado da branch principal
- Baseline inicial: `aa2278071bc8165cf48efa872fa4e70f0991a473`
- W0: homologada na branch `ch/w0-foundation-mvp`.
- Integração em `main`: **pendente de autorização explícita de merge**.
- Issue: #1.
- Draft PR: #2.

## Evidências da W0
- Backend .NET 10: build e testes validados.
- API ASP.NET Core: health check e fluxo inicial de monitores validados.
- Angular 22: scaffold, `npm ci`, testes e build validados.
- Método C.H.: fundação, árvore do projeto, RUC e decisões registradas.

## Ressalvas aceitas
- `npm ci` reportou 2 vulnerabilidades: 1 low e 1 high.
- 4 install scripts foram bloqueados pelo npm.
- Nenhum `npm audit fix --force` foi autorizado.
- Persistência continua in-memory nesta fatia; PostgreSQL/EF Core pertence à W1.

## Próxima decisão do PO
- Autorizar ou não o merge do PR #2 em `main`.
- Após integração da W0, abrir W1 — persistência com EF Core + PostgreSQL.

> Este arquivo registra somente marcos homologados e estado factual. A homologação não implica merge automático.
