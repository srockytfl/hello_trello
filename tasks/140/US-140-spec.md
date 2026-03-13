# Spec — US-140: Trocar cor para azul

## Escopo Técnico
Derivado do PRD:
- Backend necessário: não
- Frontend necessário: sim

## Objetivo Técnico
Substituir o esquema de cores rosa (#E91E63, #C2185B, #F8BBD0, #FCE4EC, etc.) por um esquema de cores azul coerente em toda a aplicação frontend. Isso envolve atualizar a paleta CSS global e garantir contraste adequado de acessibilidade.

## Paleta de Cores Azul Proposta

Substituição de variáveis CSS em `frontend/src/styles.scss`:

| Variável CSS | Rosa Atual | Azul Novo | Uso |
|---|---|---|---|
| `--bg` | #FCE4EC | #E3F2FD | Background principal (páginas) |
| `--bg2` | #F8BBD0 | #BBDEFB | Background secundário (cards, headers) |
| `--bg3` | #F48FB1 | #90CAF9 | Background hover (cards) |
| `--card` | #F8BBD0 | #BBDEFB | Background cards |
| `--hover` | #F48FB1 | #90CAF9 | Background hover |
| `--blue` | #E91E63 | #1976D2 | Cor primária (botões, header) |
| `--blue-dark` | #C2185B | #1565C0 | Hover primário (botões) |
| `--text` | #880E4F | #0D47A1 | Texto padrão |
| `--text-bright` | #880E4F | #0D47A1 | Texto títulos |
| `--muted` | #C2185B | #5E7FA6 | Texto secundário/mutado |
| `--border` | #F48FB1 | #90CAF9 | Bordas |
| `--red` | #EF4444 | #EF4444 | Erros (mantém vermelho) |
| `--green` | #10B981 | #10B981 | Sucesso (mantém verde) |
| `--yellow` | #E91E63 | #2196F3 | Destaque/checkbox/focus |

## Estrutura de Dados
Nenhuma alteração no banco de dados é necessária. As cores são apenas propriedades visuais CSS.

## Componentes Frontend Afetados

### Páginas com alterações de cor:
1. **Login Page** (`frontend/src/pages/login/LoginPage.tsx`)
   - Background do login: `--bg`
   - Painel de marca (brand): Gradiente azul em vez de rosa
   - Inputs e botões: paleta azul

2. **Todos Page** (`frontend/src/pages/Todos.tsx`)
   - Background principal: `--bg`
   - Header: `--bg2`
   - Cards de tarefas: `--bg2`
   - Botões: `--blue` e `--blue-dark`
   - Ícones e checkboxes: `--yellow` (azul)

3. **Board/Kanban Page** (`frontend/src/pages/Board.tsx`)
   - Background principal: `--bg`
   - Header: `--blue` (azul primário)
   - Colunas: `--bg2`
   - Cards: branco com bordas `--border`
   - Botões e interações: `--blue` e `--blue-dark`

## Fluxo Técnico
1. Atualizar arquivo global de estilos: `frontend/src/styles.scss`
   - Modificar `:root` com novas cores azuis
   - Verificar contraste de acessibilidade (WCAG AA mínimo)
2. Verificar componentes que usam cores hardcoded em SCSS:
   - Gradientes no login (`login.scss`)
   - Sombras e box-shadows (may contain color references)
   - Borderlines
3. Testar visualmente em todos os componentes
4. Validar acessibilidade de contraste

## Arquivos a Modificar/Criar

| Arquivo | Ação |
|---------|------|
| `frontend/src/styles.scss` | Modificar - Atualizar paleta CSS de cores |
| `frontend/src/pages/login/login.scss` | Modificar - Atualizar gradiente de marca |
| `frontend/src/pages/board.scss` | Verificar - Pode conter cores hardcoded |
| `frontend/src/pages/Todos.tsx` | Verificar - Componente que usa CSS global |
| `frontend/src/App.tsx` | Nenhuma alteração necessária |

## Detalhes Técnicos

### Gradientes e Cores Hardcoded
- **Login brand gradient** (linha 18 em `login.scss`): Substituir `linear-gradient(140deg, #E91E63 0%, #C2185B 60%, #880E4F 100%)` por gradiente azul
  - Proposto: `linear-gradient(140deg, #1976D2 0%, #1565C0 60%, #0D47A1 100%)`

- **Box-shadows com cores**: Alguns box-shadows incluem `rgba(136, 14, 79, ...)` (rosa). Substituir por equivalente azul `rgba(13, 71, 161, ...)`
  - Exemplos: `board.scss` linhas 260, 264

### Ícones
- Material Icons já são renderizados como elementos SVG/fontes
- Mudar cor via CSS variable `--yellow` que agora será azul
- Elementos com `color: var(--yellow)` ou `.material-icons-round { color: var(--yellow); }` refletirão a mudança

### Acessibilidade
Verificar contraste de cores (WCAG AA):
- `--bg` (#E3F2FD) + `--text` (#0D47A1): razão ~8:1 ✓ (bom contraste)
- `--bg2` (#BBDEFB) + `--text` (#0D47A1): razão ~5:1 ✓ (aceitável)
- `--blue` (#1976D2) com fundo branco: razão ~7:1 ✓ (excelente)

## Critérios Técnicos de Pronto
- [ ] Arquivo `frontend/src/styles.scss` atualizado com paleta azul
- [ ] Gradiente de marca no login atualizado
- [ ] Box-shadows e cores hardcoded substituídas
- [ ] Aplicação renderiza com esquema azul em todas as páginas
- [ ] Ícones aparecem em azul (checkboxes, buttons, etc.)
- [ ] Texto mantém legibilidade (contraste WCAG AA mínimo)
- [ ] Links focados/hover usam `--blue` e `--blue-dark` corretamente
- [ ] Erros (vermelho) e sucesso (verde) mantêm suas cores originais
- [ ] Aplicação testada em páginas: Login, Todos, Board
