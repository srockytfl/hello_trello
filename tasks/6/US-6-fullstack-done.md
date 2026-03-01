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
| `frontend/src/app/pages/login/login.component.ts` | Cor hardcoded `#1A1400` → `#052e16` (texto do botão login) |
| `frontend/src/app/pages/todos/todos.component.ts` | Cores hardcoded `#1A1400` → `#052e16` (texto do botão Adicionar e ícone do checkbox) |

---

## Detalhes das Mudanças de Cores

### `styles.scss` — Variáveis CSS (`:root`)

| Variável | Antes | Depois | Descrição |
|----------|-------|--------|-----------|
| `--bg` | `#1A0A0A` | `#0A1A0A` | Fundo principal (verde escuro) |
| `--bg2` | `#200D0D` | `#0D200D` | Fundo secundário (headers, cards) |
| `--bg3` | `#261111` | `#112611` | Fundo terciário (hover de itens) |
| `--card` | `#261111` | `#112611` | Fundo de cards |
| `--hover` | `#3D1515` | `#153815` | Estado hover |
| `--blue` | `#FF9500` | `#22c55e` | Cor primária / botões principais |
| `--blue-dark` | `#E08400` | `#16a34a` | Cor primária escura (hover de botões) |
| `--border` | `#3D1515` | `#153815` | Bordas |

### Cores hardcoded (componentes)

| Arquivo | Antes | Depois | Descrição |
|---------|-------|--------|-----------|
| `login.component.ts` | `#1A1400` | `#052e16` | Texto do botão "Entrar" |
| `todos.component.ts` | `#1A1400` | `#052e16` | Texto do botão "Adicionar" e ícone check |

---

## Critérios de Aceitação Atendidos

1. ✅ Cor de fundo principal verde (`#0A1A0A` — verde escuro, tom coerente com `#22c55e`)
2. ✅ Botões principais usam verde (`--blue: #22c55e`, `--blue-dark: #16a34a`)
3. ✅ Contraste de texto mantido (`--text: #CBD5E1`, `--text-bright: #F1F5F9` sobre fundos escuros)
4. ✅ Todos os componentes responsivos — apenas variáveis CSS alteradas, estrutura intacta
