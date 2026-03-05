# Plan — US-7: Trocar cor para amarelo

## Escopo Técnico
Derivado da Spec:
- Backend necessário: **não**
- Frontend necessário: **sim**

Trata-se exclusivamente de alteração de estilos CSS nos componentes Angular existentes. A variável `--yellow: #FACC15` já está definida em `frontend/src/styles.scss` e será reutilizada — sem criar novas variáveis.

---

## Contratos de API
N/A — nenhuma alteração de backend.

---

## Estrutura de Dados
N/A — nenhuma alteração de banco de dados.

---

## Componentes Frontend

### LoginComponent
- **Arquivo:** `frontend/src/app/pages/login/login.component.ts`
- **Rota:** `/login`
- **Descrição:** Tela de autenticação com campos usuário/senha e botão "Entrar".
- **Alterações de estilo necessárias:**
  - `input:focus` → `border-color: var(--yellow)` (era `var(--blue)`)
  - `.btn-login` → `background: var(--yellow)` (era `var(--blue)`) + `color: #0A1628` (era `white`, necessário para contraste WCAG AA sobre fundo amarelo claro)
  - `.btn-login:hover` → `background: #E6B800` (amarelo escurecido para hover, substitui `var(--blue-dark)`)

### TodosComponent
- **Arquivo:** `frontend/src/app/pages/todos/todos.component.ts`
- **Rota:** `/todos`
- **Descrição:** Tela principal com lista de tarefas, filtros, cabeçalho e botão de adicionar.
- **Alterações de estilo necessárias:**
  - `.logo .material-icons-round` → `color: var(--yellow)` (era `var(--blue)`)
  - `.add-bar input:focus` → `border-color: var(--yellow)` (era `var(--blue)`)
  - `.btn-add` → `background: var(--yellow)` (era `var(--blue)`) + `color: #0A1628` (era `white`)
  - `.btn-add:hover` → `background: #E6B800` (substitui `var(--blue-dark)`)
  - `.filter-btn.active` → `border-bottom-color: var(--yellow)` (era `var(--blue)`)
  - `.checkbox:hover` → `border-color: var(--yellow)` (era `var(--blue)`)
  - `.checkbox.checked` → `background: var(--yellow); border-color: var(--yellow)` (era `var(--blue)`) + `.material-icons-round { color: #0A1628 }` (era `white`, contraste sobre amarelo)

---

## Fluxo Técnico
1. Usuário acessa `/login` → botão "Entrar" aparece em amarelo com texto escuro; inputs em foco exibem borda amarela.
2. Usuário autentica e acessa `/todos` → ícone do logo aparece em amarelo; filtro ativo exibe borda inferior amarela; botão "Adicionar" aparece em amarelo com texto escuro; inputs em foco exibem borda amarela.
3. Usuário marca tarefa → checkbox exibe fundo amarelo com ícone de check em cor escura.

---

## Arquivos a Modificar/Criar

| Arquivo | Ação |
|---------|------|
| `frontend/src/app/pages/login/login.component.ts` | Modificar estilos: `input:focus`, `.btn-login` e `.btn-login:hover` |
| `frontend/src/app/pages/todos/todos.component.ts` | Modificar estilos: `.logo .material-icons-round`, `input:focus`, `.btn-add`, `.btn-add:hover`, `.filter-btn.active`, `.checkbox:hover`, `.checkbox.checked` |

> `frontend/src/styles.scss` **não precisa ser alterado** — a variável `--yellow: #FACC15` já existe.

---

## Decisão de Contraste (WCAG AA)

A cor `#FACC15` (amarelo) é clara (luminância relativa alta). Para garantir contraste mínimo 4.5:1 sobre texto:

| Fundo | Texto | Ratio estimado |
|-------|-------|----------------|
| `#FACC15` | `#0A1628` (var(--bg)) | ~9:1 ✅ |
| `#FACC15` | `white` | ~1.5:1 ❌ |

Portanto, qualquer texto/ícone sobre fundo amarelo deve usar `color: #0A1628`.

---

## Critérios Técnicos de Pronto
- [ ] `.btn-login` renderiza com `background: var(--yellow)` e texto em `#0A1628`
- [ ] `.btn-add` renderiza com `background: var(--yellow)` e texto em `#0A1628`
- [ ] Inputs em foco exibem `border-color: var(--yellow)` em ambas as telas
- [ ] `.logo .material-icons-round` exibe `color: var(--yellow)`
- [ ] `.filter-btn.active` exibe `border-bottom-color: var(--yellow)`
- [ ] `.checkbox.checked` exibe `background: var(--yellow)` com ícone de check em `#0A1628`
- [ ] Nenhuma outra propriedade visual foi alterada além das listadas
- [ ] Visual consistente em Chrome, Firefox e Safari
