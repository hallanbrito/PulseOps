# RUC/1.0 — PulseOps — Fatia W2 (Tentativa 5 + adendo de homologação CH-AUD-W2-R7)

> Relatório Universal C.H. em conformidade com o protocolo CHDevFlow. Registra as evidências verificáveis da implementação técnica e das rodadas de correção da auditoria da Fatia W2. Não constitui homologação de PO nem autorização de merge.

**Cabeçalho:**
- **Missão / Issue:** [#5](https://github.com/hallanbrito/PulseOps/issues/5) — W2: Tela Angular de monitores integrada à API (CH-2)
- **Draft PR:** [#6](https://github.com/hallanbrito/PulseOps/pull/6) — W2: Tela Angular de monitores integrada à API (CH-2)
- **Auditorias anteriores:**
  - R1: [CH-AUD-W2](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6523536845)
  - R2: [CH-AUD-W2-R2](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6524817410)
  - R3: [CH-AUD-W2-R3](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6525271491)
- **Auditoria R4 de referência:** [CH-AUD-W2-R4](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6525488615)
- **Executor declarado:** AGY / Antigravity (Gemini 3.8 Flash)
- **Coordenação e auditoria documental:** ChatGPT
- **Product Owner (PO):** Hallan de Sousa Brito
- **Nível CH autorizado:** CH-2 restrito à branch isolada
- **Ambiente de execução:** Linux (CachyOS x86_64); .NET SDK 10.0.113; Node.js v24.22.1; npm 12.2.1; Angular 22.2.4; Vitest 5.0.5
- **Fonte de verdade:** LIVE_GITHUB (Issue #5, PR #6, origin/main) + LOCAL_REPO
- **Timestamp:** 2026-10-30T14:46:00Z
- **Baseline SHA:** `701ecd175b157987e077b2a4ad419fd405acceff`
- **Branch de trabalho:** `agy/w2-angular-monitores`
- **Resultado técnico:** APROVADO_TECNICAMENTE (Draft PR pronto para revisão final do ChatGPT)

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

Implementação da tela Angular de monitores integrada à API REST de leitura do PulseOps (`GET /api/monitors`), com atendimento integral ao apontamento da auditoria independente **CH-AUD-W2-R4**:
1. **R4-01 (Convenção e ciclo de restauração/execução do `dotnet-ef`):** O manifesto local de ferramentas do .NET foi movido da raiz (`dotnet-tools.json`) para a localização padrão convencional da Microsoft em `.config/dotnet-tools.json`. Com isso, a descoberta hierárquica automática de ferramentas locais passa a operar nativamente em todo o repositório, garantindo que `dotnet tool restore` restaure o `dotnet-ef 10.0.14` sem sinalizadores e que `dotnet tool run dotnet-ef database update ...` localize e execute a ferramenta de forma 100% reproduzível a partir de qualquer diretório da solução. O ciclo foi validado com `dotnet tool run dotnet-ef migrations list` (retornando a migration `20261028192020_InitialCreate` com sucesso).

O código Angular, os 14 testes unitários Vitest e os 2 testes xUnit backend (já aceitos tecnicamente nas rodadas anteriores) foram preservados intactos. Custo adicional R$ 0,00. Nenhum merge, deploy ou escrita direta na branch `main`.

---

## 3. Consultas e atividades realizadas

| ID | Ação | Escopo / Resultado |
|---|---|---|
| A01 | Inspeção da auditoria CH-AUD-W2-R4 | Mapeado o apontamento R4-01 relativo à convenção de manifesto de ferramentas locais do .NET (`.config/dotnet-tools.json`) para garantir a descoberta automática por `dotnet tool run`. |
| A02 | Adoção do caminho convencional `.config/dotnet-tools.json` | Movido `dotnet-tools.json` para `.config/dotnet-tools.json` via `git mv`. |
| A03 | Validação do ciclo `restore` e `run` local | Executado `dotnet tool restore` na raiz com sucesso e `dotnet tool run dotnet-ef --version` na raiz e em `src/backend/`, confirmando resolução automática de `10.0.14`. |
| A04 | Validação de comando EF Core sobre a solution | Executado `dotnet tool run dotnet-ef migrations list --project src/backend/PulseOps.Infrastructure --startup-project src/backend/PulseOps.Api`, confirmando leitura da migration `20261028192020_InitialCreate`. |
| A05 | Atualização do RUC e do roteiro de smoke test | Procedimento do §8 atualizado com comandos canônicos sem parâmetros proprietários, refletindo a estrutura convencional de ferramentas .NET. |
| A06 | Preservação de conformidade | Confirmada a aprovação de todos os testes frontend (14 Vitest) e backend (2 xUnit) e build de produção. |

---

## 4. Evidências verificáveis

| ID | Classe | Fonte / Referência | Fato observado e limite |
|---|---|---|---|
| E01 | OBSERVADO | `git rev-parse origin/main` | Baseline confirmada em `701ecd175b157987e077b2a4ad419fd405acceff`. |
| E02 | DECLARADO PELO AGY | Execução local CachyOS (`dotnet test PulseOps.slnx`) | 2 testes xUnit aprovados (`PulseOps.Domain.Tests` e `PulseOps.Infrastructure.Tests` com Testcontainers). |
| E03 | DECLARADO PELO AGY | Execução local CachyOS (`npm ci`) | Instalação concluída com sucesso em 8s. Mantida ressalva aceita da W0/W1 (2 vulnerabilidades em devDependencies e 4 install scripts bloqueados; nenhum `--force`). |
| E04 | DECLARADO PELO AGY | Execução local CachyOS (`npm test -- --watch=false`) | 3 arquivos de teste, 14 testes executados e aprovados (100% PASS) em 5.8s via Vitest. |
| E05 | DECLARADO PELO AGY | Execução local CachyOS (`npm run build`) | Build de produção gerado com sucesso em 4.5s; total inicial de 249.44 kB (69.11 kB transfer). 0 warnings de orçamento. |
| E06 | DECLARADO PELO AGY | Execução local CachyOS (`dotnet tool restore && dotnet tool run dotnet-ef migrations list ...`) | Ciclo de restauração e execução local validado com sucesso usando `.config/dotnet-tools.json`, reportando migration `20261028192020_InitialCreate`. |
| E07 | DECLARADO PELO AGY | Execução local CachyOS (`npx prettier --check` / `git diff --check`) | Todos os arquivos formatados e higienizados sem erros. |
| E08 | OBSERVADO | `gh pr checks 6` | `no checks reported`: O repositório PulseOps **NÃO possui CI remota (GitHub Actions)** configurada nesta branch. Testes foram executados estritamente no ambiente local do agente. |
| E09 | OBSERVADO | `git ls-files .config/dotnet-tools.json` | Manifesto convencional versionado em `.config/dotnet-tools.json`. |
| E10 | DECLARADO | Protocolo de execução | Custo financeiro adicional R$ 0,00; nenhuma chamada a serviços externos pagos. |
| E11 | OBSERVADO | Código-fonte | Nenhuma credencial, segredo ou token real versionado. |
| E12 | OBSERVADO | `git status` | Execução restrita à branch isolada `agy/w2-angular-monitores`. Árvore de trabalho íntegra. |

---

## 5. Verificações e resultados

| Teste | Critério de Aceite / Auditoria | Resultado | Evidência |
|---|---|---|---|
| T01 | Frontend não exibe scaffold Angular | PASSOU | `app.html` e `app.spec.ts` substituídos por layout shell e marca PulseOps. |
| T02 | Tela apresenta monitores reais da API | PASSOU | `MonitorList` consome `GET /api/monitors` e renderiza campos do modelo C#. |
| T03 | Estados explícitos (loading, empty, error, retry, success) | PASSOU | Implementados com signals e testados individualmente em `monitor-list.spec.ts`. |
| T04 | Semântica de estado (AUD-02) | PASSOU | Rótulo configurado como `Habilitado / Desabilitado`, sem sugerir disponibilidade de rede. |
| T05 | Configuração de API via proxy e override dinâmico (AUD-01 / R2-01) | PASSOU | `proxy.conf.json` (127.0.0.1:5000) + override avaliado dinamicamente a cada requisição. |
| T06 | Convenção e ciclo do `dotnet-ef` (R4-01) | PASSOU | Adotado `.config/dotnet-tools.json`; `dotnet tool restore` e `dotnet tool run dotnet-ef` 100% funcionais. |
| T07 | Coerência documental do smoke test (R3-01, R3-03) | PASSOU | Alinhados .env/secrets e `npm ci` prévio. |
| T08 | Testes automatizados do frontend | PASSOU | 14/14 testes unitários aprovados via Vitest (`npm test -- --watch=false`). |
| T09 | Regressão de testes do backend | PASSOU | 2/2 testes xUnit aprovados via `dotnet test`. |
| T10 | Build de produção do frontend | PASSOU | `npm run build` executado com 0 erros e 0 avisos. |
| T11 | Proteção de escopo e governança | PASSOU | R$ 0 de custo; sem deploy, merge ou alterações em backend. |

---

## 6. Riscos e bloqueios

1. **Ressalva de dependências npm:** As 2 vulnerabilidades transitivas em devDependencies e os 4 install scripts bloqueados são herdados do scaffold inicial (W0) e permanecem documentados como ressalva aceita pelo PO. Nenhum `--force` foi utilizado.
2. **Ausência de CI remota:** O repositório PulseOps não possui GitHub Actions configurado para executar testes automaticamente em Pull Requests. Todas as evidências de teste correspondem a execuções locais verificáveis no ambiente do executor.
3. **Ausência de Worker ativo:** O backend ainda não executa pings periódicos automáticos (escopo posterior). O status exibido na interface corresponde estritamente à habilitação administrativa do cadastro.

---

## 7. Alterações realizadas (Inventário completo do diff)

Total de arquivos impactados em relação a `origin/main`: **21 arquivos** (1 renomeado, 10 modificados, 10 novos).

- **Arquivo renomeado (1):**
  1. `dotnet-tools.json -> .config/dotnet-tools.json` — Manifesto de ferramentas locais do .NET movido para a convenção padrão da Microsoft.

- **Novos arquivos (10):**
  2. `docs/CH/RUC-W2.md` — Relatório Universal C.H. versão 1.0.
  3. `src/frontend/pulseops-web/proxy.conf.json` — Configuração de proxy de desenvolvimento para `/api` apontando para `http://127.0.0.1:5000`.
  4. `src/frontend/pulseops-web/src/app/models/monitor.model.ts` — Interface `ServiceMonitor`.
  5. `src/frontend/pulseops-web/src/app/config/api.config.ts` — Injection token `API_BASE_URL`.
  6. `src/frontend/pulseops-web/src/app/services/monitor.service.ts` — Serviço de consulta REST com avaliação dinâmica de base URL.
  7. `src/frontend/pulseops-web/src/app/services/monitor.service.spec.ts` — 6 testes unitários do serviço cobrindo proxy, DI e ciclo de vida dinâmico de override.
  8. `src/frontend/pulseops-web/src/app/components/monitor-list/monitor-list.ts` — Componente standalone `MonitorList`.
  9. `src/frontend/pulseops-web/src/app/components/monitor-list/monitor-list.html` — Template com 4 estados e crachás `Habilitado / Desabilitado`.
  10. `src/frontend/pulseops-web/src/app/components/monitor-list/monitor-list.scss` — Estilos responsivos com proteção contra overflow (`minmax(min(100%, 280px), 1fr)`).
  11. `src/frontend/pulseops-web/src/app/components/monitor-list/monitor-list.spec.ts` — 6 testes unitários do componente.

- **Arquivos modificados (10):**
  12. `src/frontend/pulseops-web/angular.json` — Adicionada configuração `"proxyConfig": "proxy.conf.json"` no serve de desenvolvimento.
  13. `src/frontend/pulseops-web/src/app/app.config.ts` — Adicionado provider `provideHttpClient()`.
  14. `src/frontend/pulseops-web/src/app/app.routes.ts` — Configurada rota padrão direcionando para `MonitorList`.
  15. `src/frontend/pulseops-web/src/app/app.ts` — Atualizado componente raiz.
  16. `src/frontend/pulseops-web/src/app/app.html` — Removido scaffold padrão e adicionado shell da aplicação.
  17. `src/frontend/pulseops-web/src/app/app.scss` — Estilos de layout e barra de navegação.
  18. `src/frontend/pulseops-web/src/app/app.spec.ts` — Testes atualizados para o shell da aplicação.
  19. `src/frontend/pulseops-web/src/app/main.ts` — Ajuste de formatação Prettier.
  20. `src/frontend/pulseops-web/src/styles.scss` — Variáveis de tema e reset global.
  21. `src/frontend/pulseops-web/src/index.html` — Título atualizado para `PulseOps — Monitoramento de Serviços`.

---

## 8. Procedimento de validação manual (Smoke Test com API e PostgreSQL reais em clone limpo)

> **Aviso de integridade:** Este procedimento foi escrito antes da validação humana. A sessão original do AGY não executou smoke test contra PostgreSQL persistente, mas **o PO o executou em 31/10/2026** (ver §11, CH-AUD-W2-R6/R7).
>
> **Ambientes já existentes:** antes de copiar o `.env`, iniciar containers ou aplicar migrations, consulte [Operação local](../OPERACAO_LOCAL.md). Este roteiro descreve **banco novo**; não execute `docker compose up/down` se outro projeto Compose já mantiver `pulseops-postgres` em execução.

### Pré-requisitos
- Docker e Docker Compose instalados e em execução.
- .NET SDK 10 instalado (`dotnet --version` >= 10.0.100).
- Node.js (v24+) e npm instalados.

### Passo 1 — Configurar variáveis de ambiente do PostgreSQL (R3-01)
O arquivo `compose.yaml` requer as variáveis `POSTGRES_DB`, `POSTGRES_USER` e `POSTGRES_PASSWORD` no arquivo `.env`.
Somente em um ambiente **novo**, e se não houver `.env`, copie o template:
```bash
cp -n .env.example .env
```
O `.env.example` versionado contém:
```env
POSTGRES_DB=pulseops
POSTGRES_USER=pulseops
POSTGRES_PASSWORD=change-me-local-only
```
Edite o arquivo `.env` para definir uma senha local segura para desenvolvimento (exemplo: altere `change-me-local-only` para `minha-senha-local`). **Nunca versione o `.env`.**

### Passo 2 — Verificar antes de iniciar um banco novo
```bash
docker compose ls
docker ps -a --filter name=pulseops-postgres --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
```
**Apenas se não existir instância compartilhada e o ambiente for realmente novo**, inicie:
```bash
docker compose up -d
docker compose ps
```
Se o container já existir em outra worktree, **não execute** `up`, `down`, `down -v` ou limpeza de volumes. Verifique o projeto e volume proprietário no [guia](../OPERACAO_LOCAL.md). Aguarde `healthy` para uma instância nova.

### Passo 3 — Configurar a API com .NET User Secrets (R3-01)
A conexão local pertence ao User Secrets de `PulseOps.Api`, nunca ao repositório. **Não presuma** que o `.env` da worktree W2 contenha a senha de um banco previamente inicializado. Cadastre a **credencial validada do container em uso** com o procedimento de entrada oculta em [Operação local](../OPERACAO_LOCAL.md#3-configuração-segura-da-api-com-user-secrets), sem colocar senha em histórico de shell ou GitHub. Reinicie a API após a configuração.

### Passo 4 — Restaurar ferramentas locais do .NET (dotnet-ef) (R4-01)
O repositório agora adota o caminho convencional da Microsoft `.config/dotnet-tools.json`, contendo `dotnet-ef` versão `10.0.14`.
Na raiz do repositório, execute:
```bash
dotnet tool restore
```
A restauração do `dotnet-ef` ocorrerá de forma nativa e automática a partir do manifesto local.

### Passo 5 — Aplicar migrations do EF Core no banco PostgreSQL (R4-01)
```bash
dotnet tool run dotnet-ef database update \
  --project src/backend/PulseOps.Infrastructure \
  --startup-project src/backend/PulseOps.Api
```
O comando `dotnet tool run dotnet-ef` localiza o manifesto convencional em `.config/dotnet-tools.json` e executa as migrations no PostgreSQL.

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

### Passo 8 — Instalar dependências e iniciar o frontend Angular com proxy (R3-03)
Em um clone limpo, a pasta `node_modules` não está presente. Em outro terminal, navegue até a pasta do frontend, instale as dependências com `npm ci` e inicie o dev server:
```bash
cd src/frontend/pulseops-web
npm ci
npm start
```
O comando `npm start` inicia o servidor Angular em `http://localhost:4200` aplicando o proxy de desenvolvimento configurado em `proxy.conf.json`, encaminhando requisições para `/api` diretamente para `http://127.0.0.1:5000`.

### Passo 9 — Validações visuais no navegador
Abra `http://localhost:4200` no navegador:
1. **Estado Success:** O monitor "API Exemplo" será exibido no grid responsivo com crachá **Habilitado** (verde), URL e intervalo `60s`.
2. **Override dinâmico em runtime (R2-01):**
   - Abra o Console do DevTools (F12).
   - Defina um alvo alternativo em tempo de execução:
     ```javascript
     window.__PULSEOPS_API_URL__ = 'http://127.0.0.1:5001';
     ```
   - Sem recarregar a página, clique no botão **"Atualizar"** no cabeçalho.
   - Na aba Network, observe que a requisição é disparada imediatamente para `http://127.0.0.1:5001/api/monitors`.
   - Para retornar ao proxy padrão, execute no console:
     ```javascript
     delete window.__PULSEOPS_API_URL__;
     ```
   - Clique novamente em **"Atualizar"**; a requisição voltará a ser enviada para `/api/monitors` através do proxy local.
3. **Estado Error e Retry:**
   - Interrompa a API no terminal correspondente (Ctrl+C).
   - Clique no botão **"Atualizar"** na interface web.
   - A tela exibirá o estado de erro com mensagem descritiva e o botão **"Tentar novamente"**.
   - Reinicie a API (`dotnet run`) e clique em **"Tentar novamente"**; a listagem se restabelecerá com sucesso.

---

## 9. Recomendação técnica

**APROVADO_TECNICAMENTE** para o escopo funcional da W2, considerando R4-01 e as evidências posteriores CH-AUD-W2-R6/R7 de execução real no notebook. O diagnóstico de ambiente está registrado em [Operação local](../OPERACAO_LOCAL.md). Uma melhoria de segurança para restringir a exposição da porta PostgreSQL 5432 ao localhost será avaliada separadamente. Não há comprovação de CI remoto nesta rodada, nem autorização de merge.

---

## 10. Decisão necessária do PO

**PENDENTE DE DECISÃO EXPLÍCITA DO PO** — Parecer técnico favorável no escopo testado. O PR #6 permanece **Draft**, sem merge na `main`, release ou publicação.

---

## 11. Homologação operacional independente — 31/10/2026

**Contexto:** execução manual pelo Product Owner no CachyOS, worktree `~/PulseOps-W2-Teste`, branch `agy/w2-angular-monitores`, baseline `fac14560e686202dbd8c1aba115a870618028425`. O ChatGPT avaliou as saídas HTTP, logs e capturas enviados; **não executou os comandos diretamente no computador do PO**.

Registros no GitHub: [CH-AUD-W2-R6](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6550699474) (smoke test) e [CH-AUD-W2-R7](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6550717215) (testes automatizados).

### 11.1. Evidências funcionais (R6)

| ID | Verificação | Resultado observado |
|---|---|---|
| H01 | `GET /health` e `GET /api/monitors` | Ambos HTTP **200**, com leitura real de dados persistidos no PostgreSQL. |
| H02 | Listagem Angular em `localhost:4200` | 2 monitores originais, dados coerentes com JSON da API. |
| H03 | Desligar API e atualizar Angular | Proxy HTTP **502**; erro controlado com **Tentar novamente**. |
| H04 | Reiniciar API e tentar novamente | Listagem recuperada. |
| H05 | `POST /api/monitors` | HTTP **201 Created**, ID `0e2c9a92-9f8d-4d58-b8d7-5a40379233c6`, nome `W2 Corujao Smoke Test`. |
| H06 | Nova listagem Angular | Contagem aumentou de 2 para **3** monitores. |
| H07 | Reinício da API + consulta por ID | HTTP **200** após restart, comprovando persistência do cadastro. |
| H08 | Firefox em **390 px** | Cartões empilhados, texto legível e sem overflow horizontal aparente. Não cobre todos os viewports nem auditoria completa de acessibilidade. |
| H09 | Override `window.__PULSEOPS_API_URL__` para porta 5001 | Requisição para rota alternativa e falha tratada; removido override, retry recuperou lista de 3 monitores sem reload. A mensagem de CORS da porta indisponível não demonstra bug de CORS. |

A etiqueta **Habilitado** corresponde a `enabled: true`; **não** significa que uma rotina real de verificação de disponibilidade esteja implementada.

### 11.2. Testes locais reproduzidos (R7)

| Comando | Resultado com logs enviados pelo PO |
|---|---|
| `dotnet test PulseOps.slnx` | **2/2 PASS**, zero falhas; infraestrutura via PostgreSQL efêmero com Testcontainers. |
| `npm test -- --watch=false` | **14/14 PASS** em 3 arquivos (6 serviço, 2 app, 6 componente). |
| `npm run build` | **PASS**, pacote inicial 249,44 kB (transferência estimada 69,11 kB). |

A reprodução foi **local e humana**, não constitui comprovação automática de GitHub Actions/CI remoto no HEAD.

### 11.3. Incidente de credenciais entre worktrees

- **Sintomas:** a API funcionava em `/health`, mas `/api/monitors` retornava HTTP 500; inicialmente sem senha Npgsql, depois PostgreSQL `28P01` (senha rejeitada).
- **Diagnóstico confirmado:** o `.env` de `PulseOps-W2-Teste` continha senha diferente da senha efetivamente aceita pelo container `pulseops-postgres` do projeto Docker Compose `pulseops`, com volume `pulseops_pulseops_postgres_data`. Autenticação TCP na porta 5432 aceitou a credencial do container original e rejeitou a do `.env` da W2.
- **Correção:** atualizado **apenas o .NET User Secrets local** da API, usando a senha já validada; após reinício, a consulta passou a HTTP **200**. Nenhum dado apagado, volume removido, senha de banco redefinida ou segredo versionado.
- **Prevenção:** [Operação local](../OPERACAO_LOCAL.md), incluindo identificação do container/volume real, separação do `.env` do Compose e User Secrets do .NET, e cautela com comandos que recriam serviços.
- **Segurança futura:** revisar publicação da porta `5432` em todas as interfaces e considerar binding em `127.0.0.1` em uma tarefa própria, sem afetar esta homologação.

### 11.4. Parecer e portão PO

**APROVADO_TECNICAMENTE** no escopo funcional e de testes locais apresentados. **Não equivale a merge, deploy, conclusão de auditoria completa de segurança/acessibilidade nem comprovação de CI remota.** O [PR #6](https://github.com/hallanbrito/PulseOps/pull/6) continua Draft até decisão explícita do PO. Ver [STATUS](../STATUS.md).
