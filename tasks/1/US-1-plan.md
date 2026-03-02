# Plan — US-1: Trocar Cor para Azul

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
| Variável      | Valor atual (verde — US-6) | Novo valor (azul)  |
|---------------|----------------------------|--------------------|
| `--blue`      | `#22c55e`                  | `#3B82F6`          |
| `--blue-dark` | `#16a34a`                  | `#2563EB`          |

> Os fundos (`--bg`, `--bg2`, `--bg3`, `--card`, `--hover`, `--border`) são tons de verde escuro e **não devem ser alterados** — estão fora do escopo desta US.

### Constante TypeScript em `frontend/src/app/shared/colors.ts`
| Chave atual          | Valor atual   | Nova chave          | Novo valor  |
|----------------------|---------------|---------------------|-------------|
| `PRIMARY_GREEN`      | `#22c55e`     | `PRIMARY_BLUE`      | `#3B82F6`   |
| `PRIMARY_GREEN_HOVER`| `#16a34a`     | `PRIMARY_BLUE_HOVER`| `#2563EB`   |
| `PRIMARY_GREEN_DARK` | `#15803d`     | `PRIMARY_BLUE_DARK` | `#1D4ED8`   |

### Componentes que consomem `var(--blue)` / `var(--blue-dark)`
Todos já usam as variáveis CSS — **não requerem alteração direta**:
- `login.component.ts` — botão de submit, focus de input
- `todos.component.ts` — botão de adicionar, checkbox, aba ativa, focus de input
- `profile.component.ts` — botões de ação, ícones, links
- `user-avatar.component.ts` — background do avatar, border no hover

---

## Fluxo Técnico
1. Alterar `--blue` e `--blue-dark` em `styles.scss` para tons de azul.
2. Atualizar `colors.ts` renomeando chaves de `PRIMARY_GREEN*` para `PRIMARY_BLUE*` e atualizando os valores hex.
3. A cascata CSS propaga automaticamente a mudança para todos os componentes que consomem `var(--blue)` / `var(--blue-dark)`.
4. Nenhuma alteração de template HTML ou lógica TypeScript é necessária.

---

## Arquivos a Modificar/Criar

| Arquivo | Ação | Detalhe |
|---------|------|---------|
| `frontend/src/styles.scss` | **Modificar** | Alterar `--blue` para `#3B82F6` e `--blue-dark` para `#2563EB`; atualizar comentário |
| `frontend/src/app/shared/colors.ts` | **Modificar** | Renomear chaves de `PRIMARY_GREEN*` para `PRIMARY_BLUE*`; atualizar valores hex e comentários |

---

## Critérios Técnicos de Pronto
- [ ] `--blue` em `styles.scss` vale `#3B82F6` (azul primário)
- [ ] `--blue-dark` em `styles.scss` vale `#2563EB` (azul hover/active)
- [ ] `colors.ts` reflete os mesmos valores e não contém referências a verde/green
- [ ] Nenhum elemento da interface exibe verde como cor primária
- [ ] Botões de login, todos e profile exibem azul
- [ ] Contraste texto/fundo atende WCAG AA (texto `#CBD5E1` sobre `#3B82F6` ✓)
- [ ] Interface responsiva com a nova paleta (mobile e desktop)
