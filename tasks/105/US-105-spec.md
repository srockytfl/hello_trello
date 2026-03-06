# Spec – US-105: Rosa Theme

## Escopo Tecnico

Derivado do PRD:
- **Backend necessario:** nao (puramente visual)
- **Frontend necessario:** sim

## Analise de Estrutura Existente

### Arquitetura de Estilos
O projeto usa:
- **Angular 17** com componentes standalone
- **Variaveis CSS (CSS Custom Properties)** centralizadas em `frontend/src/styles.scss`
- **Estilos inline** em cada componente (`styles: [...]` nos decoradores `@Component`)
- **Paleta atual:** amarelo (Amber) — resultado da US-100

### Componentes Afetados
1. **LoginComponent** (`frontend/src/app/pages/login/login.component.ts`)
   - Botao de login com cor `var(--blue)`
   - Caixa de login com fundo `var(--bg2)`
   - Titulo hard-coded "TODO List" (deve ser atualizado para "Rosa")
   - Input focus com `border-color: var(--yellow)`

2. **TodosComponent** (`frontend/src/app/pages/todos/todos.component.ts`)
   - Header com `background: var(--bg2)`
   - Logo com texto hard-coded "TODO List" (deve ser atualizado para "Rosa")
   - Botao "Adicionar" com `background: var(--blue)`
   - Checkbox selecionado com `background: var(--yellow)`
   - Filtros ativos com `border-bottom-color: var(--yellow)`
   - Input focus com `border-color: var(--yellow)`

3. **index.html** (`frontend/src/index.html`)
   - Titulo do browser tab: "TODO List" (deve ser atualizado para "Rosa")

## Mudanca de Paleta de Cores

### Cores Atuais (Amarelo — US-100)
```
--bg: #FEF9E7         (amarelo muito claro — fundo principal)
--bg2: #FEF3C7        (amarelo claro — cards/headers)
--bg3: #FCD34D        (amarelo medio — hover states)
--card: #FEF3C7       (amarelo claro — cards)
--hover: #FCD34D      (amarelo medio — hover)
--blue: #F59E0B       (amarelo ouro — botoes primarios)
--blue-dark: #D97706  (amarelo ouro escuro — hover de botoes)
--yellow: #FBBF24     (amarelo brilhante — destaques/focus)
--border: #FCD34D     (amarelo medio — bordas)
--text: #374151       (cinza escuro — texto)
--text-bright: #1F2937 (cinza muito escuro — titulos)
--muted: #6B7280      (cinza medio — texto secundario)
```

### Cores Novas (Rosa)
Paleta rosa com contraste adequado (WCAG AA):
```
--bg: #FFF0F5         (rosa muito claro — fundo principal)
--bg2: #FFE4EE        (rosa claro — cards/headers)
--bg3: #FFB6D9        (rosa medio — hover states)
--card: #FFE4EE       (rosa claro — cards)
--hover: #FFB6D9      (rosa medio — hover)
--blue: #E91E8C       (rosa intenso — botoes primarios)
--blue-dark: #C2185B  (rosa escuro — hover de botoes)
--yellow: #FF69B4     (rosa brilhante — destaques/focus)
--border: #FFB6D9     (rosa medio — bordas)
--text: #374151       (cinza escuro — manter legibilidade)
--text-bright: #1F2937 (cinza muito escuro — titulos — manter legibilidade)
--muted: #6B7280      (cinza medio — texto secundario — manter legibilidade)
--red: #EF4444        (manter vermelho para erros)
--green: #10B981      (manter verde para sucesso)
```

