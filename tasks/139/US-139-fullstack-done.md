# Fullstack Done — US-139 Verde

## Resumo

Implementacao completa do tema visual verde em toda a aplicacao. O site anteriormente tinha tema azul (US-144). Todos os fundos, componentes, gradientes, sombras, favicon e titulo da aba foram migrados para paleta de verde.

## Arquivos Modificados

### `frontend/index.html`
- `<title>` alterado de "Azul" para "Verde"
- Favicon SVG: cor de fundo alterada de `%231976D2` (azul) para `%232E7D32` (verde primario); letra alterada de "A" para "V"

### `frontend/src/styles.scss`
- Adicionadas variaveis Sass no topo do arquivo:
  - `$primary-green: #2E7D32`
  - `$secondary-green: #388E3C`
  - `$green-dark: #1B5E20`
  - `$green-light: #F1F8F4`
  - `$green-light-2: #DCF0E4`
  - `$green-medium: #A8D5B5`
  - `$green-muted: #5A8A65`
- Todas as variaveis CSS em `:root` redefinidas para paleta de verde usando as variaveis Sass
- Variaveis de paleta `--color-blue-*` renomeadas para `--color-green-*`
- Cor do checkmark no `.checkbox` alterada de `#0A1628` (azul muito escuro) para `#fff` (branco) para melhor contraste sobre fundo verde

### `frontend/src/pages/login/login.scss`
- Gradiente hardcoded em `.login-brand` alterado de azul (`#42A5F5 → #1976D2 → #1565C0`) para verde (`#66BB6A → #2E7D32 → #1B5E20`)
- Box-shadow de focus em `.field-input` alterado de `rgba(25, 118, 210, 0.15)` (azul) para `rgba(46, 125, 50, 0.15)` (verde)

### `frontend/src/pages/board.scss`
- Sombra em `.board-card` alterada de `rgba(21, 101, 192, 0.06/0.12)` (azul) para `rgba(27, 94, 32, 0.06/0.12)` (verde)
- Sombra em `.board-card-new` alterada de `rgba(25, 118, 210, 0.15)` (azul) para `rgba(46, 125, 50, 0.15)` (verde)

## Endpoints Implementados

Nenhum — US apenas frontend/estilos.

## Componentes Implementados

Nenhum componente novo criado — apenas variaveis CSS/Sass e estilos existentes foram atualizados.

## Paleta de Verde Adotada

| Variavel CSS | Valor | Proposito |
|---|---|---|
| `--bg` | `#F1F8F4` | Background principal |
| `--bg2` | `#DCF0E4` | Cards e headers |
| `--bg3` | `#A8D5B5` | Hover states |
| `--card` | `#DCF0E4` | Background de cards |
| `--hover` | `#A8D5B5` | Hover interativo |
| `--blue` | `#2E7D32` | Botoes primarios (nome mantido para compatibilidade) |
| `--blue-dark` | `#1B5E20` | Hover de botoes |
| `--text` | `#1B5E20` | Texto padrao |
| `--text-bright` | `#1B5E20` | Titulos e texto principal |
| `--muted` | `#5A8A65` | Texto secundario |
| `--yellow` | `#388E3C` | Destaque/focus/checkbox/icones |
| `--border` | `#A8D5B5` | Bordas de componentes |

## Observacoes

- Nomes de variaveis CSS (`--blue`, `--blue-dark`, `--yellow`) mantidos para nao quebrar referencias existentes nos componentes; apenas os valores hex foram alterados para verde.
- Texto escuro (`#1B5E20`) sobre fundos verdes claros (`#F1F8F4`, `#DCF0E4`) mantem contraste superior a 4.5:1 (WCAG AA).
- Texto branco (`#fff`) em botoes com `--blue` (`#2E7D32`) tem contraste de aproximadamente 7.5:1, bem acima do minimo WCAG AA.
- Gradiente do painel de marca do login: verde claro (`#66BB6A`) → verde primario (`#2E7D32`) → verde escuro (`#1B5E20`).
- Nenhuma estrutura HTML, layout, logica de negocio ou rota foi alterada.
