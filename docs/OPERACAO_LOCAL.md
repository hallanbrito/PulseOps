# PulseOps — Operação local segura (.NET + PostgreSQL + Angular)

**Objetivo:** executar e homologar o PulseOps no notebook com segurança, especialmente ao manter clones/worktrees paralelos (`PulseOps` e `PulseOps-W2-Teste`) que podem apontar para o mesmo banco persistente. Este documento **não é um guia de produção**.

**Referências:** [RUC-W2](CH/RUC-W2.md) · [PR #6](https://github.com/hallanbrito/PulseOps/pull/6) · [Status](STATUS.md).

## 1. Descobrir o PostgreSQL já existente

Execute na raiz da worktree de teste:

```bash
cd ~/PulseOps-W2-Teste || exit
docker compose ls
docker ps -a --filter name=pulseops-postgres \
  --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
docker inspect pulseops-postgres \
  --format '{{ index .Config.Labels "com.docker.compose.project" }}'
docker inspect pulseops-postgres \
  --format '{{ range .Mounts }}{{ .Name }} -> {{ .Destination }}{{ println }}{{ end }}'
```

Durante a homologação de 31/10/2026, o container `pulseops-postgres` encontrava-se `healthy`, vinculado ao projeto Compose **`pulseops`** e ao volume **`pulseops_pulseops_postgres_data`**. Havia também o volume `pulseops-w2-teste_pulseops_postgres_data`, **não utilizado por aquele container**.

**Regra de decisão:**
- **Instância existente:** reutilize-a; configure a API para a credencial efetivamente válida desse banco. Não altere volumes ou container a partir de outra worktree.
- **Banco realmente novo, sem conflito de container/porta:** use um `.env` local criado de `.env.example` e inicie o projeto Compose responsável. Primeiro avalie a colisão do nome fixo `pulseops-postgres` e da porta `5432`. Execute `docker compose up -d` **somente após confirmar que não afetará outro ambiente**.

**Nunca use como correção de autenticação:** `docker compose down -v`, `docker volume rm`, `docker system prune --volumes`, recriação de banco ou alteração não planejada da senha. Trocar `POSTGRES_PASSWORD` num `.env` **não redefine** a senha já armazenada em volume inicializado. Não execute `docker compose up/down` indiscriminadamente na worktree W2 quando o container pertence ao projeto `pulseops`.

## 2. Diagnosticar disponibilidade e autenticação

```bash
docker exec pulseops-postgres pg_isready -U pulseops -d pulseops
```

**Atenção:** `pg_isready` testa se o PostgreSQL responde; **não** verifica uma credencial. Para validar a senha, utilize uma consulta autenticada **por TCP via 127.0.0.1:5432**, como faz o Npgsql, com um cliente PostgreSQL local ou temporário. A autenticação local dentro do container pode usar regras distintas e, portanto, não comprova a conexão externa.

| Sintoma | Interpretação e próxima ação |
|---|---|
| `/health` responde 200, mas `/api/monitors` retorna 500 | Aplicação iniciou; investigar erro concreto de EF Core/Npgsql, não culpar Angular de imediato. |
| `No password has been provided` | A connection string efetiva não contém senha utilizável; verificar User Secrets/overrides. |
| Erro PostgreSQL `28P01` | Credencial enviada foi rejeitada; conferir instância/volume na porta e autenticação TCP. |
| `docker compose ps` vazio, mas `docker ps` mostra o banco | Provavelmente container controlado por outro **projeto Compose**. Conferir labels com `docker inspect`. |
| Angular recebe 502 após parar API | Proxy não consegue atingir o backend; corresponde ao smoke test de erro controlado. |

**Proteja os segredos:** não cole saídas brutas de `dotnet user-secrets list`, `.env`, `docker inspect .Config.Env` nem connection strings reais em PR, issue, chat ou logs públicos. Evite `set -x` durante diagnóstico de autenticação.

## 3. Configuração segura da API com User Secrets

O `.env` é lido pelo **Docker Compose**; a API .NET **não carrega esse arquivo automaticamente**. O ASP.NET Core lê a chave `ConnectionStrings:PulseOps` a partir de sua configuração de desenvolvimento (User Secrets). Se um banco já estiver inicializado, sua senha válida pode diferir do `.env` da worktree atual.

Depois de obter **com segurança** a credencial validada do banco em uso, registre-a pelo prompt oculto a seguir, sem exibir o valor nem colocá-lo como argumento literal do processo:

```bash
cd ~/PulseOps-W2-Teste || exit

python3 - <<'PY'
import getpass
import json
import subprocess

password = getpass.getpass("Senha do PostgreSQL local: ")
if not password:
    raise SystemExit("ERRO: senha vazia; configuracao preservada.")

# Escapa aspas para formato de connection string Npgsql.
quoted = '"' + password.replace('"', '""') + '"'
connection = (
    "Host=127.0.0.1;Port=5432;"
    "Database=pulseops;Username=pulseops;"
    f"Password={quoted}"
)
result = subprocess.run(
    ["dotnet", "user-secrets", "set",
     "--project", "src/backend/PulseOps.Api"],
    input=json.dumps({"ConnectionStrings:PulseOps": connection}),
    text=True, capture_output=True
)
if result.returncode:
    raise SystemExit("ERRO ao salvar User Secrets (sem expor a senha).")
print("OK: User Secrets local atualizado.")
PY
```

Este método envia JSON por **stdin** ao `dotnet user-secrets set`. User Secrets é apropriado para desenvolvimento e **não é um armazenamento seguro de produção**. Garanta que somente usuários confiáveis tenham acesso ao notebook/Docker. Não registre senhas em `appsettings.json` nem versione `.env`.

**Reinicie a API após atualizar o User Secrets.** Um processo .NET já iniciado pode continuar usando configuração anterior.

## 4. Verificar a integração real

API (terminal 1, na raiz):

```bash
ASPNETCORE_ENVIRONMENT=Development dotnet run \
  --project src/backend/PulseOps.Api \
  --urls http://127.0.0.1:5000
```

Consultas (terminal 2):

```bash
curl -i --max-time 10 http://127.0.0.1:5000/health
curl -i --max-time 15 http://127.0.0.1:5000/api/monitors
```

**Esperado:** ambos HTTP **200**. O endpoint `/health` não prova conexão com o banco; `/api/monitors` consulta dados pelo EF Core. Para ambiente **novo e identificado**, consulte o roteiro de migrations no [RUC-W2, `8](CH/RUC-W2.md); não execute migrations cegamente contra um volume desconhecido.

Frontend (terminal 3):

```bash
cd ~/PulseOps-W2-Teste/src/frontend/pulseops-web || exit
npm ci
npm start
```

Abra `http://localhost:4200`. O proxy Angular encaminha `/api` para `http://127.0.0.1:5000`. Para validar erro/retry, pare **somente a API**, clique em `Atualizar`, reinicie a API e clique em `Tentar novamente`. Não desligue o PostgreSQL para esse cenário.

## 5. Testes automatizados

Na raiz da worktree:

```bash
dotnet test PulseOps.slnx
cd src/frontend/pulseops-web || exit
npm test -- --watch=false
npm run build
```

Na rodada humana de **31/10/2026** ([CH-AUD-W2-R7](https://github.com/hallanbrito/PulseOps/pull/6#issuecomment-6550717215)), o PO apresentou logs de **2/2 testes .NET**, **14/14 testes Angular** e **build Angular PASS**. Os testes .NET de infraestrutura usaram PostgreSQL efêmero via Testcontainers. Isso não equivale a atestar GitHub Actions no HEAD.

## 6. Segurança, rastreabilidade e limites

- **Exposição da porta:** na homologação, a publicação de `5432` estava ligada a `0.0.0.0` (todas as interfaces). Em tarefa de hardening posterior, avaliar `127.0.0.1:5432:5432` com análise de impacto e rollback antes de modificar/recriar o container.
- **Risco de worktrees:** nomes idênticos de container, senhas e volumes distintos não podem ser tratados como ambientes intercambiáveis.
- **Segredos:** nunca incluir valores reais de senha em repositório, relatório ou GitHub; `.env` e o User Secrets permanecem locais.
- **Portão PO:** W2 está tecnicamente aprovada no escopo demonstrado; [PR #6](https://github.com/hallanbrito/PulseOps/pull/6) permanece Draft, sem merge, deploy ou publicação automática.
