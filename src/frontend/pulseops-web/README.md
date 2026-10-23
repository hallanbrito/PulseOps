# PulseOps Web — Angular

A aplicação Angular será gerada nesta pasta durante a W0 com a CLI oficial:

```bash
npx @angular/cli@22 new pulseops-web \
  --directory src/frontend/pulseops-web \
  --routing \
  --style=scss \
  --standalone \
  --skip-git
```

## Estrutura funcional prevista
- dashboard
- monitors
- incidents
- core/api
- shared/ui

## Contrato inicial
- `GET /health`
- `GET /api/monitors`
- `POST /api/monitors`
