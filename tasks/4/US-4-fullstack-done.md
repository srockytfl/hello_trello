# US-4 — Trocar cor para laranja — Implementação Fullstack

## Resumo

Alteração puramente visual (frontend). A cor primária foi trocada de rosa/pink (`#FF69B4`) para laranja (`#FF9500`) via variáveis CSS globais. Nenhuma mudança de API necessária.

## Arquivos Modificados

| Arquivo | Tipo | Alteração |
|---------|------|-----------|
| `frontend/src/styles.scss` | CSS Global | `--blue` trocado de `#FF69B4` (pink) → `#FF9500` (orange); `--blue-dark` de `#E91E8C` → `#E68500` |

## Arquivos Criados

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `frontend/src/app/shared/colors.ts` | TypeScript | Constante centralizada `COLORS` com `PRIMARY_ORANGE`, `PRIMARY_ORANGE_HOVER`, `PRIMARY_ORANGE_DARK` |

## Detalhes das Alterações

### `frontend/src/styles.scss`

Variáveis CSS globais atualizadas em `:root`:

```scss
/* Antes */
--blue: #FF69B4;      /* pink — cor primária anterior */
--blue-dark: #E91E8C; /* pink escuro — hover anterior */

/* Depois */
--blue: #FF9500;       /* primary orange — US-4 */
--blue-dark: #E68500;  /* primary orange hover/active — US-4 */
```

A variável mantém o nome `--blue` por nomenclatura histórica do projeto; seu valor passa a ser laranja (#FF9500). Todos os elementos que referenciam `var(--blue)` e `var(--blue-dark)` passam automaticamente a exibir laranja:

- **LoginComponent** — botão "Entrar" (background + hover), foco dos inputs
- **TodosComponent** — botão "Adicionar", checkbox marcado, aba de filtro ativa, ícone do logo, foco dos inputs
- **ProfileComponent** — avatar grande, ícone de settings, ícones de destaque (notifications, palette, security, language)
- **UserAvatarComponent** — avatar no header

### `frontend/src/app/shared/colors.ts`

Constante TypeScript centralizada criada conforme spec:

```typescript
export const COLORS = {
  PRIMARY_ORANGE: '#FF9500',
  PRIMARY_ORANGE_HOVER: '#E68500',
  PRIMARY_ORANGE_DARK: '#CC7A00',
} as const;
```

### Contraste / Acessibilidade

- Texto `#111111` sobre botão laranja `#FF9500` → contraste ≈ **8.6:1** — aprovado WCAG AAA ✅
- Laranja `#FF9500` sobre fundo escuro `#0A1A0A` → contraste > 4.5:1 — aprovado WCAG AA ✅

Nenhum ajuste adicional de texto foi necessário.

## Critérios de Aceitação Atendidos

| # | Critério | Status |
|---|----------|--------|
| 1 | Botões primários exibem cor laranja (#FF9500) | ✅ |
| 2 | Laranja aplicado consistentemente em todos os elementos de destaque | ✅ |
| 3 | Contraste texto/fundo ≥ 4.5:1 (WCAG AA) | ✅ (~8.6:1) |
| 4 | Cor definida em variável/constante reutilizável (`--blue` CSS + `COLORS` TS) | ✅ |

## Endpoints de API

N/A — alteração visual apenas.

## Páginas / Componentes Afetados (sem modificação de código nos componentes)

- `LoginComponent` (`/login`) — botão "Entrar", bordas de foco nos inputs
- `TodosComponent` (`/todos`) — botão "Adicionar", checkbox, filtro ativo, ícone do logo
- `ProfileComponent` (`/profile`) — avatar, ícones de destaque, ícone de settings
- `UserAvatarComponent` — avatar no header