### Justificativa de Paleta
- **Fundo claro rosaado** (#FFF0F5) garante legibilidade do texto e identidade visual suave
- **Rosa em gradacao** (#FFF0F5 -> #FFE4EE -> #FFB6D9 -> #E91E8C) para profundidade visual
- **Texto em cinza escuro** preservado para maximo contraste e conformidade WCAG AA (ratio > 7:1)
- **Botoes primarios em rosa intenso** (#E91E8C) com texto branco para contraste adequado (ratio > 4.5:1)
- **Rosa brilhante para destaques** (#FF69B4) usado em focus, checkboxes e filtros ativos

## Mudancas de Branding (Texto)

### Titulo do Browser Tab
- **Arquivo:** `frontend/src/index.html`
- **Atual:** `<title>TODO List</title>`
- **Novo:** `<title>Rosa</title>`

### Titulo na Tela de Login
- **Arquivo:** `frontend/src/app/pages/login/login.component.ts`
- **Atual:** `<h2>TODO List</h2>` no template
- **Novo:** `<h2>Rosa</h2>`

### Logo na Tela de Todos
- **Arquivo:** `frontend/src/app/pages/todos/todos.component.ts`
- **Atual:** `TODO List` no template dentro de `.logo`
- **Novo:** `Rosa`

## Estrutura de Dados

**Nenhuma mudanca de banco de dados** — operacao puramente visual e de branding.

## API Contract

**Nenhum endpoint novo ou modificado.** Esta historia e exclusivamente frontend — paleta de cores e textos de branding. O backend nao precisa ser alterado.

## Componentes Frontend

### LoginComponent
- **Rota:** `/login`
- **Descricao:** Tela de autenticacao
- **Mudancas necessarias:**
  - Titulo "TODO List" -> "Rosa" no template HTML
  - (estilos via variaveis CSS — heranca automatica)

### TodosComponent
- **Rota:** `/todos`
- **Descricao:** Tela principal com lista de tarefas
- **Mudancas necessarias:**
  - Logo "TODO List" -> "Rosa" no template HTML
  - (estilos via variaveis CSS — heranca automatica)

### styles.scss
- **Arquivo:** `frontend/src/styles.scss`
- **Descricao:** Variaveis CSS globais
- **Mudancas necessarias:** Substituir toda paleta por paleta rosa

### index.html
- **Arquivo:** `frontend/src/index.html`
- **Descricao:** Documento HTML raiz
- **Mudancas necessarias:** Titulo `<title>Rosa</title>`

## Fluxo Tecnico

1. **Atualizar `styles.scss`** — Substituir paleta amarela pelas variaveis rosa no `:root`
2. **Atualizar `index.html`** — Alterar `<title>` para "Rosa"
3. **Atualizar `login.component.ts`** — Alterar `<h2>TODO List</h2>` para `<h2>Rosa</h2>`
4. **Atualizar `todos.component.ts`** — Alterar texto do logo de "TODO List" para "Rosa"
5. **Resultado:** Interface completa em rosa com branding "Rosa"

## Arquivos a Modificar

| Arquivo | Acao | Descricao |
|---------|------|-----------|
| `frontend/src/styles.scss` | Modificar | Substituir paleta amarela pela paleta rosa no `:root` |
| `frontend/src/index.html` | Modificar | Alterar `<title>TODO List</title>` para `<title>Rosa</title>` |
| `frontend/src/app/pages/login/login.component.ts` | Modificar | Alterar `<h2>TODO List</h2>` para `<h2>Rosa</h2>` no template |
| `frontend/src/app/pages/todos/todos.component.ts` | Modificar | Alterar texto do logo de "TODO List" para "Rosa" no template |

## Criterios Tecnicos de Pronto

- [ ] Paleta rosa definida com contraste adequado (WCAG AA — ratio >= 4.5:1)
- [ ] `frontend/src/styles.scss` atualizado com variaveis CSS rosa
- [ ] `frontend/src/index.html` com `<title>Rosa</title>`
- [ ] LoginComponent com titulo "Rosa" no template
- [ ] TodosComponent com logo "Rosa" no template
- [ ] Todos os botoes (login, adicionar) em rosa
- [ ] Fundos (pagina, cards, header) em tons de rosa
- [ ] Texto legivel (cinza escuro sobre fundo rosa claro)
- [ ] Checkboxes selecionados em rosa brilhante
- [ ] Filtros ativos destacados em rosa
- [ ] Inputs focus com border rosa
- [ ] Nenhuma funcionalidade quebrada
- [ ] Interface responsiva mantida

## Notas Tecnicas

### Estrategia CSS Variables
Os componentes Angular ja usam `var(--blue)`, `var(--bg2)`, etc. A mudanca em `styles.scss` propaga automaticamente para todos os componentes sem necessidade de alterar os estilos inline individuais.

### Cor do Texto nos Botoes
O botao primario (`.btn-login`, `.btn-add`) usa `color: #0A1628` (texto escuro). Com botao rosa intenso (#E91E8C), o texto deve ser branco (`#FFFFFF`) para ratio de contraste adequado. Portanto, nos arquivos de componente, a propriedade `color` dos botoes deve ser atualizada de `#0A1628` para `#FFFFFF`.

### Compatibilidade
- Angular 17 com CSS Custom Properties nativamente
- Navegadores modernos com suporte a CSS variables
- Responsividade preservada (sem mudancas de layout)

---

**Arquivo spec:** `tasks/105/US-105-spec.md`
