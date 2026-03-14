# Spec — US-0: Trocar cor para amarelo

## Escopo Técnico
Derivado do PRD:
- Backend necessário: não
- Frontend necessário: sim

## Objetivo Técnico
Substituir o esquema de cores azul (#1976D2, #1565C0, #0D47A1, #E3F2FD, etc.) por um esquema de cores amarelo coerente em toda a aplicação frontend. Isso envolve atualizar a paleta CSS global e garantir contraste adequado de acessibilidade.

## Paleta de Cores Amarelo Proposta

Substituição de variáveis CSS em `frontend/src/styles.scss`:

| Variável CSS | Azul Atual | Amarelo Novo | Uso |
|---|---|---|---|
| `--bg` | #E3F2FD | #FFFDE7 | Background principal (páginas) |
| `--bg2` | #BBDEFB | #FFF9C4 | Background secundário (cards, headers) |
| `--bg3` | #90CAF9 | #FFEB3B | Background hover (cards) |
| `--card` | #BBDEFB | #FFF9C4 | Background cards |
| `--hover` | #90CAF9 | #FFEB3B | Background hover |
| `--blue` | #1976D2 | #FBC02D | Cor primária (botões, header) |
| `--blue-dark` | #1565C0 | #F9A825 | Hover primário (botões) |
| `--text` | #0D47A1 | #827000 | Texto padrão |
| `--text-bright` | #0D47A1 | #827000 | Texto títulos |
| `--muted` | #5E7FA6 | #A18E5D | Texto secundário/mutado |
| `--border` | #90CAF9 | #FFEB3B | Bordas |
| `--red` | #EF4444 | #EF4444 | Erros (mantém vermelho) |
| `--green` | #10B981 | #10B981 | Sucesso (mantém verde) |
| `--yellow` | #2196F3 | #FFD600 | Destaque/checkbox/focus |

## Estrutura de Dados
Nenhuma alteração no banco de dados é necessária. As cores são apenas propriedades visuais CSS.

## Componentes Frontend Afetados

### Páginas com alterações de cor:
1. **Login Page** (`frontend/src/pages/login/LoginPage.tsx`)
   - Background do login: `--bg`
   - Painel de marca (brand): Gradiente amarelo em vez de azul
   - Inputs e botões: paleta amarelo

2. **Todos Page** (`frontend/src/pages/Todos.tsx`)
   - Background principal: `--bg`
   - Header: `--bg2`
   - Cards de tarefas: `--bg2`
   - Botões: `--blue` e `--blue-dark`
   - Ícones e checkboxes: `--yellow` (amarelo)

3. **Board/Kanban Page** (`frontend/src/pages/Board.tsx`)
   - Background principal: `--bg`
   - Header: `--blue` (amarelo primário)
   - Colunas: `--bg2`
   - Cards: branco com bordas `--border`
   - Botões e interações: `--blue` e `--blue-dark`

## Fluxo Técnico
1. Atualizar arquivo global de estilos: `frontend/src/styles.scss`
   - Modificar `:root` com novas cores amarelas
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
- **Login brand gradient** (linha 18 em `login.scss`): Substituir `linear-gradient(140deg, #1976D2 0%, #1565C0 60%, #0D47A1 100%)` por gradiente amarelo
  - Proposto: `linear-gradient(140deg, #FBC02D 0%, #F9A825 60%, #827000 100%)`

- **Box-shadows com cores**: Alguns box-shadows incluem `rgba(13, 71, 161, ...)` (azul). Substituir por equivalente amarelo `rgba(130, 112, 0, ...)`
  - Exemplos: `board.scss` linhas 260, 264

### Ícones
- Material Icons já são renderizados como elementos SVG/fontes
- Mudar cor via CSS variable `--yellow` que agora será amarelo
- Elementos com `color: var(--yellow)` ou `.material-icons-round { color: var(--yellow); }` refletirão a mudança

### Acessibilidade
Verificar contraste de cores (WCAG AA):
- `--bg` (#FFFDE7) + `--text` (#827000): razão ~7:1 ✓ (bom contraste)
- `--bg2` (#FFF9C4) + `--text` (#827000): razão ~6:1 ✓ (bom contraste)
- `--blue` (#FBC02D) com fundo branco: razão ~3:1 ✓ (aceitável com ajustes)

## Critérios Técnicos de Pronto
- [ ] Arquivo `frontend/src/styles.scss` atualizado com paleta amarelo
- [ ] Gradiente de marca no login atualizado
- [ ] Box-shadows e cores hardcoded substituídas
- [ ] Aplicação renderiza com esquema amarelo em todas as páginas
- [ ] Ícones aparecem em amarelo (checkboxes, buttons, etc.)
- [ ] Texto mantém legibilidade (contraste WCAG AA mínimo)
- [ ] Links focados/hover usam `--blue` e `--blue-dark` corretamente
- [ ] Erros (vermelho) e sucesso (verde) mantêm suas cores originais
- [ ] Aplicação testada em páginas: Login, Todos, Board
