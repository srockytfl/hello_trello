# Spec – US-94: Aplicar Tema Azul ao Site

## Escopo Técnico
Derivado do PRD:
- Backend necessário: **não**
- Frontend necessário: **sim**

## Descrição Geral
Aplicação de **tema azul coeso** em toda a interface do Hello Trello. O projeto já utiliza variáveis CSS de cores em escala azul; a tarefa é revisar e consolidar que:
1. **Todos os elementos visuais** usam tonalidades de azul (backgrounds, botões, inputs, borders)
2. **O logo** é substituído por uma bolinha azul simples
3. **Títulos e textos** mantêm legibilidade com contraste adequado (WCAG)
4. **Cores de estado** (erro, sucesso, focus) são consistentes com a identidade azul

## Paleta de Cores Atual (Validar)

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
| `--yellow` | Acentos/Focus | `#60A5FA` | Azul claro para destaques (checkboxes, ícones, focus) |
| `--red` | Erros | `#EF4444` | Vermelho (alertas, erros) |
| `--green` | Sucesso | `#10B981` | Verde (status sucesso) |
| `--border` | Bordas | `#334155` | Azul médio (linhas separadoras) |

## Estrutura de Dados
Não há alterações em tabelas ou persistência de dados. A mudança é **puramente visual** (CSS).

## Componentes Frontend Afetados

### Elemento Global: `frontend/src/styles.scss`
- **Descrição:** Define CSS custom properties que são herdadas por toda a interface
- **Mudança:** **Validar e confirmar** que todas as variáveis usam tonalidades de azul
- **Especificamente:**
  - Backgrounds (`--bg`, `--bg2`, `--bg3`, `--card`) em escalas de azul
  - Botões primários (`--blue`, `--blue-dark`) em azul brilhante
  - Bordas e hover (`--border`, `--hover`) em azul médio
  - Textos (`--text`, `--text-bright`, `--muted`) com contraste adequado em fundo azul
  - Acentos (`--yellow`) em azul claro para manter coesão visual
- **Impacto:** Afeta automaticamente todos os componentes e elementos HTML

### Componente: `frontend/src/app/pages/login/login.component.ts`
- **Rota:** `/login`
- **Descrição:** Página de autenticação
- **Mudança:** Nenhuma no código TypeScript — herda cores via CSS variables
- **Validação visual:**
  - Background da login-box renderiza em azul (`--bg2`)
  - Inputs com bordas azul (`--border`), focus em azul claro (`--yellow`)
  - Botão login com fundo azul brilhante (`--blue`), hover azul escuro (`--blue-dark`)
  - Todos os textos com contraste adequado
  - Mensagens de erro em vermelho (`--red`)

### Componente: `frontend/src/app/pages/todos/todos.component.ts`
- **Rota:** `/todos`
- **Descrição:** Lista de tarefas com header, filtros e interações
- **Mudança:**
  - **Logo:** Substituir o ícone `check_circle` do Material Icons por um círculo azul puro
    - Opções: (1) Usar um Material Icon diferente (ex: `radio_button_unchecked`), (2) Usar um `<span>` com `border-radius: 50%` em CSS azul, ou (3) Um SVG simples
    - Recomendação: Usar CSS puro para máxima consistência (`border-radius: 50%` com `background: var(--blue)`)
- **Validação visual:**
  - Header com fundo azul (`--bg2`), bordas azul (`--border`)
  - Logo: Um círculo azul puro no lugar do ícone `check_circle`
  - Botões em azul brilhante (`--blue`)
  - Cards de tarefas com backgrounds em azul (`--bg2`), hover azul médio (`--bg3`)
  - Checkboxes com bordas azul, fundo azul claro quando selecionados (`--yellow`)
  - Inputs com fundo azul escuro (`--card`), bordas azul (`--border`)
  - Filtros com texto muted, destaque em texto-bright
  - Textos em tons de cinza claro para legibilidade

### Arquivo: `frontend/src/index.html`
- **Descrição:** HTML raiz da aplicação
- **Mudança:**
  - Validar `<title>` (já está "TODO List" — mantém como está)
  - Confirmar que favicon carrega corretamente
- **Nota:** O título HTML já é apropriado; sem necessidade de alteração

## Fluxo Técnico de Implementação

### Fase 1: Revisar e Validar Paleta Azul
1. **Revisar `frontend/src/styles.scss`:**
   - Validar que `:root { ... }` possui todas as variáveis CSS com tonalidades azuis
   - Confirmar que `--bg`, `--bg2`, `--bg3` são azuis em escala
   - Confirmar que `--blue` e `--blue-dark` são azuis brilhantes
   - Confirmar que `--yellow` é na verdade azul claro (`#60A5FA`)
   - Validar contraste de texto: `--text` em `#E2E8F0`, `--text-bright` em `#FFFAF0`
   - **Se houver cores não-azuis (ex: verde, laranja):** Remapeá-las para tonalidades azuis

