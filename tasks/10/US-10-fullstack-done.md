# US-10 – Fullstack Done

## Resumo

Mudança puramente visual: adoção de rosa como cor principal de identidade visual da aplicação.

## Alterações

### Frontend

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `frontend/src/styles.scss` | Modificado | Paleta de cores global atualizada para rosa |
| `frontend/src/index.html` | Modificado | `<title>` alterado de "TODO List" para "Rosa" |

### Backend

Nenhuma alteração necessária (US-10 é exclusivamente visual).

## Detalhes das Mudanças de Cor

### `frontend/src/styles.scss` — variáveis CSS (`:root`)

| Variável | Antes | Depois |
|----------|-------|--------|
| `--bg` | `#0A1628` (navy escuro) | `#1A0A14` (rosa escuro) |
| `--bg2` | `#0F2040` | `#2D1020` |
| `--bg3` | `#172B52` | `#3D1629` |
| `--card` | `#172B52` | `#3D1629` |
| `--hover` | `#1E3564` | `#4E1A33` |
| `--blue` | `#3B82F6` (azul) | `#EC4899` (rosa — Tailwind pink-500) |
| `--blue-dark` | `#2563EB` | `#DB2777` (rosa escuro — Tailwind pink-600) |
| `--text` | `#BFDBFE` | `#FBCFE8` (rosa claro) |
| `--text-bright` | `#EFF6FF` | `#FDF2F8` (branco rosado) |
| `--muted` | `#64748B` | `#9D7A8E` (cinza-rosado) |
| `--green` | `#94A3B8` | `#F9A8D4` (rosa claro, para tarefas concluídas) |
| `--border` | `#1E3564` | `#4E1A33` |

> **Nota:** Os nomes das variáveis (`--blue`, `--blue-dark`) foram mantidos para evitar alterações em cascata nos componentes. Os valores foram substituídos por tons de rosa.

## Critérios de Aceitação Atendidos

1. ✅ Cores primárias alteradas para rosa em todos os componentes (via variáveis CSS globais)
2. ✅ Título do site (`<title>`) atualizado para "Rosa"
3. ✅ Todas as páginas (Login e Todos) refletem a mudança via herança de variáveis CSS
4. ✅ Cores complementares ajustadas para harmonizar com rosa (backgrounds, text, muted, border, green)

## Arquivos Modificados

- `frontend/src/styles.scss`
- `frontend/src/index.html`
