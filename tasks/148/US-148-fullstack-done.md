# US-148 — Fix Footer — Fullstack Done

## Resumo

História de usuário para tornar o footer fixo no rodapé da tela e atualizar a mensagem com "powered by Fusion AI".

## Critérios Atendidos

1. ✅ Footer fixo na parte inferior da tela (independente do scroll)
2. ✅ Mensagem atualizada para incluir "powered by Fusion AI"
3. ✅ Footer responsivo (mantido, com media query para mobile)
4. ✅ Conteúdo da página não sobreposto pelo footer fixo

---

## Arquivos Modificados

### Frontend

| Arquivo | Alteração |
|---|---|
| `frontend/src/components/Footer/Footer.tsx` | Texto atualizado: `© 2026 hello_trello — powered by Fusion AI` |
| `frontend/src/components/Footer/Footer.module.scss` | Adicionado `position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;`; removido `flex-shrink: 0; margin-top: auto;` |
| `frontend/src/styles.scss` | Adicionado `--footer-height: 54px` em `:root`; adicionado `padding-bottom: var(--footer-height)` ao `body` para evitar sobreposição de conteúdo |
| `frontend/src/pages/board.scss` | `.board-page` height: `calc(100vh - var(--footer-height))`; `.board-column` max-height: `calc(100vh - 92px - var(--footer-height))` para garantir que o board kanban não fique oculto atrás do footer |

### Backend

Nenhuma alteração necessária — a issue é puramente de UI/CSS.

---

## Detalhes Técnicos

- **`position: fixed`** com `bottom: 0; left: 0; right: 0; z-index: 100` garante que o footer fique sempre visível no rodapé.
- **`--footer-height: 54px`** é uma variável CSS global usada para ajustar os layouts que dependem da altura do viewport (`100vh`), evitando que conteúdo fique escondido atrás do footer.
- **`body { padding-bottom: var(--footer-height) }`** garante que páginas com scroll (ex: login em mobile) tenham espaço reservado abaixo do último elemento.
- **Board Kanban** (`board.scss`): ajustado para `height: calc(100vh - var(--footer-height))` e `max-height` das colunas corrigido — o board usa `overflow: hidden` e altura fixa, portanto precisa de ajuste explícito.
