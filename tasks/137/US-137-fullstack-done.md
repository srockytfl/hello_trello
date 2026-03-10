# US-137 — Fullstack Done

## Resumo

Redesenho completo dos cards (cartoes) do quadro Kanban, implementando um novo design moderno e visualmente refinado para a tela principal da aplicacao FusionRun. Escopo exclusivamente frontend — nenhuma alteracao no backend foi necessaria.

## Arquivos Modificados

### `frontend/src/pages/Todos.tsx`
- Refatorado componente `Todos` com novo visual do quadro Kanban
- Extraido subcomponente `KanbanCard` para isolar logica e visual de cada cartao
- Adicionado estado `dragOverCol` para feedback visual durante drag-and-drop
- Adicionado handler `handleDragEnd` para limpar estado ao soltar fora
- Adicionado `onDragLeave` na coluna para remover highlight ao sair
- Header aprimorado com barra de progresso percentual, initiais do usuario no avatar
- Cards com tag de status colorida, barra de acento superior e footer com acoes
- Estado vazio nas colunas com icone SVG e mensagem descritiva
- Acessibilidade: `role`, `aria-label`, `tabIndex`, `aria-valuenow` em progressbar, keyboard `Delete`

### `frontend/src/pages/board.scss`
- Reescrito completamente com novo design system
- Paleta clara: background do board `#F5F7FA`, cards brancos com sombra suave
- Header com gradiente rosa (`#E91E63 -> #C2185B -> #880E4F`) e sombra
- Colunas com fundo `#ECEEF2`, borda colorida inset no drag-over
- Divisor colorido por coluna abaixo do titulo (3px de altura)
- `.kanban-card`: borda de acento superior colorida (4px), sombra dupla, hover elevacao -2px
- `.kanban-card--dragging`: opacidade reduzida + escala 0.97 para feedback visual
- `.kanban-card--done`: opacidade 0.7 + titulo riscado em cinza
- `.kanban-card__tag`: chip colorido uppercase com background e cor da coluna
- `.kanban-card__footer`: linha divisoria sutil, dots circulares para mover, drag-hint e delete
- Estado vazio `.column-empty` com borda tracejada e icone SVG
- Formulario `.card-new` com borda rosa destacada e sombra focus ring
- Responsivo: 400px, 520px, 600px, 767px, 900px+

## Subcomponente KanbanCard

Props:
- `todo: Todo` — dados do cartao
- `col` — coluna atual (key, label, color, accentColor)
- `columns` — todas as colunas para botoes de mover
- `isDragging: boolean` — aplica classe `--dragging`
- `onDragStart / onDragEnd` — callbacks drag
- `onMove(id, status)` — mover entre colunas
- `onDelete(id)` — deletar cartao

Renderiza:
1. Barra de acento superior com cor da coluna
2. Tag de status (uppercase, fundo/cor da coluna)
3. Titulo do cartao (riscado se done)
4. Footer: dots de mover + drag-hint + botao deletar

## Funcionalidades Preservadas

- Drag-and-drop entre colunas
- Criacao de novos cartoes (formulario inline com Enter/Escape)
- Delecao de cartoes
- Movimentacao manual via botoes coloridos
- Barra de progresso no header
- Avatar com iniciais do usuario
- Logout

## Design Tokens Aplicados

| Token | Valor |
|-------|-------|
| Board background | `#F5F7FA` |
| Column background | `#ECEEF2` |
| Card background | `#FFFFFF` |
| Card border-radius | `12px` |
| Accent bar height | `4px` |
| "A Fazer" color | `#E91E63` (rosa) |
| "Em Andamento" color | `#FF6B00` (laranja) |
| "Concluido" color | `#00C48C` (verde) |
| Header gradient | `#E91E63 → #C2185B → #880E4F` |
| Card shadow | `0 1px 2px rgba(0,0,0,.06), 0 2px 6px rgba(0,0,0,.04)` |
| Card hover shadow | `0 4px 12px rgba(0,0,0,.1), 0 1px 4px rgba(0,0,0,.06)` |

## Nenhuma Alteracao no Backend

O redesenho e puramente frontend. A API permanece inalterada.
