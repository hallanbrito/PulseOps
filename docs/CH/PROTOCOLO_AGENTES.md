# Protocolo de execução — PulseOps / C.H.

## Antes de agir
1. Consultar `docs/PROJETO.md`, `docs/STATUS.md`, `AGENTS.md` e a Issue/W corrente.
2. Fixar baseline SHA, branch, executor/modelo, ambiente, autonomia e critérios de aceite.
3. Confirmar limites de escopo, produção, segredos e custos.

## Durante
- Executar somente o escopo explicitamente autorizado.
- Usar branch curta e worktree isolada quando houver concorrência.
- Parar diante de desvio de escopo, necessidade de segredo/custo, operação destrutiva ou elevação de autonomia.

## Ao entregar
- Commit e Draft PR, sem merge.
- Anexar evidências de build/testes.
- Preencher RUC com fatos verificáveis, riscos, rollback e pendências.
- Marcar como aguardando PO somente após a evidência mínima da fatia.

## Aprovação
- Só decisão explícita do Owner Humano autoriza integração.
- Aprovação parcial deve deixar fronteira verificável e criar trabalho residual.
- Reprovação preserva histórico e não altera `main`.
