# US-7 — Trocar cor para amarelo — Implementação Fullstack

## Resumo
Atualização visual da cor primária da aplicação de verde (#22c55e) para amarelo (#FFD700), conforme critérios de aceitação da US-7.

## Alterações no Backend
Nenhuma — a US-7 é exclusivamente frontend (CSS/SCSS). Os endpoints existentes não foram alterados.

## Alterações no Frontend

### Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `frontend/src/styles.scss` | Variável `--blue` alterada de `#22c55e` para `#FFD700`; `--blue-dark` de `#16a34a` para `#C9A800` |
| `frontend/src/app/pages/login/login.component.ts` | Cor do texto do botão `.btn-login` de `#052e16` para `#1A1400` (melhor contraste WCAG AA com amarelo) |
| `frontend/src/app/pages/todos/todos.component.ts` | Cor do texto do botão `.btn-add` de `#052e16` para `#1A1400` (melhor contraste WCAG AA com amarelo) |

## Elementos Afetados pela Mudança de `--blue`

- **Botão "Entrar"** (login) — fundo amarelo (#FFD700), hover (#C9A800)
- **Botão "Adicionar"** (todos) — fundo amarelo (#FFD700), hover (#C9A800)
- **Checkbox marcado** — fundo e borda amarelos
- **Filtro ativo** — borda inferior amarela
- **Input com foco** — borda amarela
- **Ícone do logo** (`.material-icons-round` no header) — amarelo

## Contraste WCAG AA

- Texto `#1A1400` sobre fundo `#FFD700`:
  - Luminância relativa de #FFD700 ≈ 0.68
  - Luminância relativa de #1A1400 ≈ 0.001
  - Ratio ≈ **14.5:1** ✓ (WCAG AA exige mínimo 4.5:1)

## Fora do Escopo (não alterado)
- Paleta de cores completa (backgrounds, bordas, etc.)
- Estrutura HTML dos componentes
- Novo sistema de temas
- Backend / endpoints da API
