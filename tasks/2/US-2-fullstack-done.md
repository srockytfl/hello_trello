# US-2 — Fullstack Done

## Resumo

Alteração do título da aplicação de **"Teste 1"** para **"Hello Github"**, conforme história US-2.

## Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `server/index.js` | `appTitle` alterado de `'Teste 1'` para `'Hello Github'` |
| `frontend/src/index.html` | `<title>` alterado de `Teste 1` para `Hello Github` |
| `frontend/src/app/services/title.service.ts` | Signal inicial e fallback de erro alterados de `'Teste 1'` para `'Hello Github'` |

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/title` | Retorna `{ title: "Hello Github" }` |

## Páginas / Componentes

| Componente | Comportamento |
|------------|--------------|
| `LoginComponent` | Exibe `titleService.appTitle()` → "Hello Github" no `<h2>` |
| `TodosComponent` | Exibe `titleService.appTitle()` → "Hello Github" no header |

## Critérios de Aceitação Atendidos

1. ✅ Título HTML da página é exatamente `"Hello Github"` (`index.html`)
2. ✅ Título visível na aba do navegador (via `<title>` estático + valor retornado pela API)
3. ✅ Aplicado em todas as páginas (backend retorna o novo título; fallback também usa o novo valor)
