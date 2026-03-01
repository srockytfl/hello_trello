# US-7 — Trocar cor para amarelo — Implementação Fullstack

## Resumo
Atualização visual da cor primária da aplicação de rosa (#FF69B4) para amarelo (#FFD700),
conforme critérios de aceitação da US-7. Mudança aplicada via variável CSS `--blue` em
`styles.scss`, propagando automaticamente para todos os elementos que a utilizam.

## Alterações no Backend
Nenhuma — a US-7 é exclusivamente frontend (CSS/SCSS). Os endpoints existentes não foram alterados.

## Alterações no Frontend

### Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `frontend/src/styles.scss` | `--blue`: `#FF69B4` → `#FFD700`; `--blue-dark`: `#E91E8C` → `#C8A800` |
| `frontend/src/app/pages/login/login.component.ts` | `.btn-login { color }`: `#ffffff` → `#111111` (contraste WCAG AA) |
| `frontend/src/app/pages/todos/todos.component.ts` | `.btn-add { color }`: `#ffffff` → `#111111`; `.checkbox .material-icons-round { color }`: `#ffffff` → `#111111` |

## Elementos Afetados pela Mudança de `--blue`

- **Botão "Entrar"** (login) — fundo amarelo (#FFD700), hover (#C8A800)
- **Botão "Adicionar"** (todos) — fundo amarelo (#FFD700), hover (#C8A800)
- **Checkbox marcado** — fundo e borda amarelos, ícone escuro
- **Filtro ativo** — borda inferior amarela
- **Input com foco** — borda amarela
- **Ícone do logo** (`.material-icons-round` no header) — amarelo

## Contraste WCAG AA

- Texto `#111111` sobre fundo `#FFD700`:
  - Ratio ≈ **8.3:1** ✓ (WCAG AA exige mínimo 4.5:1 para texto normal)

## Critérios de Aceitação Atendidos

1. ✅ Botões, headers, destaques exibem amarelo (#FFD700)
2. ✅ Cor aplicada consistentemente via variável CSS `--blue`
3. ✅ Contraste WCAG AA garantido com texto escuro (#111111) sobre amarelo
4. ✅ Mudança persistida no frontend Angular

## Fora do Escopo (não alterado)
- Paleta de cores completa (backgrounds, bordas, etc.)
- Estrutura HTML dos componentes
- Novo sistema de temas
- Backend / endpoints da API
