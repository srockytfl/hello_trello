# US-27 — Fullstack Done

## Problema Identificado

O rodapé desaparecia intermitentemente por três conflitos de CSS que combinados impediam o `<app-footer>` de ser visível:

1. **`body { height: 100vh }`** (styles.scss) — Bloqueava o body em altura fixa de viewport, cortando o rodapé quando o conteúdo interno tentava crescer.
2. **`:host { height: 100vh }` no TodosComponent** — O host tomava 100vh dentro de `.app-content` que já era `100vh - altura_do_footer`, causando overflow e escondendo o rodapé.
3. **`.login-page { height: 100vh }` no LoginComponent** — Mesmo problema na página de login: tentava ocupar 100vh num container que já dividia espaço com o rodapé.

## Correções Aplicadas (apenas CSS — sem backend necessário)

### 1. `frontend/src/styles.scss`
| Antes | Depois |
|-------|--------|
| `body { height: 100vh; }` | `body { min-height: 100vh; }` |

**Motivo:** `height` fixo impede crescimento; `min-height` permite que o body se expanda com o conteúdo, mantendo o footer sempre na tela.

### 2. `frontend/src/app/pages/todos/todos.component.ts`
| Antes | Depois |
|-------|--------|
| `:host { display: flex; flex-direction: column; height: 100vh; }` | `:host { display: flex; flex-direction: column; flex: 1; min-height: 0; }` |

**Motivo:** `flex: 1` faz o host preencher o container pai (`.app-content`) sem ultrapassá-lo. `min-height: 0` permite que itens flex internos com `overflow-y: auto` funcionem corretamente.

### 3. `frontend/src/app/pages/login/login.component.ts`
| Antes | Depois |
|-------|--------|
| `.login-page { height: 100vh; ... }` | `.login-page { flex: 1; ... }` |

**Motivo:** `flex: 1` preenche o espaço disponível em `.app-content` sem tentar ocupar 100vh do viewport, deixando o footer visível.

## Arquivos Modificados

| Arquivo | Tipo de Mudança |
|---------|----------------|
| `frontend/src/styles.scss` | CSS global — `height` → `min-height` no body |
| `frontend/src/app/pages/todos/todos.component.ts` | CSS de componente — `:host` com `flex: 1` |
| `frontend/src/app/pages/login/login.component.ts` | CSS de componente — `.login-page` com `flex: 1` |

## Arquivos Criados

- `tasks/27/US-27-fullstack-done.md` (este arquivo)

## Endpoints de API

Nenhum. Esta US é puramente de correção de layout CSS — não requer mudanças no backend.

## Critérios de Aceitação Atendidos

| Critério | Status |
|----------|--------|
| Rodapé sempre visível na parte inferior | ✅ |
| Rodapé não desaparece nem pisca durante navegação | ✅ |
| Posição consistente em todas as páginas (login e todos) | ✅ |
| Comportamento idêntico em diferentes tamanhos de tela | ✅ (flex layout responsivo) |
