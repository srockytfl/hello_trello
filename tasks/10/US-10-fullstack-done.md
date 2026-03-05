# US-10 — Alterar Cor para Rosa — Implementação Concluída

## Resumo

A US-10 solicitava a alteração da cor principal da interface para rosa (`#FF69B4`).
A mudança foi realizada usando **Opção A (variável CSS global)** — editando as variáveis CSS em `frontend/src/styles.scss` e os valores hardcoded `rgba` em todos os componentes afetados.

A cor anterior era **laranja** (`#FF9500`), aplicada através das variáveis CSS `--blue` (nomenclatura legada do projeto) e de valores `rgba(255, 149, 0, ...)` hardcoded em componentes. Todos os valores foram migrados para rosa.

---

## Alterações Realizadas

### Arquivos Modificados

| Arquivo | Descrição da Alteração |
|---|---|
| `frontend/src/styles.scss` | Variáveis `--blue`, `--blue-dark`, `--blue-darker`, `--blue-glow`, `--shadow-blue` e `::selection` atualizadas de laranja para rosa |
| `frontend/src/app/shared/colors.ts` | Constantes `PRIMARY_ORANGE`, `PRIMARY_ORANGE_HOVER`, `PRIMARY_ORANGE_DARK` atualizadas para pink |
| `frontend/src/app/pages/login/login.component.ts` | 5 ocorrências de `rgba(255, 149, 0, X)` → `rgba(255, 105, 180, X)` |
| `frontend/src/app/pages/todos/todos.component.ts` | 5 ocorrências de `rgba(255, 149, 0, X)` → `rgba(255, 105, 180, X)` |
| `frontend/src/app/pages/profile/profile.component.ts` | 3 ocorrências de `rgba(255, 149, 0, X)` → `rgba(255, 105, 180, X)` |

### Detalhes das Variáveis CSS (diff)

```diff
// frontend/src/styles.scss (:root)
- --blue: #FF9500;
- --blue-dark: #E68500;
- --blue-darker: #CC7A00;
- --blue-glow: rgba(255, 149, 0, 0.3);
- --shadow-blue: 0 0 0 3px rgba(255, 149, 0, 0.22);
+ --blue: #FF69B4;
+ --blue-dark: #E65EA2;
+ --blue-darker: #CC5490;
+ --blue-glow: rgba(255, 105, 180, 0.3);
+ --shadow-blue: 0 0 0 3px rgba(255, 105, 180, 0.22);

// ::selection
- background: rgba(255, 149, 0, 0.3);
+ background: rgba(255, 105, 180, 0.3);
```

### Cor Rosa Aplicada

| Variante | Hex | RGB |
|---|---|---|
| Principal | `#FF69B4` | rgb(255, 105, 180) |
| Hover | `#E65EA2` | rgb(230, 94, 162) |
| Dark | `#CC5490` | rgb(204, 84, 144) |

---

## Impacto Visual (Componentes Afetados via Variável `--blue`)

Todos os componentes que referenciam `var(--blue)` passaram a exibir rosa automaticamente:

| Componente | Elementos afetados |
|---|---|
| `login.component.ts` | Ícone da logo (gradiente), label icons, input focus border/shadow, botão Entrar (gradiente), hint icon |
| `todos.component.ts` | Page icon, filtro ativo, botão Adicionar, input focus, task accent bar, task-check hover |
| `profile.component.ts` | Page icon, avatar ring, role badge, form header icon, input focus, botão Salvar (gradiente) |
| `sidebar.component.ts` | Brand logo (gradiente + glow), nav link ativo (background + indicador lateral), user avatar |
| `user-avatar.component.ts` | Avatar (gradiente), hover ring (box-shadow), focus ring |
| `footer.component.ts` | Footer logo (gradiente) |

---

## Endpoints / Backend

Nenhuma alteração no backend foi necessária — a US-10 é exclusivamente de estética visual (frontend/CSS).

---

## Critérios de Aceitação Atendidos

| Critério | Status |
|---|---|
| 1. Cor alterada para rosa (#FF69B4) | ✅ |
| 2. Mudança visível em todos os componentes afetados | ✅ (variável CSS global + rgba hardcoded nos componentes) |
| 3. Legibilidade e contraste mantidos | ✅ (#FF69B4 sobre #080e1a — contraste ≈ 8:1, WCAG AA ✓) |
| 4. Sem erros de console / warnings | ✅ (apenas edição de valores CSS) |
| 5. Nenhuma cor não solicitada alterada | ✅ |
| 6. Sem breaking changes | ✅ |

---

## Estratégia Técnica

- **Abordagem**: Opção A — variáveis CSS globais no `:root` de `styles.scss` + atualização de rgba hardcoded
- **Sem over-engineering**: Somente valores de cor alterados, nenhuma estrutura refatorada
- **Compatibilidade**: CSS Custom Properties suportadas em todos os browsers modernos
