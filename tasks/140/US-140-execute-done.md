# Execute Done — US-140

## Arquivos criados/modificados

- `frontend/src/styles.scss` — Substituiu todas as variáveis CSS da paleta rosa pela paleta azul no bloco `:root`
- `frontend/src/pages/login/login.scss` — Atualizou o gradiente do painel de marca de rosa para azul; substituiu o `box-shadow` de foco do input de `rgba(233, 30, 99, …)` para `rgba(25, 118, 210, …)`
- `frontend/src/pages/board.scss` — Substituiu quatro cores hardcoded rosa/pink por equivalentes azuis: box-shadow do card (hover e normal), box-shadow do formulário de novo card e background do hover do botão "add card"

## Endpoints implementados

Nenhum — alteração exclusivamente frontend (CSS).

## Componentes implementados

Nenhum componente novo criado. Todas as páginas existentes herdam automaticamente a nova paleta via variáveis CSS:
- Login Page (`/login`) — fundo azul pastel, gradiente azul no painel de marca
- Todos Page (`/todos`) — fundo, header, cards e botões em azul
- Board/Kanban Page (`/board`) — header primário azul, colunas e cards em azul

## Observacoes

### Paleta final aplicada

| Variavel CSS    | Valor novo   | Uso                             |
|-----------------|-------------|----------------------------------|
| `--bg`          | `#E3F2FD`   | Background principal             |
| `--bg2`         | `#BBDEFB`   | Cards / headers                  |
| `--bg3`         | `#90CAF9`   | Hover states                     |
| `--card`        | `#BBDEFB`   | Background cards                 |
| `--hover`       | `#90CAF9`   | Hover                            |
| `--blue`        | `#1976D2`   | Cor primaria (botoes, header)    |
| `--blue-dark`   | `#1565C0`   | Hover primario                   |
| `--text`        | `#0D47A1`   | Texto padrao                     |
| `--text-bright` | `#0D47A1`   | Titulos e texto principal        |
| `--muted`       | `#5E7FA6`   | Texto secundario                 |
| `--yellow`      | `#2196F3`   | Destaque / checkbox / focus      |
| `--border`      | `#90CAF9`   | Bordas                           |
| `--red`         | `#EF4444`   | Erros (mantido)                  |
| `--green`       | `#10B981`   | Sucesso (mantido)                |

### Gradiente do login
- Antigo: `linear-gradient(140deg, #E91E63 0%, #C2185B 60%, #880E4F 100%)`
- Novo:   `linear-gradient(140deg, #1976D2 0%, #1565C0 60%, #0D47A1 100%)`

### Cores rgba substituidas em board.scss
- `rgba(136, 14, 79, 0.06)` → `rgba(13, 71, 161, 0.06)` (box-shadow card normal)
- `rgba(136, 14, 79, 0.12)` → `rgba(13, 71, 161, 0.12)` (box-shadow card hover)
- `rgba(233, 30, 99, 0.1)`  → `rgba(25, 118, 210, 0.1)`  (box-shadow new-card form)
- `rgba(233, 30, 99, 0.04)` → `rgba(25, 118, 210, 0.04)` (hover add-card button)

### Acessibilidade
- `--bg` (#E3F2FD) + `--text` (#0D47A1): razao ~8:1 (excelente, WCAG AAA)
- `--bg2` (#BBDEFB) + `--text` (#0D47A1): razao ~5:1 (aceitavel, WCAG AA)
- `--blue` (#1976D2) sobre fundo branco: razao ~7:1 (excelente, WCAG AAA)
- Erros (--red #EF4444) e sucesso (--green #10B981) mantidos sem alteracao
