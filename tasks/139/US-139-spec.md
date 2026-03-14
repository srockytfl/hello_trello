# Spec — US-139: Trocar cor do site para Verde

## Problema
O site utiliza atualmente uma paleta amarelo/ambar como cor primaria em toda a interface
(variaveis CSS como `--bg`, `--blue`, `--yellow`, gradientes hardcoded no painel de login e
favicon rosa em `index.html`). Nao ha identidade visual em verde, contrariando a intencao
da US.

## Objetivo
Substituir a paleta de cores primaria — hoje amarelo/ambar — por uma paleta coerente de
verde, mantendo contraste WCAG AA e sem alterar estrutura, layout ou funcionalidades.

## Requisitos Funcionais
1. As variaveis CSS de cor definidas em `:root` dentro de `frontend/src/styles.scss` devem
   ser redefinidas para tons de verde (backgrounds, primario, hover, bordas, texto).
2. O gradiente hardcoded do painel de marca da pagina de login (`.login-brand` em
   `login.scss`) deve usar tons de verde.
3. O favicon embutido em `frontend/index.html` deve exibir um circulo verde com letra inicial.
4. Icones exibidos na interface (via `color: var(--yellow)` e `color: var(--blue)`) devem
   herdar a nova variavel de cor primaria verde apos a atualizacao das variaveis.
5. Todos os componentes que referenciam variaveis de cor (`--blue`, `--blue-dark`,
   `--yellow`, `--bg`, `--bg2`, `--bg3`, `--card`, `--hover`, `--border`, `--text`,
   `--text-bright`, `--muted`) devem refletir automaticamente o verde ao se atualizar as
   variaveis no `:root`, sem necessidade de alterar cada componente individualmente.
6. Sombras hardcoded em `board.scss` com `rgba(130, 112, 0, ...)` referenciando o amarelo
   escuro devem ser substituidas pelo equivalente verde escuro.
7. Texto sobre fundos verdes deve manter contraste minimo 4.5:1 (WCAG AA).

## Fluxo do Usuario
1. Usuario acessa o site (pagina de login ou pagina de todos/board).
2. Sistema exibe a interface com tema verde em: fundo da pagina, painel de marca do login,
   botoes, inputs, cards, icones e headings.
3. Icone da aba do navegador (favicon) aparece em verde.
4. Usuario navega entre paginas; o tema verde se mantem consistente em todos os elementos.

## Criterios de Aceitacao
- [ ] Variaveis CSS em `:root` de `styles.scss` estao mapeadas para tons de verde
- [ ] Background das paginas login e todos/board e verde (via `--bg`, `--bg2`)
- [ ] Painel lateral de marca no login exibe gradiente em verde
- [ ] Botoes primarios (`.btn-add`, `.btn-submit`, `.card-new-confirm`) exibem verde como
      background
- [ ] Cards e inputs usam bordas e fundos verdes via variaveis atualizadas
- [ ] Icones da interface aparecem em verde (variaveis de cor icone atualizadas)
- [ ] Favicon em `index.html` exibe circulo verde
- [ ] Texto sobre fundos verdes passa verificacao de contraste WCAG AA (4.5:1)
- [ ] Nenhuma cor hardcoded em amarelo/ambar persiste como cor primaria nos arquivos
      `styles.scss`, `login.scss` e `board.scss`

## Escopo Tecnico
- Backend necessario: nao
- Frontend necessario: sim

## Arquivos a Modificar

| Arquivo | O que alterar |
|---|---|
| `frontend/src/styles.scss` | Todas as variaveis CSS em `:root` — backgrounds, primario, hover, bordas, texto |
| `frontend/src/pages/login/login.scss` | Gradiente hardcoded em `.login-brand` (hex amarelo: `#FBC02D`, `#F9A825`, `#827000`) |
| `frontend/src/pages/board.scss` | Sombras hardcoded `rgba(130, 112, 0, ...)` |
| `frontend/index.html` | Favicon SVG inline (fill atual `%23E91E63` — rosa) e titulo da aba |

## Variaveis CSS a Redefinir (`:root` em `styles.scss`)

| Variavel | Proposito semantico | Expectativa visual |
|---|---|---|
| `--bg` | Background principal das paginas | Verde muito claro |
| `--bg2` | Background de headers, cards e paineis | Verde claro |
| `--bg3` | Background de hover states | Verde medio |
| `--card` | Background de cards | Verde claro |
| `--hover` | Background de hover interativo | Verde medio |
| `--blue` | Cor primaria de botoes e elementos de acao | Verde primario saturado |
| `--blue-dark` | Variante escura para hover de botoes | Verde escuro |
| `--text` | Texto padrao sobre fundos verdes | Escuro com contraste adequado |
| `--text-bright` | Titulos e texto principal | Verde muito escuro |
| `--muted` | Texto secundario/desativado | Verde acinzentado |
| `--border` | Bordas de componentes | Verde medio claro |
| `--yellow` | Destaque, focus, checkbox ativo, icones | Verde de destaque (redefinir valor) |

## Suposicoes
- A variavel `--blue` e `--blue-dark` mantem os nomes no CSS para nao quebrar referencias
  existentes nos componentes — apenas os valores hex mudam para verde.
- A variavel `--yellow` usada em checkboxes e icones sera redefinida com valor verde
  (nome mantido para nao quebrar referencias).
- O texto branco (`#fff`) sobre botoes com verde escuro primario mantera contraste adequado.
- A tonalidade exata do verde e decisao do agente Execute; a paleta deve ser coerente e
  seguir a estrutura semantica descrita acima.
- O favicon atual usa rosa (`%23E91E63`); sera trocado para verde sem alterar a estrutura SVG.
- Nao ha guia de marca ou Figma definido para esta US.

## Fora do Escopo
- Nao alterar estrutura HTML ou layout dos componentes
- Nao adicionar novos componentes ou paginas
- Nao modificar logica de negocio, rotas ou servicos
- Nao criar sistema de temas dinamico (light/dark toggle)
- Nao renomear variaveis CSS existentes
- Nao modificar arquivos de backend (`server/index.js`, `api/index.js`)
