# US-6 — Trocar Cor para Verde — Fullstack Done

## Resumo

Implementação da mudança do esquema de cores da interface de rosa/pink para verde, conforme critérios de aceitação da US-6. Mudança puramente visual — nenhuma alteração de backend ou API.

---

## Endpoints

Nenhum endpoint novo ou modificado — a API não foi alterada (conforme critério da US-6).

---

## Arquivos Modificados

### Frontend

| Arquivo | Alteração |
|---------|-----------|
| `frontend/src/styles.scss` | Atualização das variáveis CSS globais de rosa para verde |
| `frontend/src/app/shared/colors.ts` | Renomeação e atualização das constantes TypeScript de PRIMARY_BLUE/PINK para PRIMARY_GREEN |
| `frontend/src/app/components/sidebar/sidebar.component.ts` | Substituição de `rgba(255, 105, 180, ...)` por `rgba(34, 197, 94, ...)` |
| `frontend/src/app/components/user-avatar/user-avatar.component.ts` | Substituição de `rgba(255, 105, 180, ...)` por `rgba(34, 197, 94, ...)` |
| `frontend/src/app/pages/profile/profile.component.ts` | Substituição de `rgba(255, 105, 180, ...)` por `rgba(34, 197, 94, ...)` |
| `frontend/src/app/pages/todos/todos.component.ts` | Substituição de `rgba(255, 105, 180, ...)` por `rgba(34, 197, 94, ...)` |
| `frontend/src/app/pages/login/login.component.ts` | Substituição de `rgba(255, 105, 180, ...)` por `rgba(34, 197, 94, ...)` |

---

## Detalhes das Mudanças de Cores

### `styles.scss` — Variáveis CSS (`:root`)

| Variável | Antes (rosa) | Depois (verde) | Descrição |
|----------|--------------|----------------|-----------|
| `--blue` | `#FF69B4` | `#22c55e` | Cor primária / botões principais |
| `--blue-dark` | `#e05599` | `#16a34a` | Cor primária escura (hover de botões) |
| `--blue-darker` | `#c03d7d` | `#15803d` | Cor primária mais escura (active) |
| `--blue-glow` | `rgba(255, 105, 180, 0.3)` | `rgba(34, 197, 94, 0.3)` | Glow/brilho de elementos primários |
| `--shadow-blue` | `rgba(255, 105, 180, 0.22)` | `rgba(34, 197, 94, 0.22)` | Sombra de foco/destaque |
| `::selection` bg | `rgba(255, 105, 180, 0.3)` | `rgba(34, 197, 94, 0.3)` | Cor de seleção de texto |

### `colors.ts` — Constantes TypeScript

| Chave anterior | Nova chave | Novo valor |
|----------------|------------|------------|
| `PRIMARY_BLUE` (`#FF69B4`) | `PRIMARY_GREEN` | `#22c55e` |
| `PRIMARY_BLUE_HOVER` (`#e05599`) | `PRIMARY_GREEN_HOVER` | `#16a34a` |
| `PRIMARY_BLUE_DARK` (`#c03d7d`) | `PRIMARY_GREEN_DARK` | `#15803d` |

---

## Critérios de Aceitação Atendidos

1. ✅ Variável `--blue` exibe verde (`#22c55e`) — não mais rosa
2. ✅ Variável `--blue-dark` exibe verde escuro (`#16a34a`) — hover/active de botões
3. ✅ Variável `--blue-darker` exibe verde mais escuro (`#15803d`)
4. ✅ `colors.ts` reflete paleta verde sem referências a rosa/pink
5. ✅ Botões na página de login exibem cor verde (usam `var(--blue)`)
6. ✅ Botões e elementos de ação na página de todos exibem cor verde
7. ✅ Nenhum elemento exibe rosa/pink como cor primária (todos os `rgba(255, 105, 180, ...)` substituídos)
8. ✅ Contraste texto/fundo mantido (`--text-bright: #dce8ff` sobre fundos escuros — WCAG AA)
9. ✅ Interface responsiva com nova paleta (mudança apenas em variáveis CSS globais e inline styles)
