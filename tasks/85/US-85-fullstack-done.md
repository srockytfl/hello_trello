# US-85 — Fullstack Done: Tema Azul

## Resumo

Substituição completa da paleta de cores âmbar/dourada por tons de azul marinho, conforme os critérios de aceitação da US-85.

## O que foi feito

### Frontend

**Arquivo modificado:** `frontend/src/styles.scss`

Todas as variáveis CSS foram redefinidas com a nova paleta azul. Nenhum componente precisou ser alterado, pois todos já utilizavam `var(--*)` corretamente.

### Paleta anterior vs. nova

| Variável       | Antes (âmbar/dourado) | Depois (azul/cinza)  | Papel                          |
|----------------|-----------------------|----------------------|-------------------------------|
| `--bg`         | `#1A1400`             | `#0A1628`            | Background principal (navy escuro) |
| `--bg2`        | `#2A2000`             | `#0F2040`            | Header e login box             |
| `--bg3`        | `#3A2E00`             | `#172B52`            | Hover de items, fundo de cards |
| `--card`       | `#3A2E00`             | `#172B52`            | Background de cards            |
| `--hover`      | `#4A3C00`             | `#1E3564`            | Estado hover                   |
| `--blue`       | `#0066CC`             | `#3B82F6`            | Azul primário (botões, foco)   |
| `--blue-dark`  | `#0052A3`             | `#2563EB`            | Azul escuro (hover em botões)  |
| `--text`       | `#FDE68A`             | `#BFDBFE`            | Texto principal (azul claro)   |
| `--text-bright`| `#FFFBEB`             | `#EFF6FF`            | Texto em destaque (quase branco)|
| `--muted`      | `#CA8A04`             | `#64748B`            | Texto secundário (cinza ardósia)|
| `--red`        | `#EF4444`             | `#EF4444`            | Erros (mantido para acessibilidade)|
| `--green`      | `#FDE68A`             | `#94A3B8`            | Indicador "concluída" (cinza)  |
| `--yellow`     | `#FBBF24`             | `#60A5FA`            | Indicador "pendente" (azul)    |
| `--border`     | `#4A3C00`             | `#1E3564`            | Bordas                         |
| Scrollbar thumb| `#555` (hardcoded)    | `var(--hover)`       | Scrollbar — removido hardcode  |

### Backend

Nenhuma alteração necessária. A US-85 é puramente visual (CSS).

## Critérios atendidos

1. ✅ Toda a paleta utiliza tons de azul marinho como cor primária
2. ✅ Cinza (`--muted`, `--green`) é usado apenas para contraste e elementos secundários
3. ✅ Cores aplicadas em: backgrounds, botões, checkboxes, inputs, borders, indicadores, scrollbar
4. ✅ Paleta centralizada em variáveis CSS em `styles.scss` — mudança futura via arquivo único
5. ✅ Nenhuma cor âmbar/dourada permanece — scrollbar hardcoded `#555` também corrigida para `var(--hover)`

## Arquivos criados/modificados

| Arquivo | Ação |
|---------|------|
| `frontend/src/styles.scss` | Modificado — paleta de cores atualizada para azul |
| `tasks/85/US-85-fullstack-done.md` | Criado — este arquivo |
