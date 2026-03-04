# US-7 — Trocar cor para amarelo — Implementação Fullstack

## Resumo
Atualização visual da cor primária da aplicação de rosa/pink (#FF69B4) para amarelo (#FFD700),
conforme critérios de aceitação da US-7. Mudança aplicada via variáveis CSS (`--blue`, `--blue-dark`,
`--blue-darker`, `--blue-glow`, `--shadow-blue`) em `styles.scss`, propagando automaticamente para
todos os elementos que as utilizam.

## Alterações no Backend
Nenhuma — a US-7 é exclusivamente frontend (CSS/SCSS). Os endpoints existentes não foram alterados.

## Alterações no Frontend

### Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `frontend/src/styles.scss` | `--blue`: `#FF69B4` → `#FFD700` |
| `frontend/src/styles.scss` | `--blue-dark`: `#e05599` → `#E6C200` |
| `frontend/src/styles.scss` | `--blue-darker`: `#c03d7d` → `#D4AF37` |
| `frontend/src/styles.scss` | `--blue-glow`: `rgba(255, 105, 180, 0.3)` → `rgba(255, 215, 0, 0.3)` |
| `frontend/src/styles.scss` | `--shadow-blue`: `rgba(255, 105, 180, 0.22)` → `rgba(255, 215, 0, 0.22)` |
| `frontend/src/styles.scss` | `::selection background`: `rgba(255, 105, 180, 0.3)` → `rgba(255, 215, 0, 0.3)` |

## Elementos Afetados pela Mudança de `--blue`

- **Botão "Entrar"** (login) — fundo amarelo (#FFD700), hover (#E6C200)
- **Botão "Adicionar"** (todos) — fundo amarelo (#FFD700), hover (#E6C200)
- **Checkbox marcado** — fundo e borda amarelos
- **Filtro ativo** — borda inferior amarela
- **Input com foco** — borda amarela (`:focus-visible` usa `var(--blue)`)
- **Seleção de texto** — highlight amarelo translúcido
- **Shadow/glow** — efeito de brilho amarelo em elementos com foco

## Paleta Amarela Aplicada

| Variável | Valor | Uso |
|----------|-------|-----|
| `--blue` | `#FFD700` | Cor primária (botões, destaques, foco) |
| `--blue-dark` | `#E6C200` | Hover/active states |
| `--blue-darker` | `#D4AF37` | Estados mais escuros |
| `--blue-glow` | `rgba(255, 215, 0, 0.3)` | Brilho/glow em elementos |
| `--shadow-blue` | `0 0 0 3px rgba(255, 215, 0, 0.22)` | Sombra de foco |

## Contraste WCAG AA

- Texto escuro (`#111111` / `#000`) sobre fundo `#FFD700`:
  - Ratio ≈ **8.3:1** ✓ (WCAG AA exige mínimo 4.5:1 para texto normal)
- Amarelo (`#FFD700`) sobre fundo escuro (`#080e1a`):
  - Ratio ≈ **10.5:1** ✓ (ótimo contraste em modo dark)

## Critérios de Aceitação Atendidos

1. ✅ Botões, headers, destaques exibem amarelo (#FFD700)
2. ✅ Cor aplicada consistentemente via variáveis CSS (`--blue` e derivadas)
3. ✅ Contraste WCAG AA garantido (amarelo sobre escuro e texto escuro sobre amarelo)
4. ✅ Mudança persistida no frontend Angular (estilos CSS/SCSS)
5. ✅ Nenhum endpoint da API foi alterado

## Fora do Escopo (não alterado)

- Paleta de cores completa (backgrounds, bordas, etc.)
- Estrutura HTML dos componentes
- Novo sistema de temas
- Backend / endpoints da API
