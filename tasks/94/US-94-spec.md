# Spec – US-94: Aplicar Tema Azul ao Site

## Escopo Técnico
Derivado do PRD:
- Backend necessário: **não**
- Frontend necessário: **sim**

## Descrição Geral
Transformação visual do site Hello Trello para utilizar **azul como cor dominante** em toda a interface. A mudança é puramente visual (CSS) e não afeta funcionalidades ou estrutura do código.

## Paleta de Cores Azul

| Variável CSS | Elemento | Cor Hex | Descrição |
|----------|----------|---------|-----------|
| `--bg` | Background Principal | `#0F172A` | Azul muito escuro (base da interface) |
| `--bg2` | Background Cards/Headers | `#1E293B` | Azul escuro (cards, headers, elementos secundários) |
| `--bg3` | Background Hover | `#334155` | Azul médio (estados hover, focus) |
| `--card` | Cards de Conteúdo | `#1E293B` | Azul escuro (inputs, cards) |
| `--hover` | Hover/Focus Leve | `#334155` | Azul médio (transições suaves) |
| `--blue` | Botões Primários | `#3B82F6` | Azul brilhante (botões principais) |
| `--blue-dark` | Botões Hover | `#2563EB` | Azul mais escuro (hover de botões) |
| `--text` | Texto Normal | `#E2E8F0` | Cinza claro (legibilidade em fundo azul) |
| `--text-bright` | Texto Títulos | `#FFFAF0` | Branco quase puro (máximo contraste) |
| `--muted` | Texto Secundário | `#94A3B8` | Cinza médio (textos menos importante) |
| `--yellow` | Acentos/Focus | `#60A5FA` | Azul claro (checkboxes, ícones, focos) |
| `--border` | Bordas | `#334155` | Azul médio (linhas separadoras) |

## Estrutura de Dados
Não há alterações em tabelas ou persistência de dados. A mudança é **puramente visual**.

## Componentes Frontend Afetados

### Elemento Global: `frontend/src/styles.scss`
- **Descrição:** Define CSS custom properties que são herdadas por toda a interface
- **Mudança:** Atualizar valores do bloco `:root { ... }` com a paleta azul
- **Impacto:** Afeta automaticamente todos os componentes e elementos HTML

### Componente: `frontend/src/app/pages/login/login.component.ts`
- **Rota:** `/login`
- **Descrição:** Página de autenticação
- **Mudança:** Nenhuma — herda cores via CSS variables
- **Elementos que recebem azul:**
  - Background da login-box (usa `--bg2`)
  - Inputs (usa `--card`, `--border`, focus em `--yellow`)
  - Botão login (usa `--blue`, hover em `--blue-dark`)
  - Textos (usa `--text`, `--muted`, `--text-bright`)

### Componente: `frontend/src/app/pages/todos/todos.component.ts`
- **Rota:** `/todos`
- **Descrição:** Lista de tarefas com header, filtros e interações
- **Mudança:** Nenhuma — herda cores via CSS variables
- **Elementos que recebem azul:**
  - Header (usa `--bg2`, `--border`)
  - Logo/ícone (usa `--yellow` para ícones)
  - Botões (usa `--blue`, hover em `--blue-dark`)
  - Cards de tarefas (usa `--bg2`, hover em `--bg3`)
  - Checkboxes (usa `--yellow`, border em `--border`)
  - Inputs (usa `--card`, `--border`)
  - Filtros (usa `--muted`, active em `--text-bright`)
  - Textos (usa `--text`, `--muted`, `--text-bright`)

### Arquivo: `frontend/src/index.html`
- **Descrição:** HTML raiz da aplicação
- **Mudança:** Atualizar `<title>` para refletir tema azul
- **De:** Título atual (exemplo: "Rosa")
- **Para:** Um título apropriado como "TODO List" ou "Hello Trello"

## Fluxo Técnico de Implementação

1. **SDD Execute modifica `frontend/src/styles.scss`:**
   - Atualiza o bloco `:root { ... }` com novos valores Hex das variáveis CSS
   - Mantém a estrutura do arquivo inalterada
   - Sem adicionar novas variáveis ou propriedades

2. **SDD Execute modifica `frontend/src/index.html`:**
   - Localiza `<title>` e atualiza para um título coerente com tema azul
   - Sem alterar qualquer outra tag ou estrutura

3. **Resultado visual automático:**
   - TodosComponent renderiza em azul (sem mudanças no TypeScript)
   - LoginComponent renderiza em azul (sem mudanças no TypeScript)
   - Todos os estilos inline `:host { ... }` herdam as variáveis
   - Scrollbar herda `--hover`

4. **Validação visual:**
   - `npm run build` deve compilar sem erros
   - `npm start` deve servir a aplicação normalmente
   - Abrir `http://localhost:4200/login` — verificar cores azuis
   - Abrir `http://localhost:4200/todos` — verificar cores azuis
   - Verificar que botões, inputs, cards e textos estão em tons de azul

## Arquivos a Modificar/Criar

| Arquivo | Ação | Detalhes |
|---------|------|----------|
| `frontend/src/styles.scss` | Modificar | Alterar valores hex das 12 variáveis CSS no bloco `:root` |
| `frontend/src/index.html` | Modificar | Atualizar `<title>` |
| `frontend/src/app/pages/login/login.component.ts` | Sem mudança | Herdará cores via CSS variables |
| `frontend/src/app/pages/todos/todos.component.ts` | Sem mudança | Herdará cores via CSS variables |

## Notas Técnicas

- **Sem alterações de código TypeScript/JavaScript:** Apenas CSS é modificado
- **Sem breaking changes:** Todos os componentes usam CSS variables há; nenhum color é hardcoded
- **Sem alteração de arquitetura:** A estrutura do projeto permanece intacta
- **Sem alteração de funcionalidades:** Apenas skin/tema visual muda
- **Acessibilidade WCAG:** A paleta azul mantém contraste adequado:
  - Texto claro (`#E2E8F0`) em fundo azul escuro (`#0F172A`) — razão ~10:1 (nível AAA)
  - Botões azuis (`#3B82F6`) com texto escuro (`#0A1628`) — razão ~7:1 (nível AAA)

## Critérios Técnicos de Pronto

- [ ] Arquivo `frontend/src/styles.scss` modificado com paleta azul
- [ ] Arquivo `frontend/src/index.html` com título atualizado
- [ ] Componente LoginComponent renderiza com tema azul
- [ ] Componente TodosComponent renderiza com tema azul
- [ ] Todos elementos visuais (background, botões, inputs, cards, checkboxes) em tons de azul
- [ ] Contraste de cores atende mínimo WCAG AA
- [ ] Build do frontend sem erros: `npm run build`
- [ ] Servidor responde corretamente: `npm start`
- [ ] Nenhuma alteração em lógica ou funcionalidade
