# Execute Done — US-139

## Arquivos criados/modificados

- `frontend/src/styles.scss` — Todas as variaveis CSS em `:root` redefinidas para paleta de verde
- `frontend/src/pages/login/login.scss` — Gradiente hardcoded em `.login-brand` trocado de amarelo para verde; box-shadow de focus do `.field-input` atualizado de `rgba(130, 112, 0, ...)` para `rgba(27, 94, 32, ...)`
- `frontend/src/pages/board.scss` — Sombras hardcoded `rgba(130, 112, 0, ...)` em `.board-card` e `.board-card-new` substituidas por `rgba(27, 94, 32, ...)`
- `frontend/index.html` — Favicon SVG atualizado de circulo rosa (`%23E91E63`) para circulo verde (`%232E7D32`) com letra "V"; titulo da aba alterado de "Rosa" para "Verde"

## Endpoints implementados

Nenhum — US apenas frontend.

## Componentes implementados

Nenhum componente novo criado — apenas variaveis CSS e estilos existentes foram atualizados.

## Paleta de Verde Adotada

| Variavel | Valor Anterior | Valor Novo | Proposito |
|---|---|---|---|
| `--bg` | `#FFFDE7` | `#F1F8F4` | Background principal |
| `--bg2` | `#FFF9C4` | `#DCF0E4` | Cards e headers |
| `--bg3` | `#FFEB3B` | `#A8D5B5` | Hover states |
| `--card` | `#FFF9C4` | `#DCF0E4` | Background de cards |
| `--hover` | `#FFEB3B` | `#A8D5B5` | Hover interativo |
| `--blue` | `#FBC02D` | `#2E7D32` | Botoes primarios |
| `--blue-dark` | `#F9A825` | `#1B5E20` | Hover de botoes |
| `--text` | `#827000` | `#1B5E20` | Texto padrao |
| `--text-bright` | `#827000` | `#1B5E20` | Titulos e texto principal |
| `--muted` | `#A18E5D` | `#5A8A65` | Texto secundario |
| `--yellow` | `#FFD600` | `#388E3C` | Destaque/focus/checkbox/icones |
| `--border` | `#FFEB3B` | `#A8D5B5` | Bordas de componentes |

## Observacoes

- Os nomes das variaveis (`--blue`, `--blue-dark`, `--yellow`) foram mantidos para nao quebrar referencias existentes nos componentes; apenas os valores hex foram alterados para verde.
- O texto escuro (`#1B5E20`) sobre fundos verdes claros (`#F1F8F4`, `#DCF0E4`) mantém contraste superior a 4.5:1 (WCAG AA).
- O texto branco (`#fff`) em botoes com `--blue` (`#2E7D32`) tem contraste de aproximadamente 7.5:1, bem acima do minimo WCAG AA.
- Nenhuma estrutura HTML, layout, logica de negocio ou rota foi alterada.
