# Status — PulseOps

**Último marco homologado e integrado na `main`:** **W2 — Tela Angular de monitores integrada à API**, aprovada explicitamente pelo PO e incorporada via [PR #6](https://github.com/hallanbrito/PulseOps/pull/6) em **31/10/2026** (merge commit `06fcff13b02f5d166c9f95d7d3ae053012c1ae04`).

> Este documento registra o estado **integrado da `main`** após a autorização explícita do PO e o merge confirmado do PR #6. A integração de código **não equivale a deploy ou publicação em produção**.

## Estado integrado da branch principal

| Fatia | Estado integrado | Evidência |
|---|---|---|
| W0 — Fundação C.H. e esqueleto do MVP | Integrada com ressalva, em 23/10/2026 | [PR #2](https://github.com/hallanbrito/PulseOps/pull/2), merge `971cc1634f50f78f89d9249693bb024604463e8f` |
| W1 — Persistência com EF Core + PostgreSQL | Integrada, em 28/10/2026 | [PR #4](https://github.com/hallanbrito/PulseOps/pull/4), merge `701ecd175b157987e077b2a4ad419fd405acceff` |
| W2 — Listagem Angular integrada à API .NET | **Integrada**, em 31/10/2026, por decisão explícita do PO | [PR #6](https://github.com/hallanbrito/PulseOps/pull/6), merge `06fcff13b02f5d166c9f95d7d3ae053012c1ae04`; Issue #5 concluída |

O registro histórico da W0 inclui: .NET 10, esqueleto Angular e Método C.H.; a persistência em memória era uma **limitação da W0**, substituída pela integração PostgreSQL da W1. Ressalvas prévias de dependências npm e install scripts bloqueados **não são automaticamente consideradas resolvidas** pelo merge da W1.

## W2 — homologação técnica e integração concluídas

- **Escopo:** listagem Angular de monitores com API REST .NET e PostgreSQL.
- **Issue e PR:** [Issue #5](https://github.com/hallanbrito/PulseOps/issues/5) **fechada como concluída** · [PR #6](https://github.com/hallanbrito/PulseOps/pull/6) **mergeado**, originado na branch `agy/w2-angular-monitores`.
- **Parecer técnico:** **APROVADO_TECNICAMENTE** para os testes executados; evidências registradas em [CH-AUD-W2-R6](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6550699474) e [CH-AUD-W2-R7](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6550717215).
- **Smoke test real:** `/health` e `/api/monitors` HTTP 200; listagem Angular; falha 502 e recuperação; `POST /api/monitors` HTTP 201; 3 monitores apresentados; persistência de cadastro após reinício da API; viewport 390 px; override dinâmico de API e retorno ao proxy.
- **Reteste automatizado humano:** `dotnet test PulseOps.slnx` **2/2 PASS** (incluindo Testcontainers); `npm test -- --watch=false` **14/14 PASS**, três arquivos; `npm run build` **PASS**, pacote inicial 249,44 kB. **CI remoto do HEAD não foi confirmado nesta rodada.**
- **Ocorrência de ambiente resolvida localmente:** falha PostgreSQL `28P01` por divergência entre senha do `.env` da worktree W2 e senha efetiva do container `pulseops-postgres` do Compose `pulseops`. A correção foi apenas no **User Secrets local**, sem alterar banco, dados, volumes ou versionar segredos. Orientações em [Operação local](OPERACAO_LOCAL.md).
- **Hardening separado:** revisar publicação da porta PostgreSQL 5432 para `127.0.0.1`, mediante avaliação de impacto e rollback. Não faz parte da homologação W2.

## Decisão do Product Owner (PO)

**AUTORIZADA E EXECUTADA:** após a aprovação técnica nas rodadas R6/R7 e o fechamento documental, o PO autorizou explicitamente a integração da W2 em 31/10/2026. O [PR #6](https://github.com/hallanbrito/PulseOps/pull/6) foi mergeado com sucesso, e a [Issue #5](https://github.com/hallanbrito/PulseOps/issues/5) foi concluída. **Não houve autorização ou execução de deploy/publicação de produção.**

**Fontes:** [RUC-W2](CH/RUC-W2.md) · [Guia de operação local](OPERACAO_LOCAL.md) · [PR #6](https://github.com/hallanbrito/PulseOps/pull/6).
