# Plan – US-105: Rosa Theme

## Agente Responsavel

**Dev Frontend** — Esta historia e exclusivamente frontend (CSS + HTML). Nenhum agente backend e necessario.

## Resumo do Plano

Substituir a paleta de cores amarela (US-100) pela paleta rosa em `styles.scss`, atualizar o titulo do browser em `index.html`, e renomear o branding "TODO List" para "Rosa" nos dois componentes de pagina.

## Ordem de Implementacao

### Passo 1 — Atualizar variaveis CSS globais
**Arquivo:** `frontend/src/styles.scss`

Substituir o bloco `:root` atual pela nova paleta rosa:

```scss
:root {
  /* Backgrounds — rosa em gradacao */
  --bg: #FFF0F5;           /* Rosa muito claro para background principal */
  --bg2: #FFE4EE;          /* Rosa claro para cards/headers */
  --bg3: #FFB6D9;          /* Rosa medio para hover states */
  --card: #FFE4EE;         /* Rosa claro para cards */
  --hover: #FFB6D9;        /* Rosa medio para hover */

  /* Primary rosa */
  --blue: #E91E8C;         /* Rosa intenso para botoes primarios */
  --blue-dark: #C2185B;    /* Rosa escuro para hover de botoes */

  /* Text */
  --text: #374151;         /* Cinza escuro para texto em fundos rosas */
  --text-bright: #1F2937;  /* Cinza muito escuro para texto/titulos principais */
  --muted: #6B7280;        /* Cinza medio para texto secundario */

  /* State */
  --red: #EF4444;          /* Manter vermelho para erros */
  --green: #10B981;        /* Verde para sucesso */
  --yellow: #FF69B4;       /* Rosa brilhante para destaque/focus */

  /* Structure */
  --border: #FFB6D9;       /* Rosa medio para bordas */
  --radius: 6px;           /* Manter border-radius */
}
```

### Passo 2 — Atualizar titulo do browser
**Arquivo:** `frontend/src/index.html`

Alterar a linha:
```html
<title>TODO List</title>
```
Para:
```html
<title>Rosa</title>
```

### Passo 3 — Atualizar titulo da tela de Login
**Arquivo:** `frontend/src/app/pages/login/login.component.ts`

No template do componente, alterar:
```html
<h2>TODO List</h2>
```
Para:
```html
<h2>Rosa</h2>
```

Tambem atualizar a cor do texto do botao `.btn-login` de `#0A1628` para `#FFFFFF` para contraste adequado sobre o fundo rosa intenso:
```scss
.btn-login {
  /* ... */
  color: #FFFFFF;
  /* ... */
}
```

### Passo 4 — Atualizar logo/branding na tela de Todos
**Arquivo:** `frontend/src/app/pages/todos/todos.component.ts`

No template do componente, no div `.logo`, alterar:
```html
<div class="logo">
  <span class="material-icons-round">check_circle</span>
  TODO List
</div>
```
Para:
```html
<div class="logo">
  <span class="material-icons-round">check_circle</span>
  Rosa
</div>
```

Tambem atualizar a cor do texto do botao `.btn-add` de `#0A1628` para `#FFFFFF`:
```scss
.btn-add {
  /* ... */
  color: #FFFFFF;
  /* ... */
}
```

## Arquivos Modificados

| # | Arquivo | Tipo de Mudanca |
|---|---------|-----------------|
| 1 | `frontend/src/styles.scss` | CSS — substituir paleta `:root` inteira |
| 2 | `frontend/src/index.html` | HTML — alterar `<title>` |
| 3 | `frontend/src/app/pages/login/login.component.ts` | TypeScript/HTML — alterar titulo no template e cor do botao |
| 4 | `frontend/src/app/pages/todos/todos.component.ts` | TypeScript/HTML — alterar logo no template e cor do botao |

## Dependencias

- Nenhuma dependencia nova de biblioteca ou pacote
- Nenhuma migracao de dados necessaria
- Nenhum endpoint de API novo

## Validacao

Apos implementacao, verificar:
1. **Browser tab** mostra "Rosa" como titulo da pagina
2. **Tela de Login** exibe titulo "Rosa" e todos os elementos em rosa
3. **Tela de Todos** exibe logo "Rosa" e todos os elementos em rosa
4. **Botoes** (login, adicionar) com fundo rosa intenso e texto branco legivel
5. **Fundos** das paginas e cards em tons de rosa claro
6. **Inputs** com borda rosa no estado focus
7. **Checkboxes** selecionados em rosa brilhante
8. **Filtros ativos** com sublinhado rosa brilhante
9. **Hover states** em rosa medio
10. **Funcionalidade** de login, adicionar, completar e deletar tarefas preservada
11. **Nenhum erro** no console do browser

## Notas de Implementacao

- A mudanca nas variaveis CSS em `styles.scss` propaga automaticamente para todos os componentes via `var()` — nao e necessario alterar estilos inline por completo
- A unica excecao e a propriedade `color` hard-coded `#0A1628` nos botoes primarios, que deve ser atualizada para `#FFFFFF` por contraste adequado sobre fundo rosa intenso
- O arquivo `styles.scss` ja tem o bloco `:root` completo — substituir apenas os valores das variaveis dentro dele

---

**Arquivo plan:** `tasks/105/US-105-plan.md`
