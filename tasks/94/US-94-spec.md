# Spec – US-94: Aplicar Tema Azul ao Site

## Escopo Técnico
Derivado do PRD:
- Backend necessário: **não**
- Frontend necessário: **sim**

## Descrição Geral
Transformação visual do site Hello Trello para utilizar azul como cor dominante em toda a interface. A mudança é puramente visual (CSS) e não afeta funcionalidades ou estrutura do código.

## Paleta de Cores Azul (Proposta)

| Elemento | Cor Atual | Cor Nova Azul | Código Hex |
|----------|-----------|---------------|-----------|
| Background Principal | Marrom Escuro | Azul Escuro | `#0F172A` |
| Background Cards/Headers | Marrom Médio | Azul Médio | `#1E293B` |
| Background Hover | Marrom Claro | Azul Claro | `#334155` |
| Cards | Marrom Médio | Azul Médio | `#1E293B` |
| Hover States | Marrom Claro | Azul Claro | `#334155` |
| Botões Primários | Amarelo | Azul Brilhante | `#3B82F6` |
| Botões Hover | Amarelo Escuro | Azul Mais Escuro | `#2563EB` |
| Acentos/Focus | Amarelo | Azul | `#60A5FA` |
| Texto em Fundo Escuro | Amarelo Claro | Cinza Claro | `#E2E8F0` |
| Texto Títulos | Branco Quase Puro | Branco Quase Puro | `#FFFAF0` |
| Texto Secundário | Amarelo Desbotado | Cinza Médio | `#94A3B8` |
| Bordas | Amarelo Médio | Azul Médio | `#334155` |

## Estrutura de Dados
Não há alterações em tabelas ou persistência de dados. A mudança é visual apenas.

## Componentes Frontend Afetados

### Arquivo Global: `frontend/src/styles.scss`
- **O que muda:** CSS custom properties (variables) no seletor `:root`
- **Quais variáveis:** `--bg`, `--bg2`, `--bg3`, `--card`, `--hover`, `--blue`, `--blue-dark`, `--text`, `--text-bright`, `--muted`, `--yellow`, `--border`
- **Elementos afetados:** Toda a interface (body, inputs, buttons, scrollbar)

### Página: `frontend/src/index.html`
- **O que muda:** Tag `<title>`
- **De:** "Rosa"
- **Para:** "TODO List" ou "Hello Trello" (azul no sentido conceitual/marca)

### Componente: `frontend/src/app/pages/login/login.component.ts`
- **O que muda:** Nenhum código — apenas herda as novas cores via CSS variables
- **Elementos afetados:**
  - Background da login-box (herda `--bg2`)
  - Input fields (herda `--card`, `--border`)
  - Botão de login (herda `--blue`)
  - Labels e hints (herdam `--muted`)

### Componente: `frontend/src/app/pages/todos/todos.component.ts`
- **O que muda:** Nenhum código — apenas herda as novas cores via CSS variables
- **Elementos afetados:**
  - Header (herda `--bg2`, `--border`)
  - Logo e título (herdam `--text-bright`, `--yellow` → será `--blue`)
  - Botões (herdam `--blue`, `--blue-dark`)
  - Cards de tarefas (herdam `--bg2`, `--bg3`, `--border`)
  - Filtros e checkboxes (herdam `--yellow` → será `--blue`)
  - Inputs (herdam `--card`, `--border`, `--yellow` → será `--blue`)

## Fluxo Técnico de Implementação

1. **SDD Execute** modifica `frontend/src/styles.scss`:
   - Atualiza `:root { ... }` com novas cores azul
   - Mantém estrutura de variáveis (sem adicionar novas)
   - Mantém scrollbar, spacing, border-radius inalterados

2. **SDD Execute** modifica `frontend/src/index.html`:
   - Altera `<title>Rosa</title>` para um título coerente com tema azul

3. **Todos os componentes** herdam automaticamente as novas cores via CSS variables:
   - LoginComponent renderiza em azul
   - TodosComponent renderiza em azul
   - Nenhuma mudança nos templates ou lógica TypeScript

4. **Testes visuais:**
   - Abrir `http://localhost:4200/login` — verificar cores azuis
   - Abrir `http://localhost:4200/todos` — verificar cores azuis
   - Verificar contraste WCAG (2 letras claras em fundo escuro, botões azuis legíveis)

## Arquivos a Modificar/Criar

| Arquivo | Ação | Detalhes |
|---------|------|----------|
| `frontend/src/styles.scss` | Modificar | Alterar CSS variables de `--bg`, `--bg2`, `--bg3`, `--card`, `--hover`, `--blue`, `--blue-dark`, `--text`, `--muted`, `--yellow`, `--border` para paleta azul |
| `frontend/src/index.html` | Modificar | Alterar `<title>` de "Rosa" para "TODO List" |
| `frontend/src/app/pages/login/login.component.ts` | Nenhuma | Herdará cores via CSS variables |
| `frontend/src/app/pages/todos/todos.component.ts` | Nenhuma | Herdará cores via CSS variables |

## Notas Técnicas

- **Sem breaking changes:** Todos os componentes usam CSS variables, logo não há hardcoded colors a alterar
- **Sem alteração de arquitetura:** A estrutura fica intacta
- **Sem alteração de funcionalidades:** Apenas skin/tema visual
- **Contraste WCAG:** A paleta azul mantém relação de contraste adequada entre texto e fundo
  - Texto claro (`#E2E8F0`) em fundo azul escuro (`#0F172A`) — razão ~10:1 (AAA)
  - Botões azuis (`#3B82F6`) com texto escuro (`#0A1628`) — razão ~7:1 (AAA)

## Critérios Técnicos de Pronto

- [ ] CSS variables em `frontend/src/styles.scss` alteradas para paleta azul
- [ ] Página index.html com título atualizado
- [ ] Login renderiza com tema azul
- [ ] Todos renderiza com tema azul
- [ ] Todos elementos interativos (botões, inputs, checkboxes) com cores azuis
- [ ] Contraste atende WCAG AA mínimo (verificável visualmente)
- [ ] Sem alterações em JavaScript/TypeScript (apenas CSS)
- [ ] Build e servidor funcionam corretamente com as mudanças
