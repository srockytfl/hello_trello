# US-4 — Trocar cor para laranja — Implementação Fullstack

## Resumo

Alteração puramente visual (frontend). Nenhuma mudança de API necessária.

## Arquivos Modificados

| Arquivo | Tipo | Alteração |
|---------|------|-----------|
| `frontend/src/styles.scss` | CSS Global | Cor primária trocada para laranja |
| `frontend/src/app/pages/login/login.component.ts` | Componente Angular | Cor do texto do botão ajustada para contraste WCAG AA |

## Detalhes das Alterações

### `frontend/src/styles.scss`

Variáveis CSS globais atualizadas:

```scss
/* Antes */
--blue: #EF4444;      /* vermelho — usado como cor primária */
--blue-dark: #DC2626; /* vermelho escuro — hover */

/* Depois */
--blue: #FF9500;      /* laranja primário */
--blue-dark: #E08400; /* laranja escuro — hover */
```

A variável se chama `--blue` por nomenclatura histórica do projeto, mas seu valor agora é laranja. Todos os elementos que referenciam `var(--blue)` e `var(--blue-dark)` passam automaticamente a exibir laranja:
- Botão "Entrar" (login)
- Botão "Adicionar" (todos)
- Borda de foco nos inputs
- Indicador da aba ativa nos filtros
- Checkbox marcado
- Ícone do logo

### `frontend/src/app/pages/login/login.component.ts`

`.btn-login` — cor do texto:

```scss
/* Antes */
color: white;   /* contraste ~2.2:1 contra #FF9500 — reprovado no WCAG AA */

/* Depois */
color: #1A1400; /* contraste ~8.6:1 contra #FF9500 — aprovado no WCAG AA */
```

O componente `todos.component.ts` já usava `color: #1A1400` no `.btn-add`, não necessitou ajuste.

## Critérios de Aceitação Atendidos

| # | Critério | Status |
|---|----------|--------|
| 1 | Botões primários exibem cor laranja (#FF9500) | ✅ |
| 2 | Laranja aplicado consistentemente via variável CSS | ✅ |
| 3 | Contraste texto/fundo ≥ 4.5:1 (WCAG AA) | ✅ (~8.6:1) |
| 4 | Cor definida em variável CSS reutilizável (`--blue`) | ✅ |

## Endpoints de API

N/A — alteração visual apenas.

## Páginas / Componentes Afetados

- `LoginComponent` — botão "Entrar", bordas de foco
- `TodosComponent` — botão "Adicionar", checkbox, filtro ativo, ícone do logo
