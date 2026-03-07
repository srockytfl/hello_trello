# US-108 — Tema Visual Amarelo Completo

## Especificacao Tecnica

### Objetivo
Implementar tema visual completo com paleta de cores amarela em toda a aplicacao, alterando o titulo do site para "Amarelo" e o favicon.

---

## API Contract

### Backend (Express — server/index.js)

Esta historia e puramente de tema visual (frontend). O backend nao requer novos endpoints. O servidor Express existente continua sem alteracoes funcionais.

**Endpoints existentes que permanecem inalterados:**

| Metodo | Rota             | Descricao                       |
|--------|------------------|---------------------------------|
| POST   | /api/login       | Autenticacao de usuario         |
| GET    | /api/todos       | Lista todas as tarefas          |
| POST   | /api/todos       | Cria nova tarefa                |
| PUT    | /api/todos/:id   | Atualiza tarefa por ID          |
| DELETE | /api/todos/:id   | Remove tarefa por ID            |

Nenhum novo endpoint de API necessario para esta historia.

---

## Contrato de Frontend

### Paleta de Cores Amarela

| Variavel CSS      | Valor Hex | Uso                                          |
|-------------------|-----------|----------------------------------------------|
| `--bg`            | `#FFFBEB` | Background principal (amarelo muito claro)   |
| `--bg2`           | `#FEF3C7` | Cards, headers (amarelo claro)               |
| `--bg3`           | `#FDE68A` | Hover states (amarelo medio)                 |
| `--card`          | `#FEF3C7` | Background de cards                          |
| `--hover`         | `#FDE68A` | Hover em elementos interativos               |
| `--blue`          | `#D97706` | Botoes primarios (ambar escuro)              |
| `--blue-dark`     | `#B45309` | Hover de botoes primarios (ambar muito esc.) |
| `--text`          | `#374151` | Texto principal (cinza escuro, contraste OK) |
| `--text-bright`   | `#1F2937` | Titulos e texto em destaque                  |
| `--muted`         | `#92400E` | Texto secundario (marrom ambar)              |
| `--red`           | `#EF4444` | Erros (mantido)                              |
| `--green`         | `#10B981` | Sucesso (mantido)                            |
| `--yellow`        | `#F59E0B` | Highlight/accent/checkbox (ambar)            |
| `--border`        | `#FDE68A` | Bordas (amarelo medio)                       |
| `--radius`        | `6px`     | Border radius (mantido)                      |

Nota de acessibilidade: texto `#374151` sobre `#FEF3C7` tem contraste aproximado de 7:1 (passa WCAG AA e AAA). Texto `#1F2937` sobre `#FFFBEB` tem contraste aproximado de 12:1.

---

## Arquivos a Modificar

### 1. `frontend/src/styles.scss`
Substituir todas as variaveis CSS no bloco `:root` pela paleta amarela acima.

**Antes (rosa):**
```scss
:root {
  --bg: #FDF2F8;
  --bg2: #FCE7F3;
  --bg3: #F9A8D4;
  --card: #FCE7F3;
  --hover: #F9A8D4;
  --blue: #EC4899;
  --blue-dark: #DB2777;
  --text: #374151;
  --text-bright: #1F2937;
  --muted: #9D174D;
  --red: #EF4444;
  --green: #10B981;
  --yellow: #F472B6;
  --border: #F9A8D4;
  --radius: 6px;
}
```

**Depois (amarelo):**
```scss
:root {
  --bg: #FFFBEB;
  --bg2: #FEF3C7;
  --bg3: #FDE68A;
  --card: #FEF3C7;
  --hover: #FDE68A;
  --blue: #D97706;
  --blue-dark: #B45309;
  --text: #374151;
  --text-bright: #1F2937;
  --muted: #92400E;
  --red: #EF4444;
  --green: #10B981;
  --yellow: #F59E0B;
  --border: #FDE68A;
  --radius: 6px;
}
```

### 2. `frontend/src/index.html`
- Alterar `<title>Rosa</title>` para `<title>Amarelo</title>`

### 3. `frontend/src/app/pages/login/login.component.ts`
- Alterar texto hardcoded `<h2>Rosa</h2>` para `<h2>Amarelo</h2>`

### 4. `frontend/src/app/pages/todos/todos.component.ts`
- Alterar texto hardcoded `Rosa` no template do logo/header para `Amarelo`
  - Linha: `<div class="logo">` contem o texto `Rosa` — alterar para `Amarelo`

### 5. `frontend/src/favicon.ico`
- Substituir pelo favicon amarelo (SVG inline ou ICO com fundo/elemento amarelo `#FFD700`)
- Opcao recomendada: gerar SVG com circulo amarelo e converter, ou usar data URI em `index.html`:
  ```html
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='16' fill='%23FFD700'/><text x='16' y='22' text-anchor='middle' font-size='16' fill='%23000'>A</text></svg>">
  ```

---

## Agentes Necessarios

| Agente       | Responsabilidade                                              |
|--------------|---------------------------------------------------------------|
| Dev Frontend | Implementar todas as mudancas descritas acima nos 5 arquivos |

Nao e necessario Dev Backend para esta historia — nenhuma alteracao de API.

---

## Criterios de Aceite Tecnicos

1. `frontend/src/styles.scss` usa paleta de variaveis amarela em `:root`
2. `frontend/src/index.html` tem `<title>Amarelo</title>`
3. `login.component.ts` exibe `<h2>Amarelo</h2>`
4. `todos.component.ts` exibe `Amarelo` no logo do header
5. Favicon contem elemento amarelo visivel
6. Todos os componentes herdam o tema via variaveis CSS (sem cores hardcoded novas)
7. Contraste de cores atende WCAG AA (ratio minimo 4.5:1 para texto normal)
8. Build `cd frontend && npm run build` conclui sem erros
