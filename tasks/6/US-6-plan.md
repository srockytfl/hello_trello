# Plan — US-6: Trocar cor para verde

## Escopo Técnico
Derivado da Spec:
- Backend necessário: **não** (mudança puramente visual/CSS)
- Frontend necessário: **sim** (alteração de variáveis CSS globais e constante TypeScript)

---

## Contratos de API
N/A — nenhuma alteração de API é necessária para esta US.

---

## Estrutura de Dados
N/A — nenhuma tabela ou modelo de dados é afetado.

---

## Análise do Estado Atual

### Variáveis CSS em `frontend/src/styles.scss` (`:root`)
| Variável      | Valor atual (rosa — US-10) | Novo valor (verde)  |
|---------------|----------------------------|---------------------|
| `--blue`      | `#FF69B4`                  | `#22c55e`           |
| `--blue-dark` | `#E05A9E`                  | `#16a34a`           |

> Os fundos dark-green (`--bg`, `--bg2`, `--bg3`, `--card`, `--hover`, `--border`) já estão em tons de verde escuro e **não precisam ser alterados**.

### Constante TypeScript em `frontend/src/app/shared/colors.ts`
| Chave atual         | Valor atual   | Nova chave           | Novo valor  |
|---------------------|---------------|----------------------|-------------|
| `PRIMARY_PINK`      | `#FF69B4`     | `PRIMARY_GREEN`      | `#22c55e`   |
| `PRIMARY_PINK_HOVER`| `#E05A9E`     | `PRIMARY_GREEN_HOVER`| `#16a34a`   |
| `PRIMARY_PINK_DARK` | `#C44D8A`     | `PRIMARY_GREEN_DARK` | `#15803d`   |

### Componentes que consomem `var(--blue)` / `var(--blue-dark)`
Todos já usam as variáveis CSS — **não requerem alteração direta**:
- `login.component.ts` — botão de submit, focus de input
- `todos.component.ts` — botão de adicionar, checkbox, aba ativa, focus de input
- `profile.component.ts` — botões de ação, ícones, links
- `user-avatar.component.ts` — background do avatar, border no hover

---

## Fluxo Técnico
1. Alterar `--blue` e `--blue-dark` em `styles.scss` para tons de verde.
2. Atualizar `colors.ts` para refletir a nova paleta (renomear chaves e valores).
3. A cascata CSS propaga automaticamente a mudança para todos os componentes.
4. Nenhuma alteração de template HTML ou lógica TypeScript é necessária.

---

## Arquivos a Modificar/Criar

| Arquivo | Ação | Detalhe |
|---------|------|---------|
| `frontend/src/styles.scss` | **Modificar** | Alterar `--blue` para `#22c55e` e `--blue-dark` para `#16a34a`; atualizar comentário |
| `frontend/src/app/shared/colors.ts` | **Modificar** | Renomear chaves de `PRIMARY_PINK*` para `PRIMARY_GREEN*`; atualizar valores hex e comentários |

---

## Critérios Técnicos de Pronto
- [ ] `--blue` em `styles.scss` vale `#22c55e` (verde primário)
- [ ] `--blue-dark` em `styles.scss` vale `#16a34a` (verde hover/active)
- [ ] `colors.ts` reflete os mesmos valores e não contém referências a rosa/pink
- [ ] Nenhum elemento da interface exibe rosa/pink como cor primária
- [ ] Botões de login, todos e profile exibem verde
- [ ] Contraste texto/fundo atende WCAG AA (texto `#CBD5E1` sobre `#22c55e` e `#16a34a` ✓)
- [ ] Interface responsiva com a nova paleta (mobile e desktop)
