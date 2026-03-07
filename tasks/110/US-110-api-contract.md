# US-110: Azul - Contrato Tecnico

## Resumo

US-110 e uma mudanca puramente visual de tema. Nao ha alteracoes de API ou backend. Todo o trabalho acontece no frontend Angular.

---

## Agentes Necessarios

| Agente | Necessario? | Justificativa |
|--------|-------------|---------------|
| Dev Backend | NAO | Nenhum endpoint novo ou alterado |
| Dev Frontend | SIM | Troca de paleta CSS, titulo e favicon |

**Pipeline:** TL -> Dev Frontend -> QA -> PR

---

## Backend

### Sem alteracoes

O backend (`server/index.js`) nao precisa de nenhuma modificacao. Todos os endpoints existentes permanecem identicos:

- `POST /api/login`
- `GET /api/todos`
- `POST /api/todos`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`

Nao ha endpoint de tema ou configuracao de cor. O tema e inteiramente definido via CSS no frontend.

---

## Frontend

### Arquivos a modificar

#### 1. `frontend/src/styles.scss`

Substituir a paleta amarela/amber atual por uma paleta azul. As variaveis CSS devem ser redefinidas mantendo os mesmos nomes de variavel para que todos os componentes existentes herdem as novas cores automaticamente.

**Paleta de cores atual (amarela/amber) -> Nova paleta (azul):**

| Variavel CSS | Valor Atual | Novo Valor | Uso |
|---|---|---|---|
| `--bg` | `#FFFBEB` | `#EFF6FF` | Background principal (azul muito claro) |
| `--bg2` | `#FEF3C7` | `#DBEAFE` | Cards e header (azul claro) |
| `--bg3` | `#FDE68A` | `#BFDBFE` | Hover states (azul medio claro) |
| `--card` | `#FEF3C7` | `#DBEAFE` | Fundo de cards (azul claro) |
| `--hover` | `#FDE68A` | `#BFDBFE` | Hover interativo (azul medio claro) |
| `--blue` | `#D97706` | `#2563EB` | Botoes primarios (azul forte) |
| `--blue-dark` | `#B45309` | `#1D4ED8` | Hover de botoes primarios (azul escuro) |
| `--text` | `#374151` | `#1E3A5F` | Texto padrao |
| `--text-bright` | `#1F2937` | `#0F2544` | Titulos e texto principal |
| `--muted` | `#92400E` | `#3B6EA5` | Texto secundario/mutado |
| `--border` | `#FDE68A` | `#BFDBFE` | Bordas (azul medio claro) |
| `--yellow` | `#F59E0B` | `#F59E0B` | MANTER amarelo — usado em checkboxes, dots e focus |
| `--red` | `#EF4444` | `#EF4444` | MANTER vermelho — erros |
| `--green` | `#10B981` | `#10B981` | MANTER verde — sucesso |
| `--radius` | `6px` | `6px` | MANTER border-radius |

> Nota: `--yellow` deve ser mantido em `#F59E0B` pois e usado como cor de destaque nos checkboxes (`.checked`), no dot de pendentes e no `border-bottom` do filtro ativo — esses elementos amarelos sao parte do design intencional azul + amarelo.

#### 2. `frontend/src/index.html`

- Alterar `<title>` de `"Amarelo"` para `"Azul"`
- Atualizar o `link rel="icon"` inline SVG para ter fundo azul com a letra "A" em amarelo

**Favicon atual:**
```html
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='16' fill='%23FFD700'/><text x='16' y='22' text-anchor='middle' font-size='16' fill='%23000'>A</text></svg>">
```

**Favicon novo (circulo azul, letra "A" em amarelo):**
```html
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='16' fill='%232563EB'/><text x='16' y='22' text-anchor='middle' font-size='16' fill='%23FFD700'>A</text></svg>">
```

#### 3. `frontend/src/app/pages/login/login.component.ts`

- Alterar o texto `"Amarelo"` no template `<h2>Amarelo</h2>` para `<h2>Azul</h2>`

#### 4. `frontend/src/app/pages/todos/todos.component.ts`

- Alterar o texto `"Amarelo"` no template da logo `Amarelo` para `Azul`
- O icone `check_circle` com classe `.material-icons-round` ja usa `color: var(--yellow)` — essa regra deve ser mantida para preservar o destaque amarelo no icone

**Trecho atual no template do todos.component.ts:**
```html
<div class="logo">
  <span class="material-icons-round">check_circle</span>
  Amarelo
</div>
```

**Trecho novo:**
```html
<div class="logo">
  <span class="material-icons-round">check_circle</span>
  Azul
</div>
```

O estilo `.logo .material-icons-round { color: var(--yellow); font-size: 20px; }` ja existe e NAO deve ser alterado — o `--yellow` permanece `#F59E0B`, garantindo o destaque amarelo no icone conforme requisitado.

---

## Criterios de Aceitacao (para QA)

| # | Criterio | Como validar |
|---|----------|--------------|
| 1 | Fundo da pagina e azul claro | Inspecionar `background` do `body` em styles.scss |
| 2 | Header do app e azul | Verificar `background: var(--bg2)` no header de todos.component |
| 3 | Cards/itens de todo sao azuis | Verificar `.todo-item` com `background: var(--bg2)` |
| 4 | Botoes primarios sao azuis | Verificar `.btn-add` e `.btn-login` com `background: var(--blue)` |
| 5 | Titulo da aba do navegador e "Azul" | Verificar `<title>` em index.html |
| 6 | Titulo na tela de login e "Azul" | Verificar `<h2>` em login.component.ts |
| 7 | Logo no header exibe "Azul" | Verificar template de todos.component.ts |
| 8 | Favicon tem fundo azul e letra "A" amarela | Verificar SVG inline no index.html |
| 9 | Icone check_circle no header e amarelo | Verificar `color: var(--yellow)` no estilo do .logo |
| 10 | Checkboxes marcados sao amarelos | Verificar `.checkbox.checked { background: var(--yellow) }` |
| 11 | Filtro ativo tem sublinhado amarelo | Verificar `.filter-btn.active { border-bottom-color: var(--yellow) }` |
| 12 | Texto mantem legibilidade (contraste ok) | Verificar contraste entre `--text` e `--bg` visualmente |

---

## Resumo de Escopo

- **Backend:** sem alteracoes
- **Frontend - styles.scss:** redefinir variaveis de cor para paleta azul (manter --yellow, --red, --green)
- **Frontend - index.html:** alterar titulo para "Azul" e favicon para azul com "A" amarelo
- **Frontend - login.component.ts:** alterar texto "Amarelo" para "Azul" no h2
- **Frontend - todos.component.ts:** alterar texto "Amarelo" para "Azul" na logo do header
