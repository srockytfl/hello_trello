# US-1 — Trocar Cor para Azul — Fullstack Done

## Resumo

Alteração puramente de frontend (CSS). Nenhuma mudança de backend foi necessária.

## Problema

A variável CSS `--blue` estava definida com a cor âmbar (`#F59E0B`) e `--blue-dark` com `#D97706`, divergindo da identidade visual esperada (azul).

## Solução

Atualização centralizada no arquivo de estilos globais `frontend/src/styles.scss`:

| Variável      | Antes       | Depois      |
|---------------|-------------|-------------|
| `--blue`      | `#F59E0B`   | `#0066CC`   |
| `--blue-dark` | `#D97706`   | `#0052A3`   |

## Arquivos Modificados

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `frontend/src/styles.scss` | CSS Global | Atualização das variáveis `--blue` e `--blue-dark` para azul |

## Impacto Visual (sem alteração nos componentes)

Os componentes já usavam `var(--blue)` e `var(--blue-dark)` corretamente:

- **Login (`login.component.ts`):**
  - Botão "Entrar" → `background: var(--blue)` → agora azul `#0066CC`
  - Hover do botão → `background: var(--blue-dark)` → agora `#0052A3`
  - Inputs em foco → `border-color: var(--blue)` → agora azul

- **Todos (`todos.component.ts`):**
  - Ícone do logo → `color: var(--blue)` → agora azul
  - Botão "Adicionar" → `background: var(--blue)` → agora azul
  - Hover do botão → `background: var(--blue-dark)` → agora `#0052A3`
  - Input em foco → `border-color: var(--blue)` → agora azul
  - Filtro ativo → `border-bottom-color: var(--blue)` → agora azul
  - Checkbox marcado → `background: var(--blue); border-color: var(--blue)` → agora azul

## Critérios de Aceitação Verificados

1. ✅ Cor primária é azul `#0066CC`
2. ✅ Botões principais usam azul (já usavam `var(--blue)`)
3. ✅ Elementos interativos (checkbox, bordas de foco) usam azul
4. ✅ Contraste WCAG AA: branco sobre `#0066CC` = ~5.5:1 (≥ 4.5:1 ✓)
5. ✅ Nenhuma funcionalidade existente foi quebrada
6. ✅ CSS variables usadas (sem hardcoding nos componentes)
7. ✅ Arquivo centralizado atualizado

## Backend

Nenhuma alteração. Endpoints continuam intactos e funcionando normalmente.
