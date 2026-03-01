# US-4 — Trocar cor para laranja — Implementação Fullstack

## Resumo

Alteração puramente visual (frontend). Nenhuma mudança de API necessária.

## Arquivos Modificados

| Arquivo | Tipo | Alteração |
|---------|------|-----------|
| `frontend/src/styles.scss` | CSS Global | Variável `--blue` trocada de amarelo (`#FFD700`) para laranja (`#FF9500`); `--blue-dark` de `#D4AF00` para `#E08400` |

## Detalhes das Alterações

### `frontend/src/styles.scss`

Variáveis CSS globais atualizadas em `:root`:

```scss
/* Antes */
--blue: #FFD700;      /* amarelo — cor primária anterior */
--blue-dark: #D4AF00; /* amarelo escuro — hover anterior */

/* Depois */
--blue: #FF9500;      /* laranja primário */
--blue-dark: #E08400; /* laranja escuro — hover */
```

A variável mantém o nome `--blue` por nomenclatura histórica do projeto; seu valor passa a ser laranja (#FF9500). Todos os elementos que referenciam `var(--blue)` e `var(--blue-dark)` passam automaticamente a exibir laranja:

- Botão "Entrar" (login) — background + hover
- Botão "Adicionar" (todos) — background + hover
- Borda de foco nos inputs (login e todos)
- Indicador da aba ativa nos filtros (todos)
- Checkbox marcado (todos)
- Ícone do logo (todos)

### Contraste / Acessibilidade

Os botões primários já usavam `color: #111111` como cor de texto antes dessa alteração.
Contraste de `#111111` sobre `#FF9500` ≈ **8.6:1** — aprovado no WCAG AA (mínimo 4.5:1).

Nenhum ajuste adicional de texto foi necessário.

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

- `LoginComponent` — botão "Entrar", bordas de foco nos inputs
- `TodosComponent` — botão "Adicionar", checkbox, filtro ativo, ícone do logo
