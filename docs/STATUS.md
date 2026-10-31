# Status — PulseOps

**Último marco homologado e integrado na `main`:** **W1 — Persistência EF Core + PostgreSQL**, integrada via [PR #4](https://github.com/hallanbrito/PulseOps/pull/4) em **28/10/2026** (merge commit `701ecd175b157987e077b2a4ad419fd405acceff`).

> Este documento distingue o **estado integrado da `main`** das entregas avaliadas na branch de trabalho. A alteração deste arquivo dentro do Draft PR #6 **não** integra automaticamente a W2.

## Estado integrado da branch principal

| Fatia | Estado integrado | Evidência |
|---|---|---|
| W0 — Fundação C.H. e esqueleto do MVP | Integrada com ressalva, em 23/10/2026 | [PR #2](https://github.com/hallanbrito/PulseOps/pull/2), merge `971cc1634f50f78f89d9249693bb024604463e8f` |
| W1 — Persistência com EF Core + PostgreSQL | Integrada, em 28/10/2026 | [PR #4](https://github.com/hallanbrito/PulseOps/pull/4), merge `701ecd175b157987e077b2a4ad419fd405acceff` |

O registro histórico da W0 inclui: .NET 10, esqueleto Angular e Método C.H.; a persistência em memória era uma **limitação da W0**, substituída pela integração PostgreSQL da W1. Ressalvas prévias de dependências npm e install scripts bloqueados **não são automaticamente consideradas resolvidas** pelo merge da W1.

## Entrega em avaliação — W2 (não integrada à main)

- **Escopo:** listagem Angular de monitores com API REST .NET e PostgreSQL.
- **Issue e PR:** [Issue #5](https://github.com/hallanbrito/PulseOps/issues/5) · [Draft PR #6](https://github.com/hallanbrito/PulseOps/pull/6), branch `agy/w2-angular-monitores`.
- **Parecer técnico:** **APROVADO_TECNICAMENTE** para os testes executados; evidências registradas em [CH-AUD-W2-R6](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6550699474) e [CH-AUD-W2-R7](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6550717215).
- **Smoke test real:** `/health` e `/api/monitors` HTTP 200; listagem Angular; falha 502 e recuperação; `POST /api/monitors` HTTP 201; 3 monitores apresentados; persistência de cadastro após reinício da API; viewport 390 px; override dinâmico de API e retorno ao proxy.
- **Reteste automatizado humano:** `dotnet test PulseOps.slnx` **2/2 PASS** (incluindo Testcontainers); `npm test -- --watch=false` **14/14 PASS**, três arquivos; `npm run build` **PASS**, pacote inicial 249,44 kB. **CI remoto do HEAD não foi confirmado nesta rodada.**
- **Ocorrência de ambiente resolvida localmente:** falha PostgreSQL `28P01` por divergência entre senha do `.env` da worktree W2 e senha efetiva do container `pulseops-postgres` do Compose `pulseops`. A correção foi apenas no **User Secrets local**, sem alterar banco, dados, volumes ou versionar segredos. Orientações em [Operação local](OPERACAO_LOCAL.md).
- **Hardening separado:** revisar publicação da porta PostgreSQL 5432 para `127.0.0.1`, mediante avaliação de impacto e rollback. Não faz parte da homologação W2.

## Decisão do Product Owner (PO)

**PENDENTE DE AUTORIZAÇÃO EXPLÍCITA PARA MERGE.** A implementação W2 foi aprovada tecnicamente dentro do escopo verificado, mas o [PR #6](https://github.com/hallanbrito/PulseOps/pull/6) permanece **Draft**, não incorporado à `main` e sem autorização de deploy/publicação. Conferir diff e controles da branch antes de qualquer integração.

**Fontes:** [RUC-W2](CH/RUC-W2.md) · [Guia de operação local](OPERACAO_LOCAL.md) · [PR #6](https://github.com/hallanbrito/PulseOps/pull/6).
