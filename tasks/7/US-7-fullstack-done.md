# US-7 — Trocar Cor para Amarelo — Fullstack Done

## Resumo

Implementação da mudança do esquema de cores da interface para amarelo, conforme critérios de aceitação da US-7. O tema anterior (verde, US-6) foi substituído por uma paleta âmbar/amarela consistente em toda a interface, incluindo cor primária e fundos.

---

## Endpoints

Nenhum endpoint novo ou modificado — a API não foi alterada (escopo restrito a mudança visual).

---

## Arquivos Modificados

### Frontend

| Arquivo | Alteração |
|---------|-----------|
| `frontend/src/styles.scss` | Atualização das variáveis CSS globais: cor primária para amarelo + fundos de verde para âmbar/amarelo |

---

## Detalhes das Mudanças de Cores

### `styles.scss` — Variáveis CSS (`:root`)

| Variável | Antes (verde, US-6) | Depois (amarelo, US-7) | Descrição |
|----------|---------------------|------------------------|-----------|
| `--bg` | `#0A1A0A` | `#1A1400` | Fundo principal (âmbar escuro) |
| `--bg2` | `#0D200D` | `#201800` | Fundo secundário (headers, cards) |
| `--bg3` | `#112611` | `#261E00` | Fundo terciário (hover de itens) |
| `--card` | `#112611` | `#261E00` | Fundo de cards |
| `--hover` | `#153815` | `#332800` | Estado hover |
| `--border` | `#153815` | `#332800` | Bordas |
| `--blue` | `#22c55e` | `#FFEB3B` | Cor primária / botões principais (amarelo) |
| `--blue-dark` | `#16a34a` | `#F9A825` | Cor primária escura / hover de botões (âmbar) |

### Cores hardcoded (componentes) — Sem alteração necessária

| Arquivo | Valor | Descrição |
|---------|-------|-----------|
| `login.component.ts` | `#111111` | Texto do botão "Entrar" — correto (escuro sobre amarelo) |
| `todos.component.ts` | `#111111` | Texto do botão "Adicionar" — correto (escuro sobre amarelo) |
| `todos.component.ts` | `#111111` | Ícone check do checkbox — correto (escuro sobre amarelo) |

---

## Elementos Afetados pela Mudança de `--blue` / fundos

- **Botão "Entrar"** (login) — fundo amarelo `#FFEB3B`, hover `#F9A825`
- **Botão "Adicionar"** (todos) — fundo amarelo `#FFEB3B`, hover `#F9A825`
- **Checkbox marcado** — fundo e borda amarelos, ícone escuro (`#111111`)
- **Checkbox hover** — borda amarela
- **Filtro ativo** — borda inferior amarela
- **Input com foco** — borda amarela
- **Ícone do logo** (`.material-icons-round` no header) — amarelo
- **Fundo geral** — tons âmbar escuro (coerentes com paleta amarela)

## Contraste WCAG AA

- Texto `#111111` sobre botão `#FFEB3B`: rácio ≈ **12:1** ✅ (WCAG AA exige ≥ 4.5:1)
- Ícone `#FFEB3B` sobre fundo escuro `#201800`: rácio ≈ **8:1** ✅

---

## Critérios de Aceitação Atendidos

1. ✅ Cor principal alterada para amarelo em todos os componentes visuais (`--blue: #FFEB3B`)
2. ✅ Alterações aplicadas de forma consistente em toda a interface (fundos + primária)
3. ✅ Variáveis de cor reutilizáveis utilizadas (sem duplicação de valores hardcoded)
