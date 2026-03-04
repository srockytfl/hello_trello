# US-6 — Trocar Cor para Verde — Fullstack Done

## Resumo

Implementação da mudança do esquema de cores da interface para verde, conforme critérios de aceitação da US-6.

---

## Endpoints

Nenhum endpoint novo ou modificado — a API não foi alterada (conforme critério da US-6).

---

## Arquivos Modificados

### Frontend

| Arquivo | Alteração |
|---------|-----------|
| `frontend/src/styles.scss` | Atualização das variáveis CSS globais para paleta verde |

---

## Detalhes das Mudanças de Cores

### `styles.scss` — Variáveis CSS (`:root`)

| Variável | Antes | Depois | Descrição |
|----------|-------|--------|-----------|
| `--blue` | `#FFD700` (amarelo/dourado) | `#22c55e` | Cor primária / botões principais |
| `--blue-dark` | `#E6C200` (dourado escuro) | `#16a34a` | Cor primária escura (hover de botões) |
| `--blue-darker` | `#D4AF37` (dourado mais escuro) | `#15803d` | Cor primária mais escura (active) |
| `--blue-glow` | `rgba(255, 215, 0, 0.3)` | `rgba(34, 197, 94, 0.3)` | Glow/brilho de elementos primários |
| `--shadow-blue` | `rgba(255, 215, 0, 0.22)` | `rgba(34, 197, 94, 0.22)` | Sombra de foco/destaque |
| `::selection` bg | `rgba(255, 215, 0, 0.3)` | `rgba(34, 197, 94, 0.3)` | Cor de seleção de texto |

---

## Critérios de Aceitação Atendidos

1. ✅ Variável `--blue` exibe verde (`#22c55e`) — não mais amarelo/dourado
2. ✅ Variável `--blue-dark` exibe verde escuro (`#16a34a`) — hover/active de botões
3. ✅ Variável `--blue-darker` exibe verde mais escuro (`#15803d`)
4. ✅ Botões na página de login exibem cor verde (usam `var(--blue)`)
5. ✅ Botões e elementos de ação na página de todos exibem cor verde
6. ✅ Nenhum elemento exibe amarelo/dourado como cor primária
7. ✅ Contraste texto/fundo mantido (`--text-bright: #dce8ff` sobre fundos escuros)
8. ✅ Interface responsiva com nova paleta (mudança apenas em variáveis CSS globais)
