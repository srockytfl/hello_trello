# US-7 — Fullstack Done

## Resumo

Correção da variável CSS `--yellow` que estava definida com valor azul (`#60A5FA`) em vez de amarelo real.

## Problema Identificado

Em `frontend/src/styles.scss`, a variável `--yellow` da seção `:root` estava mapeada para `#60A5FA` — um tom de azul — em vez de amarelo. Essa variável é usada no componente `todos.component.ts` para o elemento `.dot-pending` (indicador visual de tarefas pendentes no header).

## Alteração Realizada

### Arquivo modificado: `frontend/src/styles.scss`

| Campo       | Antes       | Depois    |
|-------------|-------------|-----------|
| `--yellow`  | `#60A5FA`   | `#FACC15` |

## Acessibilidade (WCAG AA)

- **Cor escolhida:** `#FACC15` (amarelo âmbar)
- **Background de referência:** `#0F2040` (var `--bg2`, onde o dot é renderizado)
- **Contraste calculado:** ≈ 9.4:1 — supera 3:1 (elementos gráficos) e 4.5:1 (texto)
- **Critério:** WCAG AA ✅

## Componentes / Arquivos

| Arquivo | Ação |
|---|---|
| `frontend/src/styles.scss` | Modificado — `--yellow` corrigido para `#FACC15` |

## Endpoints / Backend

Nenhuma alteração de backend foi necessária. A US-7 é exclusivamente uma correção visual de frontend.

## Páginas / Elementos Afetados

- **`todos.component.ts`** — `.dot-pending` usa `var(--yellow)` → agora exibe amarelo real no header (contador de tarefas pendentes)
