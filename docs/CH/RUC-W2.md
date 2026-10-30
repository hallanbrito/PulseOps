# RUC/1.0 — PulseOps — Fatia W2 (Tentativa 2 — Correções CH-AUD-W2)

> Relatório Universal C.H. em conformidade com o protocolo CHDevFlow. Registra as evidências verificáveis da implementação técnica e da rodada de correções da auditoria da Fatia W2. Não constitui homologação de PO nem autorização de merge.

**Cabeçalho:**
- **Missão / Issue:** [#5](https://github.com/hallanbrito/PulseOps/issues/5) — W2: Tela Angular de monitores integrada à API (CH-2)
- **Draft PR:** [#6](https://github.com/hallanbrito/PulseOps/pull/6) — W2: Tela Angular de monitores integrada à API (CH-2)
- **Auditoria de referência:** [CH-AUD-W2 (comentário em PR #6)](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6523536845)
- **Executor declarado:** AGY / Antigravity (Gemini 3.8 Flash)
- **Coordenação e auditoria documental:** ChatGPT
- **Product Owner (PO):** Hallan de Sousa Brito
- **Nível CH autorizado:** CH-2 restrito à branch isolada
- **Ambiente de execução:** Linux (CachyOS x86_64); .NET SDK 10.0.113; Node.js v24.22.1; npm 12.2.1; Angular 22.2.4; Vitest 5.0.5
- **Fonte de verdade:** LIVE_GITHUB (Issue #5, PR #6, origin/main) + LOCAL_REPO
- **Timestamp:** 2026-10-30T14:02:00Z
- **Baseline SHA:** `701ecd175b157987e077b2a4ad419fd405acceff`
- **Branch de trabalho:** `agy/w2-angular-monitores`
- **Resultado técnico:** APROVADO_TECNICAMENTE (Draft PR pronto para reavaliação independente do ChatGPT)

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Repositório | `hallanbrito/PulseOps` |
| Issue de referência | [#5 — W2 — Tela Angular de monitores integrada à API (CH-2)](https://github.com/hallanbrito/PulseOps/issues/5) |
| Baseline commit | `701ecd175b157987e077b2a4ad419fd405acceff` (`origin/main`) |
| Branch de trabalho | `agy/w2-angular-monitores` |
| Target branch do PR | `main` |
| Tipo de entrega | Draft PR com RUC/1.0 |
| Custo financeiro adicional | R$ 0,00 |

---

## 2. Resumo executivo

Implementação da tela Angular de monitores integrada à API REST de leitura do PulseOps (`GET /api/monitors`), com aplicação das correções solicitadas na auditoria **CH-AUD-W2**:
1. **AUD-01 (Configuração da API):** Configurado proxy de desenvolvimento (`proxy.conf.json`) integrado ao `angular.json` e suporte a override em runtime via `window.__PULSEOPS_API_URL__`, permitindo alternar o alvo da API sem alteração de código-fonte.
2. **AUD-02 (Semântica de estado):** Rótulos do campo `enabled` alterados de "Ativo / Inativo" para "Habilitado / Desabilitado", evitando falsa interpretação de disponibilidade/saúde do serviço antes da existência do Worker.
3. **AUD-03 (Precisão documental e validação):** Inventário corrigido para refletir exatamente os 20 arquivos alterados no diff do PR, classificação rigorosa dos testes locais como declaração do agente (ausência de CI remota no repositório) e documentação de procedimento passo a passo para smoke test manual contra a API e PostgreSQL reais.

Todos os 14 testes unitários Vitest e 2 testes xUnit backend passaram com 100% de sucesso. Custo adicional R$ 0,00. Nenhum merge, deploy ou escrita direta na branch `main`.

---

## 3. Consultas e atividades realizadas

| ID | Ação | Escopo / Resultado |
|---|---|---|
| A01 | Inspeção da auditoria CH-AUD-W2 | Mapeadas correções AUD-01 (proxy/config), AUD-02 (rótulos Habilitado/Desabilitado) e AUD-03 (inventário documental e separação de CI). |
| A02 | Configuração de proxy no Angular CLI | Criado `proxy.conf.json` apontando `/api` para `http://localhost:5000` e registrado em `angular.json` sob a configuração de desenvolvimento do `serve`. |
| A03 | Suporte a override de API sem alteração de código | Atualizado `API_BASE_URL` para retornar caminho relativo por padrão (usando proxy) ou valor definido via `window.__PULSEOPS_API_URL__` em runtime. |
| A04 | Correção semântica dos crachás de estado | Atualizados template `monitor-list.html` e testes `monitor-list.spec.ts` para exibir `Habilitado / Desabilitado` com atributo `title` explicativo. |
| A05 | Ampliação da suíte de testes do serviço | Adicionados testes unitários em `monitor.service.spec.ts` validando caminho relativo com proxy e override dinâmico via `window.__PULSEOPS_API_URL__` (totalizando 6 testes no serviço). |
| A06 | Execução e validação de suítes de teste | Validados 14 testes no frontend (Vitest) e 2 testes no backend (xUnit com Testcontainers). |
| A07 | Verificação de build e estilo | `npm run build` gerou bundle em 4.3s sem erros ou warnings de orçamento; `prettier` e `git diff --check` validados. |
| A08 | Atualização documental do RUC | Registro detalhado do inventário de arquivos, distinção entre testes locais e CI remota, e guia de smoke test manual. |

---

## 4. Evidências verificáveis

| ID | Classe | Fonte / Referência | Fato observado e limite |
|---|---|---|---|
| E01 | OBSERVADO | `git rev-parse origin/main` | Baseline confirmada em `701ecd175b157987e077b2a4ad419fd405acceff`. |
| E02 | DECLARADO PELO AGY | Execução local CachyOS (`dotnet test PulseOps.slnx`) | 2 testes xUnit aprovados (`PulseOps.Domain.Tests` e `PulseOps.Infrastructure.Tests` com Testcontainers). |
| E03 | DECLARADO PELO AGY | Execução local CachyOS (`npm ci`) | Instalação concluída com sucesso em 8s. Mantida ressalva aceita da W0/W1 (2 vulnerabilidades em devDependencies e 4 install scripts bloqueados; nenhum `--force`). |
| E04 | DECLARADO PELO AGY | Execução local CachyOS (`npm test -- --watch=false`) | 3 arquivos de teste, 14 testes executados e aprovados (100% PASS) em 4.5s via Vitest. |
| E05 | DECLARADO PELO AGY | Execução local CachyOS (`npm run build`) | Build de produção gerado com sucesso em 4.3s; total inicial de 249.19 kB (68.95 kB transfer). 0 warnings de orçamento. |
| E06 | DECLARADO PELO AGY | Execução local CachyOS (`npx prettier --check`) | Todos os arquivos TypeScript, HTML, SCSS e JSON validados conforme regras de formatação. |
| E07 | DECLARADO PELO AGY | Execução local CachyOS (`git diff --check`) | Nenhuma inconformidade de whitespace ou caracteres indesejados no diff. |
| E08 | OBSERVADO | `gh pr checks 6` | `no checks reported`: O repositório PulseOps **NÃO possui CI remota (GitHub Actions)** configurada nesta branch. Testes foram executados estritamente no ambiente local do agente. |
| E09 | DECLARADO | Protocolo de execução | Custo financeiro adicional R$ 0,00; nenhuma chamada a serviços externos pagos. |
| E10 | OBSERVADO | Código-fonte | Nenhuma credencial, segredo ou token real versionado. |
| E11 | OBSERVADO | `git status` | Execução restrita à branch isolada `agy/w2-angular-monitores`. Árvore de trabalho íntegra. |

---

## 5. Verificações e resultados

| Teste | Critério de Aceite / Auditoria | Resultado | Evidência |
|---|---|---|---|
| T01 | Frontend não exibe scaffold Angular | PASSOU | `app.html` e `app.spec.ts` substituídos por layout shell e marca PulseOps. |
| T02 | Tela apresenta monitores reais da API | PASSOU | `MonitorList` consome `GET /api/monitors` e renderiza campos do modelo C#. |
| T03 | Estados explícitos (loading, empty, error, retry, success) | PASSOU | Implementados com signals e testados individualmente em `monitor-list.spec.ts`. |
| T04 | Semântica de estado (AUD-02) | PASSOU | Rótulo corrigido para `Habilitado / Desabilitado`, sem sugerir disponibilidade de rede. |
| T05 | Configuração de API em dev sem alterar código (AUD-01) | PASSOU | `proxy.conf.json` configurado no `angular.json` + fallback `window.__PULSEOPS_API_URL__` testado. |
| T06 | Testes automatizados do frontend | PASSOU | 14/14 testes unitários aprovados via Vitest (`npm test -- --watch=false`). |
| T07 | Regressão de testes do backend | PASSOU | 2/2 testes xUnit aprovados via `dotnet test`. |
| T08 | Build de produção do frontend | PASSOU | `npm run build` executado com 0 erros e 0 avisos. |
| T09 | Conformidade de formatação | PASSOU | `prettier --check` e `git diff --check` sem erros. |
| T10 | Proteção de escopo e governança | PASSOU | R$ 0 de custo; sem deploy, merge ou alterações em backend. |

---

## 6. Riscos e bloqueios

1. **Ressalva de dependências npm:** As 2 vulnerabilidades transitivas em devDependencies e os 4 install scripts bloqueados são herdados do scaffold inicial (W0) e permanecem documentados como ressalva aceita pelo PO. Nenhum `--force` foi utilizado.
2. **Ausência de CI remota:** O repositório PulseOps não possui GitHub Actions configurado para executar testes automaticamente em Pull Requests. Todas as evidências de teste correspondem a execuções locais verificáveis no ambiente do executor.
3. **Ausência de Worker ativo:** O backend ainda não executa pings periódicos automáticos (escopo posterior). O status exibido na interface corresponde estritamente à habilitação administrativa do cadastro.

---

## 7. Alterações realizadas (Inventário completo do diff)

Total de arquivos impactados em relação a `origin/main`: **20 arquivos** (10 modificados, 10 novos).

- **Novos arquivos (10):**
  1. `docs/CH/RUC-W2.md` — Relatório Universal C.H. versão 1.0.
  2. `src/frontend/pulseops-web/proxy.conf.json` — Configuração de proxy de desenvolvimento para `/api`.
  3. `src/frontend/pulseops-web/src/app/models/monitor.model.ts` — Interface `ServiceMonitor`.
  4. `src/frontend/pulseops-web/src/app/config/api.config.ts` — Injection token `API_BASE_URL` com proxy e runtime override.
  5. `src/frontend/pulseops-web/src/app/services/monitor.service.ts` — Serviço de consulta REST tipado.
  6. `src/frontend/pulseops-web/src/app/services/monitor.service.spec.ts` — 6 testes unitários do serviço.
  7. `src/frontend/pulseops-web/src/app/components/monitor-list/monitor-list.ts` — Componente standalone `MonitorList`.
  8. `src/frontend/pulseops-web/src/app/components/monitor-list/monitor-list.html` — Template com 4 estados e rótulo Habilitado/Desabilitado.
  9. `src/frontend/pulseops-web/src/app/components/monitor-list/monitor-list.scss` — Estilos responsivos do componente.
  10. `src/frontend/pulseops-web/src/app/components/monitor-list/monitor-list.spec.ts` — 6 testes unitários do componente.

- **Arquivos modificados (10):**
  11. `src/frontend/pulseops-web/angular.json` — Adicionada configuração `"proxyConfig": "proxy.conf.json"` no serve de desenvolvimento.
  12. `src/frontend/pulseops-web/src/app/app.config.ts` — Adicionado provider `provideHttpClient()`.
  3. `src/frontend/pulseops-web/src/app/app.routes.ts` — Configurada rota padrão direcionando para `MonitorList`.
  14. `src/frontend/pulseops-web/src/app/app.ts` — Atualizado componente raiz.
  15. `src/frontend/pulseops-web/src/app/app.html` — Removido scaffold padrão e adicionado shell da aplicação.
  16. `src/frontend/pulseops-web/src/app/app.scss` — Estilos de layout e barra de navegação.
  17. `src/frontend/pulseops-web/src/app/app.spec.ts` — Testes atualizados para o shell da aplicação.
  18. `src/frontend/pulseops-web/src/app/main.ts` — Ajuste de formatação Prettier.
  19. `src/frontend/pulseops-web/src/styles.scss` — Variáveis de tema e reset global.
  20. `src/frontend/pulseops-web/src/index.html` — Título atualizado para `PulseOps — Monitoramento de Serviços`.

---

## 8. Procedimento de validação manual (Smoke Test com API e PostgreSQL reais)

> **Aviso de integridade:** Este procedimento destina-se à validação humana e auditoria independente. A execução ponta-a-ponta contra banco PostgreSQL de longa duração NÃO foi realizada na sessão automatizada do agente (onde apenas os testes xUnit com Testcontainers efêmero foram executados).

### Pré-requisitos
- Docker instalado e ativo.
- .NET SDK 10 instalado.
- Node.js (v24+) e npm instalados.

### Passo 1 — Subir o banco PostgreSQL
```bash
docker compose up -d
docker compose ps
```
Verifique se o serviço `pulseops-postgres` reporta status `healthy`.

### Passo 2 — Aplicar migrations do banco de dados
```bash
dotnet tool run dotnet-ef database update \
  --project src/backend/PulseOps.Infrastructure \
  --startup-project src/backend/PulseOps.Api
```

### Passo 3 — Iniciar a API ASP.NET Core
```bash
ASPNETCORE_ENVIRONMENT=Development dotnet run \
  --project src/backend/PulseOps.Api \
  --urls http://127.0.0.1:5000
```
Confirme que `http://127.0.0.1:5000/health` responde HTTP 200 com `{"status":"ok"}`.

### Passo 4 — Opcional: Criar um monitor de teste via API
```bash
curl -X POST http://127.0.0.1:5000/api/monitors \
  -H "Content-Type: application/json" \
  -d '{"name": "Serviço de Teste", "url": "https://httpbin.org/status/200", "intervalSeconds": 60}'
```

### Passo 5 — Iniciar o frontend Angular com proxy
Em outro terminal:
```bash
cd src/frontend/pulseops-web
npm start
```
O servidor de desenvolvimento Angular iniciará em `http://localhost:4200`, encaminhando requisições para `/api` automaticamente para `http://localhost:5000`.

### Passo 6 — Validações visuais no navegador
Abra `http://localhost:4200`:
1. **Estado Success:** O monitor cadastrado deve ser listado com nome, URL clicável, intervalo e crachá **Habilitado**.
2. **Alternar alvo da API sem alterar código:**
   - Para apontar para outra porta/endereço, basta alterar `"target": "http://outro-host:porta"` em `proxy.conf.json` e reiniciar `npm start`.
   - Alternativamente, sem reiniciar nada, abra o console do DevTools (F12) e execute:
     ```javascript
     window.__PULSEOPS_API_URL__ = 'http://127.0.0.1:5001';
     ```
     Em seguida, clique no botão "Atualizar" na tela.
3. **Estado Error e Retry:** Interrompa a API (Ctrl+C no terminal da API) e clique no botão "Atualizar" no navegador. A tela exibirá a mensagem de erro de comunicação e o botão "Tentar novamente". Ao religar a API e clicar em "Tentar novamente", a lista será restabelecida.

---

## 9. Recomendação técnica

**APROVADO_TECNICAMENTE** — Todas as solicitações da auditoria CH-AUD-W2 (AUD-01, AUD-02 e AUD-03) foram sanadas com precisão e testes automatizados correspondentes. O Draft PR #6 está atualizado e pronto para nova auditoria independente do ChatGPT.

---

## 10. Decisão necessária do PO

**PENDENTE** — Aguardando nova auditoria independente do ChatGPT e subsequente decisão explícita de homologação e merge pelo Product Owner (Hallan). Proibido merge automático.
