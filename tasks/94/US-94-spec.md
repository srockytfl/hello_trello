# Spec – US-94: Aplicar Tema Azul ao Site

## Escopo Técnico
Derivado do PRD:
- Backend necessário: **não**
- Frontend necessário: **sim**

## Descrição Geral
Aplicação consistente da paleta de cores azul em toda a interface do site. O site deve exibir azul como cor dominante nos elementos estruturais (fundo, cards, headers), componentes (botões, inputs, checkboxes) e títulos, mantendo acessibilidade (WCAG) e usabilidade.

## Paleta de Cores Azul (Atual e Confirmada)

| Elemento | Propósito | Código Hex |
|----------|-----------|-----------|
| Background Principal | Fundo geral da página | `#0F172A` |
| Background Cards/Headers | Fundo de cards e headers | `#1E293B` |
| Background Hover | Estados hover | `#334155` |
| Botões Primários | Botões de ação | `#3B82F6` |
| Botões Hover/Ativos | Hover dos botões | `#2563EB` |
| Acentos/Focus | Ícones destaque, checkboxes, borders | `#60A5FA` |
| Texto em Fundo Escuro | Texto regular | `#E2E8F0` |
| Texto Títulos | Títulos e destaque | `#FFFAF0` |
| Texto Secundário | Labels, hints, mutedtext | `#94A3B8` |
| Bordas | Separadores e bordas | `#334155` |

## Estrutura de Dados
Nenhuma alteração em tabelas ou persistência. Mudança puramente visual (CSS).

## Componentes Frontend Afetados

### 1. Arquivo Global: `frontend/src/styles.scss`
**Status:** Variáveis CSS já existem, mas precisam ser consolidadas/verificadas.
- **Variáveis** (no bloco `:root`):
  - `--bg`, `--bg2`, `--bg3`, `--card`, `--hover` — backgrounds azul
  - `--blue`, `--blue-dark` — botões azul
  - `--text`, `--text-bright`, `--muted` — textos
  - `--yellow` — usado para acentos/ícones (é #60A5FA, azul claro, não amarelo)
  - `--border` — bordas azul
  - `--red`, `--green` — mantém cores de status
- **Elementos**: body, inputs, buttons, scrollbar, ::placeholder

### 2. Arquivo: `frontend/src/index.html`
**Status:** Title atual é "TODO List" (neutro).
- **Verificar:** Tag `<title>` deve estar em uma cor azul ou simplesmente "TODO List" (já está correto)

### 3. Componente: `frontend/src/app/pages/login/login.component.ts`
**Status:** Já utiliza CSS variables para todas as cores.
- **Elementos:**
  - `.login-page` — background (herda `--bg` via body)
  - `.login-box` — background `var(--bg2)` ✓
  - `h2` — color `var(--text-bright)` ✓
  - `label` — color `var(--muted)` ✓
  - `input` — background `var(--card)`, border `var(--border)` ✓
  - `.btn-login` — background `var(--blue)`, hover `var(--blue-dark)` ✓
  - `.error` — color `var(--red)` ✓
  - `.hint` — color `var(--muted)` ✓
- **Verificação:** Todas as cores já estão em azul via variáveis

### 4. Componente: `frontend/src/app/pages/todos/todos.component.ts`
**Status:** Utiliza CSS variables, mas com alguns acentos em `--yellow`.
- **Elementos:**
  - `header` — background `var(--bg2)`, border `var(--border)` ✓
  - `.logo` — color `var(--text-bright)` ✓
  - `.logo .material-icons-round` — color `var(--yellow)` (azul claro #60A5FA) ✓
  - `.stats` — color `var(--muted)` ✓
  - `.btn-logout` — color `var(--muted)`, background `var(--hover)` ✓
  - `main` — background herdado de body ✓
  - `input` (add-bar) — background `var(--card)`, border `var(--border)`, focus `var(--yellow)` ✓
  - `.btn-add` — background `var(--blue)`, hover `var(--blue-dark)` ✓
  - `.filter-btn` — color `var(--muted)`, active color `var(--text-bright)` e underline `var(--yellow)` ✓
  - `.todo-item` — background `var(--bg2)`, hover `var(--bg3)` ✓
  - `.checkbox` — border `var(--muted)`, checked background `var(--yellow)`, hover `var(--yellow)` ✓
  - `.todo-text` — color herdado ✓
  - `.todo-item.done .todo-text` — color `var(--muted)` ✓
  - `.btn-del` — color `var(--muted)`, hover `var(--red)` ✓
  - `.dot-pending` — background `var(--yellow)` ✓
  - `.dot-done` — background `var(--green)` ✓
- **Verificação:** TODAS as cores estão em azul ou cores de status apropriadas

## Fluxo Técnico de Implementação

1. **Verificação de Styles Global** (`frontend/src/styles.scss`):
   - Confirmar que `:root` contém todas as variáveis CSS corretas
   - Valores já estão em azul (nenhuma mudança necessária)

2. **Verificação de HTML** (`frontend/src/index.html`):
   - Confirmar `<title>` é "TODO List"
   - Nenhuma mudança necessária

3. **Renderização Visual** (no navegador):
   - Página de login com fundo azul escuro, inputs azuis, botão azul ✓
   - Página de todos com header azul, cards azuis, botões azuis ✓
   - Ícones e acentos em azul claro (#60A5FA) ✓
   - Texto legível em contraste WCAG ✓

4. **Testes de Aceitação:**
   - Abrir `http://localhost:4200/login` — verifica fundo azul, inputs, botão azul
   - Abrir `http://localhost:4200/todos` — verifica header azul, cards, botões, ícones
   - Verifica contraste de cores para acessibilidade

## Arquivos a Modificar/Criar

| Arquivo | Ação | Justificativa |
|---------|------|----------|
| `frontend/src/styles.scss` | Verificar | CSS variables já estão corretas em azul |
| `frontend/src/index.html` | Verificar | Title já está correto como "TODO List" |
| `frontend/src/app/pages/login/login.component.ts` | Verificar | Todas as cores já usam CSS variables azul |
| `frontend/src/app/pages/todos/todos.component.ts` | Verificar | Todas as cores já usam CSS variables azul |

## Notas Técnicas

- **Arquitetura:** Uso de CSS custom properties (variáveis) permite mudança de tema global sem alterar componentes
- **Sem Breaking Changes:** Componentes não têm cores hardcoded
- **Sem Alteração de Lógica:** Nenhuma mudança em TypeScript/JavaScript
- **Contraste WCAG:** Paleta mantém relações de contraste:
  - Texto claro (`#E2E8F0`) sobre fundo azul escuro (`#0F172A`) — ~10:1 (AAA) ✓
  - Botões azuis (`#3B82F6`) com texto escuro (`#0A1628`) — ~7:1 (AAA) ✓
  - Texto cinza médio (`#94A3B8`) sobre fundo azul — ~4.5:1 (AA) ✓

## Critérios Técnicos de Pronto

- [ ] CSS variables em `frontend/src/styles.scss` confirmadas com cores azul
- [ ] Página `index.html` com título apropriado
- [ ] Login renderiza com fundo azul, inputs azuis, botão azul
- [ ] Todos renderiza com header azul, cards azuis, botões azuis
- [ ] Todos elementos interativos (botões, inputs, checkboxes) com cores azuis
- [ ] Ícones e acentos em azul claro (#60A5FA)
- [ ] Contraste atende WCAG AA mínimo (verificável visualmente)
- [ ] Sem alterações em JavaScript/TypeScript (apenas CSS)
- [ ] Build e servidor funcionam sem erros com as mudanças
