# RUC/1.0 — PulseOps — Fatia W2 (Tentativa 3 — Correções CH-AUD-W2-R2)

> Relatório Universal C.H. em conformidade com o protocolo CHDevFlow. Registra as evidências verificáveis da implementação técnica e das rodadas de correção da auditoria da Fatia W2. Não constitui homologação de PO nem autorização de merge.

**Cabeçalho:**
- **Missão / Issue:** [#5](https://github.com/hallanbrito/PulseOps/issues/5) — W2: Tela Angular de monitores integrada à API (CH-2)
- **Draft PR:** [#6](https://github.com/hallanbrito/PulseOps/pull/6) — W2: Tela Angular de monitores integrada à API (CH-2)
- **Auditoria R1:** [CH-AUD-W2 (comentário em PR #6)](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6523536845)
- **Auditoria R2 de referência:** [CH-AUD-W2-R2 (comentário em PR #6)](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6524817410)
- **Executor declarado:** AGY / Antigravity (Gemini 3.8 Flash)
- **Coordenação e auditoria documental:** ChatGPT
- **Product Owner (PO):** Hallan de Sousa Brito
- **Nível CH autorizado:** CH-2 restrito à branch isolada
- **Ambiente de execução:** Linux (CachyOS x86_64); .NET SDK 10.0.113; Node.js v24.22.1; npm 12.2.1; Angular 22.2.4; Vitest 5.0.5
- **Fonte de verdade:** LIVE_GITHUB (Issue #5, PR #6, origin/main) + LOCAL_REPO
- **Timestamp:** 2026-10-30T14:24:00Z
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

Implementação da tela Angular de monitores integrada à API REST de leitura do PulseOps (`GET /api/monitors`), com atendimento integral aos apontamentos da auditoria independente **CH-AUD-W2-R2**:
1. **R2-01 (Override em runtime dinâmico):** `MonitorService.getBaseUrl()` agora é avaliado a cada requisição (`getMonitors()`), permitindo que atribuições em `window.__PULSEOPS_API_URL__` feitas no console DevTools a qualquer momento após a inicialização passem a valer imediatamente no próximo clique de "Atualizar". Teste unitário específico incluído para comprovar o ciclo de vida dinâmico.
2. **R2-02 (Roteiro manual reproduzível em ambiente limpo e harmonização):** O target do proxy em `proxy.conf.json` foi harmonizado para `http://127.0.0.1:5000`, alinhando-se com o bind da API e evitando divergência de resolução IPv4/IPv6 em `localhost`. O guia de smoke test manual foi reescrito contemplando explicitamente a criação de `.env` a partir de `.env.example`, configuração de `ConnectionStrings:PulseOps` via `dotnet user-secrets`, restauração de ferramentas locais com `dotnet tool restore` (`dotnet-ef`), execução de migrations e teste completo via proxy.
3. **R2-03 (Metadados e acabamento):** Correção de referências de HEAD SHA, correção de numeração no inventário documental (item 13 para `app.routes.ts`) e proteção contra overflow horizontal no grid CSS em viewports de 320px com `minmax(min(100%, 280px), 1fr)`.

Todos os 14 testes unitários Vitest e 2 testes xUnit backend passaram com 100% de sucesso. Custo adicional R$ 0,00. Nenhum merge, deploy ou escrita direta na branch `main`.

---

## 3. Consultas e atividades realizadas

| ID | Ação | Escopo / Resultado |
|---|---|---|
| A01 | Inspeção da auditoria CH-AUD-W2-R2 | Identificadas correções R2-01 (avaliação dinâmica de runtime override), R2-02 (guia manual completo e bind 127.0.0.1) e R2-03 (acabamentos de SHA, CSS e numeração). |
| A02 | Refatoração de `MonitorService.getBaseUrl()` (R2-01) | Extração do cálculo dinâmico da URL base avaliado no momento de cada chamada `getMonitors()`, priorizando `window.__PULSEOPS_API_URL__` se definido no browser, seguido de DI e proxy relativo por padrão. |
| A03 | Teste do ciclo de vida de override dinâmico (R2-01) | Suíte `monitor.service.spec.ts` atualizada para verificar chamada inicial relativa, injeção de `window.__PULSEOPS_API_URL__` pós-inicialização com validação da URL customizada e remoção do override retornando ao proxy. |
| A04 | Harmonização de rede 127.0.0.1 (R2-02) | `proxy.conf.json` atualizado com `"target": "http://127.0.0.1:5000"`, alinhado ao bind documentado da API ASP.NET Core (`http://127.0.0.1:5000`). |
| A05 | Ajuste de responsividade CSS (R2-03) | `.monitors-grid` atualizado para `minmax(min(100%, 280px), 1fr)` e `.monitor-card` com `min-width: 0`, eliminando qualquer risco de overflow horizontal em telas móveis estreitas (320px). |
| A06 | Validação de suítes de teste e compilação | Executados `npm test -- --watch=false` (14/14 aprovados), `npm run build` (bundle de 249.44 kB sem warnings de budget) e `dotnet test PulseOps.slnx` (2/2 aprovados). |
| A07 | Verificação de estilo | `prettier --check` e `git diff --check` aprovados sem inconformidades. |
| A08 | Atualização documental completa (R2-02 e R2-03) | RUC/1.0 atualizado com roteiro completo de setup limpo e correção das referências. |

---

## 4. Evidências verificáveis

| ID | Classe | Fonte / Referência | Fato observado e limite |
|---|---|---|---|
| E01 | OBSERVADO | `git rev-parse origin/main` | Baseline confirmada em `701ecd175b157987e077b2a4ad419fd405acceff`. |
| E02 | DECLARADO PELO AGY | Execução local CachyOS (`dotnet test PulseOps.slnx`) | 2 testes xUnit aprovados (`PulseOps.Domain.Tests` e `PulseOps.Infrastructure.Tests` com Testcontainers). |
| E03 | DECLARADO PELO AGY | Execução local CachyOS (`npm ci`) | Instalação concluída com sucesso em 8s. Mantida ressalva aceita da W0/W1 (2 vulnerabilidades em devDependencies e 4 install scripts bloqueados; nenhum `--force`). |
| E04 | DECLARADO PELO AGY | Execução local CachyOS (`npm test -- --watch=false`) | 3 arquivos de teste, 14 testes executados e aprovados (100% PASS) em 5.8s via Vitest. |
| E05 | DECLARADO PELO AGY | Execução local CachyOS (`npm run build`) | Build de produção gerado com sucesso em 4.5s; total inicial de 249.44 kB (69.11 kB transfer). 0 warnings de orçamento. |
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
| T04 | Semântica de estado (AUD-02) | PASSOU | Rótulo configurado como `Habilitado / Desabilitado`, sem sugerir disponibilidade de rede. |
| T05 | Configuração de API via proxy e override dinâmico (AUD-01 / R2-01) | PASSOU | `proxy.conf.json` (127.0.0.1:5000) + override avaliado dinamicamente a cada requisição. |
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
  2. `src/frontend/pulseops-web/proxy.conf.json` — Configuração de proxy de desenvolvimento para `/api` apontando para `http://127.0.0.1:5000`.
  3. `src/frontend/pulseops-web/src/app/models/monitor.model.ts` — Interface `ServiceMonitor`.
  4. `src/frontend/pulseops-web/src/app/config/api.config.ts` — Injection token `API_BASE_URL`.
  5. `src/frontend/pulseops-web/src/app/services/monitor.service.ts` — Serviço de consulta REST com avaliação dinâmica de base URL.
  6. `src/frontend/pulseops-web/src/app/services/monitor.service.spec.ts` — 6 testes unitários do serviço cobrindo proxy, DI e ciclo de vida dinâmico de override.
  7. `src/frontend/pulseops-web/src/app/components/monitor-list/monitor-list.ts` — Componente standalone `MonitorList`.
  8. `src/frontend/pulseops-web/src/app/components/monitor-list/monitor-list.html` — Template com 4 estados e crachás `Habilitado / Desabilitado`.
  9. `src/frontend/pulseops-web/src/app/components/monitor-list/monitor-list.scss` — Estilos responsivos com proteção contra overflow (`minmax(min(100%, 280px), 1fr)`).
  10. `src/frontend/pulseops-web/src/app/components/monitor-list/monitor-list.spec.ts` — 6 testes unitários do componente.

- **Arquivos modificados (10):**
  11. `src/frontend/pulseops-web/angular.json` — Adicionada configuração `"proxyConfig": "proxy.conf.json"` no serve de desenvolvimento.
  12. `src/frontend/pulseops-web/src/app/app.config.ts` — Adicionado provider `provideHttpClient()`.
  13. `src/frontend/pulseops-web/src/app/app.routes.ts` — Configurada rota padrão direcionando para `MonitorList`.
  14. `src/frontend/pulseops-web/src/app/app.ts` — Atualizado componente raiz.
  15. `src/frontend/pulseops-web/src/app/app.html` — Removido scaffold padrão e adicionado shell da aplicação.
  16. `src/frontend/pulseops-web/src/app/app.scss` — Estilos de layout e barra de navegação.
  17. `src/frontend/pulseops-web/src/app/app.spec.ts` — Testes atualizados para o shell da aplicação.
  18. `src/frontend/pulseops-web/src/app/main.ts` — Ajuste de formatação Prettier.
  19. `src/frontend/pulseops-web/src/styles.scss` — Variáveis de tema e reset global.
  20. `src/frontend/pulseops-web/src/index.html` — Título atualizado para `PulseOps — Monitoramento de Serviços`.

---

## 8. Procedimento de validação manual (Smoke Test com API e PostgreSQL reais em clone limpo)

> **Aviso de integridade:** Este procedimento destina-se à validação humana e auditoria independente. A execução ponta-a-ponta contra banco PostgreSQL de longa duração NÃO foi realizada na sessão automatizada do agente (onde apenas os testes xUnit com Testcontainers efêmero foram executados).

### Pré-requisitos
- Docker e Docker Compose instalados e em execução.
- .NET SDK 10 instalado (`dotnet --version` >= 10.0.100).
- Node.js (v24+) e npm instalados.

### Passo 1 — Configurar variáveis de ambiente do PostgreSQL
O arquivo `compose.yaml` requer as variáveis `POSTGRES_DB`, `POSTGRES_USER` e `POSTGRES_PASSWORD` no arquivo `.env`. Copie o template da W1:
```bash
cp .env.example .env
```
O `.env.example` já fornece valores padrão para desenvolvimento local (`POSTGRES_DB=pulseops`, `POSTGRES_USER=pulseops`, `POSTGRES_PASSWORD=pulseops`).

### Passo 2 — Subir o banco PostgreSQL via Docker
```bash
docker compose up -d
docker compose ps
```
Aguarde até que o contêiner `pulseops-postgres` apresente status `healthy` (porta `5432:5432`).

### Passo 3 — Configurar a connection string na API via .NET User Secrets
Conforme a governança da W1, a connection string local não é salva no `appsettings.json` nem versionada no Git:
```bash
dotnet user-secrets set "ConnectionStrings:PulseOps" "Host=127.0.0.1;Port=5432;Database=pulseops;Username=pulseops;Password=pulseops" --project src/backend/PulseOps.Api
```

### Passo 4 — Restaurar ferramentas locais do .NET (dotnet-ef)
O projeto possui manifesto de ferramentas locais em `dotnet-tools.json` (instalado na W1):
```bash
dotnet tool restore
```
Isso garante a disponibilidade do comando `dotnet tool run dotnet-ef`.

### Passo 5 — Aplicar migrations do EF Core no banco PostgreSQL
```bash
dotnet tool run dotnet-ef database update \
  --project src/backend/PulseOps.Infrastructure \
  --startup-project src/backend/PulseOps.Api
```
Verifique a saída indicando que as tabelas de monitores foram criadas no PostgreSQL.

### Passo 6 — Iniciar a API ASP.NET Core
```bash
ASPNETCORE_ENVIRONMENT=Development dotnet run \
  --project src/backend/PulseOps.Api \
  --urls http://127.0.0.1:5000
```
Confirme que a API está ativa em outro terminal:
```bash
curl -s http://127.0.0.1:5000/health
```
Resposta esperada: `{"status":"ok","service":"PulseOps.Api",...}`.

### Passo 7 — Criar um monitor de teste via API
```bash
curl -X POST http://127.0.0.1:5000/api/monitors \
  -H "Content-Type: application/json" \
  -d '{"name": "API Exemplo", "url": "https://httpbin.org/status/200", "intervalSeconds": 60}'
```
Resposta esperada: HTTP 201 Created com JSON contendo o `id` gerado.

### Passo 8 — Iniciar o frontend Angular com proxy
Em um novo terminal:
```bash
cd src/frontend/pulseops-web
npm start
```
O servidor Angular iniciará em `http://localhost:4200` com o arquivo `proxy.conf.json` configurado, encaminhando `/api` diretamente para `http://127.0.0.1:5000`.

### Passo 9 — Validações visuais no navegador
Abra `http://localhost:4200` no navegador:
1. **Estado Success:** O monitor "API Exemplo" será exibido no grid responsivo com crachá **Habilitado** (verde), URL e intervalo `60s`.
2. **Override dinâmico em runtime (R2-01):**
   - Abra as Ferramentas de Desenvolvedor (F12) e vá para a aba **Console**.
   - Defina um alvo alternativo em tempo de execução:
     ```javascript
     window.__PULSEOPS_API_URL__ = 'http://127.0.0.1:5001';
     ```
   - Sem recarregar a página, clique no botão **"Atualizar"** no cabeçalho da interface.
   - Na aba **Network**, observe que a requisição é disparada imediatamente para `http://127.0.0.1:5001/api/monitors`.
   - Para retornar ao proxy padrão, execute no console:
     ```javascript
     delete window.__PULSEOPS_API_URL__;
     ```
   - Clique novamente em **"Atualizar"**; a requisição voltará a ser enviada para `/api/monitors` através do proxy local.
3. **Estado Error e Retry:**
   - Interrompa a API no terminal correspondente (Ctrl+C).
   - Clique no botão **"Atualizar"** na interface web.
   - A tela exibirá o estado de erro amigável com mensagem descritiva e o botão **"Tentar novamente"**.
   - Reinicie a API (`dotnet run`) e clique em **"Tentar novamente"**; a listagem se restabelecerá com sucesso.

---

## 9. Recomendação técnica

**APROVADO_TECNICAMENTE** — Todos os apontamentos da auditoria independente CH-AUD-W2-R2 (R2-01, R2-02 e R2-03) foram sanados com precisão, com testes automatizados dedicados e guia reproduzível. O Draft PR #6 está pronto para nova auditoria independente do ChatGPT.

---

## 10. Decisão necessária do PO

**PENDENTE** — Aguardando nova auditoria independente do ChatGPT e subsequente decisão explícita de homologação e merge pelo Product Owner (Hallan). Proibido merge automático.
