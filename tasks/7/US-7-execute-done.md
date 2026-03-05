# Execute Done — US-7

## Arquivos criados/modificados
- `frontend/src/app/pages/login/login.component.ts` — substituídas referências a `--blue`/`--blue-dark`/`white` pela cor amarela nos estilos de input, botão e hover
- `frontend/src/app/pages/todos/todos.component.ts` — substituídas referências a `--blue`/`--blue-dark`/`white` nos estilos do logo, input, botão adicionar, filtro ativo e checkbox

## Endpoints implementados
N/A — nenhuma alteração de backend.

## Componentes implementados
- `LoginComponent` — rota: /login
  - `input:focus` → `border-color: var(--yellow)`
  - `.btn-login` → `background: var(--yellow)` + `color: #0A1628`
  - `.btn-login:hover` → `background: #E6B800`

- `TodosComponent` — rota: /todos
  - `.logo .material-icons-round` → `color: var(--yellow)`
  - `.add-bar input:focus` → `border-color: var(--yellow)`
  - `.btn-add` → `background: var(--yellow)` + `color: #0A1628`
  - `.btn-add:hover` → `background: #E6B800`
  - `.filter-btn.active` → `border-bottom-color: var(--yellow)`
  - `.checkbox:hover` → `border-color: var(--yellow)`
  - `.checkbox.checked` → `background: var(--yellow); border-color: var(--yellow)` + ícone check em `color: #0A1628`

## Observações
- A variável `--yellow: #FACC15` já existia em `frontend/src/styles.scss` — não foi criada nenhuma nova variável de cor.
- Textos/ícones sobre fundo amarelo receberam `color: #0A1628` para garantir contraste WCAG AA (~9:1).
- Nenhum outro elemento visual foi alterado além dos listados no Plan.
