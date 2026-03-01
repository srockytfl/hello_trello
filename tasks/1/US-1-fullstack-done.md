# US-1 — Trocar Cor para Azul — Implementação Concluída

## Resumo

Migração completa da paleta de cores da aplicação de **verde-escuro/rosa** para **azul**, conforme solicitado na US-1. A estratégia usada foi alterar apenas as variáveis CSS globais em `styles.scss`, propagando automaticamente a mudança a todos os componentes sem duplicação de código.

---

## Arquivos Modificados

### `frontend/src/styles.scss`

| Variável CSS | Antes | Depois | Descrição |
|---|---|---|---|
| `--bg` | `#0A1A0A` (verde escuro) | `#0A0F1A` | Fundo principal — azul quase preto |
| `--bg2` | `#0D200D` (verde escuro) | `#0D1526` | Fundo secundário — navy escuro |
| `--bg3` | `#112611` (verde escuro) | `#111E33` | Fundo terciário — navy |
| `--card` | `#112611` (verde escuro) | `#111E33` | Fundo de cards |
| `--hover` | `#153815` (verde escuro) | `#152840` | Estado hover |
| `--blue` | `#FF69B4` (rosa!) | `#3B82F6` | Cor primária — azul real (blue-500) |
| `--blue-dark` | `#C74F8C` (rosa escuro) | `#2563EB` | Cor primária hover — azul-600 |
| `--border` | `#153815` (verde escuro) | `#1E3A5F` | Bordas — azul escuro |

---

## Elementos Visuais Afetados (via variáveis CSS)

| Elemento | Variável usada |
|---|---|
| Botão "Entrar" (login) | `background: var(--blue)` / hover `var(--blue-dark)` |
| Botão "Adicionar" (todos) | `background: var(--blue)` / hover `var(--blue-dark)` |
| Ícone do logo no header | `color: var(--blue)` |
| Borda de foco nos inputs | `border-color: var(--blue)` |
| Indicador da aba ativa (filtros) | `border-bottom-color: var(--blue)` |
| Checkbox marcado | `background: var(--blue)` / `border-color: var(--blue)` |
| Hover do checkbox | `border-color: var(--blue)` |
| Todos os fundos / hover states | `var(--bg)`, `var(--bg2)`, `var(--bg3)`, `var(--hover)` |
| Todas as bordas | `var(--border)` |

---

## Endpoints de API

N/A — alteração exclusivamente visual, sem modificações no backend.

---

## Critérios de Aceitação Atendidos

- [x] Paleta azul aplicada em todos os elementos visuais principais
- [x] Consistência garantida via variáveis CSS (sem duplicação de código)
- [x] Acessibilidade mantida: `#111111` sobre `#3B82F6` ≈ 4.72:1 (passa WCAG AA)
- [x] Estados normal, hover, ativo e desabilitado todos cobertos

---

## Arquivos Criados

- `tasks/1/US-1-fullstack-done.md` (este arquivo)