### Fase 2: Substituir Logo
2. **Atualizar `frontend/src/app/pages/todos/todos.component.ts`:**
   - **Localizar:** Linha 13-15 com `<span class="material-icons-round">check_circle</span>`
   - **Ação:** Substituir por um círculo azul puro. Opções:
     - **Opção A (Recomendada - CSS puro):** Substituir o ícone por um `<div>` com classe `.logo-circle` contendo `border-radius: 50%`, `background: var(--blue)`, `width: 20px`, `height: 20px`
     - **Opção B (Ícone Material):** Usar `radio_button_unchecked` ou similar (círculo vazio)
   - **Adicionar CSS:** Se usar Opção A, adicionar ao `styles` do componente:
     ```scss
     .logo-circle {
       width: 20px;
       height: 20px;
       border-radius: 50%;
       background: var(--blue);
       display: inline-block;
     }
     ```

### Fase 3: Validação Final
3. **Executar build e testes:**
   - `npm run build` — deve compilar sem erros
   - `npm start` — deve servir a aplicação normalmente

4. **Validação visual manual:**
   - Abrir `http://localhost:4200/login`
     - ✓ Background azul escuro
     - ✓ Inputs com bordas azul
     - ✓ Botão login em azul brilhante
     - ✓ Textos com contraste adequado
   - Abrir `http://localhost:4200/todos`
     - ✓ Header com fundo azul
     - ✓ Logo é um círculo azul puro (não ícone)
     - ✓ Todos botões em azul
     - ✓ Cards em tons de azul
     - ✓ Checkboxes com bordas azul
     - ✓ Acentos em azul claro
   - Testar navegação: Login e logout funcionam normalmente
   - Verificar WCAG: Usar ferramenta de contraste (ex: WebAIM)

## Arquivos a Modificar/Criar

| Arquivo | Ação | Detalhes |
|---------|------|----------|
| `frontend/src/styles.scss` | **Validar/Revisar** | Confirmar que variáveis CSS estão em tonalidades azuis corretas; remapear qualquer cor não-azul |
| `frontend/src/app/pages/todos/todos.component.ts` | **Modificar** | Substituir ícone `check_circle` por círculo azul puro (CSS ou ícone alternativo) |
| `frontend/src/index.html` | Sem mudança | Título já é "TODO List" — apropriado |
| `frontend/src/app/pages/login/login.component.ts` | Sem mudança | Herdará cores via CSS variables |

## Notas Técnicas

- **Mínima alteração de código TypeScript:** Apenas substituição do ícone do logo no HTML template do TodosComponent
- **Alteração CSS controlada:** Revisar/confirmar que `:root { ... }` em `styles.scss` está totalmente em tons de azul
- **Sem breaking changes:** Todos os componentes usam CSS variables; nenhuma cor é hardcoded
- **Sem alteração de arquitetura:** A estrutura do projeto permanece intacta
- **Sem alteração de funcionalidades:** Apenas skin/tema visual muda
- **Acessibilidade WCAG:** A paleta azul deve manter contraste adequado:
  - Texto normal (`#E2E8F0`) em fundo azul escuro (`#0F172A`) — razão ~10:1 (nível AAA ✓)
  - Botões azuis (`#3B82F6`) com texto escuro (`#0A1628`) — razão ~7:1 (nível AAA ✓)
  - Validar após aplicar todas as mudanças

## Critérios Técnicos de Pronto

- [ ] Variáveis CSS em `frontend/src/styles.scss` confirmadas/ajustadas para tons de azul
- [ ] Logo em `frontend/src/app/pages/todos/todos.component.ts` substituído por círculo azul
- [ ] Página de login renderiza com tema azul coeso
- [ ] Página de tarefas renderiza com tema azul coeso (incluindo novo logo)
- [ ] Todos elementos visuais (backgrounds, botões, inputs, cards, checkboxes) em tons de azul
- [ ] Logo é um círculo azul puro (não ícone, não check_circle)
- [ ] Contraste de cores atende mínimo WCAG AA
- [ ] Build do frontend sem erros: `npm run build`
- [ ] Servidor responde corretamente: `npm start`
- [ ] Testes manuais: Login e navegação para /todos funcionam
- [ ] Nenhuma alteração em lógica ou funcionalidade do sistema
