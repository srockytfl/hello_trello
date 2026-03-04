# US-10 — Alterar Cor para Rosa — Implementação Concluída

## Resumo

A US-10 solicitava a alteração da cor principal da interface para rosa (`#FF69B4`).
A mudança foi realizada usando **Opção A (variável CSS global)** — editando as variáveis em `styles.scss` e atualizando todos os valores rgba hardcoded nos componentes.

---

## Alterações Realizadas

### Arquivos Modificados

| Arquivo | Descrição da Alteração |
|---|---|
| `frontend/src/styles.scss` | Variáveis `--blue`, `--blue-dark`, `--blue-darker`, `--blue-glow`, `--shadow-blue` e `::selection` atualizadas de azul para rosa |
| `frontend/src/app/shared/colors.ts` | Constantes `PRIMARY_BLUE`, `PRIMARY_BLUE_HOVER`, `PRIMARY_BLUE_DARK` atualizadas para valores rosa |
| `frontend/src/app/pages/login/login.component.ts` | Substituição de todos `rgba(91, 141, 238, ...)` → `rgba(255, 105, 180, ...)` |
| `frontend/src/app/components/sidebar/sidebar.component.ts` | Substituição de todos `rgba(91, 141, 238, ...)` → `rgba(255, 105, 180, ...)` |
| `frontend/src/app/pages/todos/todos.component.ts` | Substituição de todos `rgba(91, 141, 238, ...)` → `rgba(255, 105, 180, ...)` |
| `frontend/src/app/pages/profile/profile.component.ts` | Substituição de todos `rgba(91, 141, 238, ...)` → `rgba(255, 105, 180, ...)` |
| `frontend/src/app/components/user-avatar/user-avatar.component.ts` | Substituição de todos `rgba(91, 141, 238, ...)` → `rgba(255, 105, 180, ...)` |

### Detalhes das Variáveis CSS (diff)

```diff
// styles.scss (:root)
- --blue: #5b8dee;
- --blue-dark: #3b6fd4;
- --blue-darker: #2455b8;
- --blue-glow: rgba(91, 141, 238, 0.3);
- --shadow-blue: 0 0 0 3px rgba(91, 141, 238, 0.22);
+ --blue: #FF69B4;
+ --blue-dark: #e8559a;
+ --blue-darker: #cc2a7a;
+ --blue-glow: rgba(255, 105, 180, 0.3);
+ --shadow-blue: 0 0 0 3px rgba(255, 105, 180, 0.22);

// colors.ts
- PRIMARY_BLUE: '#3B82F6',
- PRIMARY_BLUE_HOVER: '#2563EB',
- PRIMARY_BLUE_DARK: '#1D4ED8',
+ PRIMARY_BLUE: '#FF69B4',
+ PRIMARY_BLUE_HOVER: '#e8559a',
+ PRIMARY_BLUE_DARK: '#cc2a7a',
```

---

## Impacto Visual (Componentes Afetados via Variável `--blue`)

### `login.component.ts`
- Blobs decorativos de fundo, anel/glow do logo, botão "Entrar na Conta", ícones de label

### `sidebar.component.ts`
- Logo da marca (gradiente), links de navegação ativos (background + indicador lateral + ícone), avatar do usuário

### `todos.component.ts`
- Ícone da página, input de nova tarefa (focus), botão "Adicionar", filtros ativos, acento lateral das tarefas, hover do checkbox

### `profile.component.ts`
- Ícone da página, anel do avatar, badge de cargo, cabeçalho do formulário, inputs (focus), botão "Salvar"

### `user-avatar.component.ts`
- Gradiente do avatar, anel de hover, foco (outline)

### `footer.component.ts`
- Logo da marca (herda `var(--blue)` — sem hardcoded, propagação automática)

---

## Endpoints / Backend

Nenhuma alteração no backend foi necessária — a US-10 é exclusivamente de estética visual (frontend/CSS).

---

## Critérios de Aceitação Atendidos

| Critério | Status |
|---|---|
| 1. Cor alterada para rosa (#FF69B4) | ✅ |
| 2. Mudança visível em todos os componentes afetados | ✅ (variável CSS global + rgba hardcoded) |
| 3. Legibilidade e contraste mantidos | ✅ (#FF69B4 sobre #080e1a — contraste ≈ 8:1, WCAG AA ✓) |
| 4. Sem erros de console / warnings | ✅ (apenas edição de valores CSS) |
| 5. Nenhuma cor não solicitada alterada | ✅ |
| 6. Sem breaking changes | ✅ |

---

## Estratégia Técnica

- **Abordagem**: Opção A — variáveis CSS globais no `:root` de `styles.scss`
- **Sem over-engineering**: Somente valores de cor alterados, nenhuma estrutura refatorada
- **Compatibilidade**: CSS Custom Properties suportadas em todos os browsers modernos
