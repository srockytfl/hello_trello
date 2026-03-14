# Spec — US-139: Trocar cor do site para amarelo

## Problema
O site nao possui uma identidade visual coerente baseada em amarelo. Fundos, componentes, icones e titulos devem seguir uma paleta amarela consistente em todas as paginas.

## Objetivo
Garantir que toda a interface aplique amarelo como cor primaria, cobrindo fundos de pagina, componentes interativos (botoes, cards, inputs), icones e o titulo/heading principal de cada pagina.

## Requisitos Funcionais
1. O fundo de todas as paginas (login e todos/board) deve ser amarelo ou variacao de amarelo
2. Botoes primarios devem usar cor amarela como background
3. Cards e inputs devem aplicar amarelo como cor primaria de borda ou fundo
4. Icones exibidos no site devem ser amarelos
5. O titulo/heading principal de cada pagina deve ser exibido em amarelo
6. O texto sobre fundos amarelos deve manter contraste adequado para legibilidade (WCAG AA minimo)
7. A paleta amarela deve ser aplicada de forma uniforme em todas as paginas da aplicacao

## Arquivos de Estilo Envolvidos
Com base na analise do codigo existente, os seguintes arquivos de estilo precisam ser revisados e ajustados:

- `frontend/src/styles.scss` — variaveis CSS globais (`:root`) e estilos da pagina Todos
- `frontend/src/pages/login/login.scss` — estilos da pagina Login
- `frontend/src/pages/board.scss` — estilos da pagina Board (Kanban)

## Variaveis CSS a Revisar (`:root` em `styles.scss`)
As variaveis abaixo ja existem no projeto e representam a paleta atual. A spec define o que cada uma deve expressar visualmente — a tonalidade exata e decisao de implementacao:

| Variavel       | Proposito semantico                                  | Expectativa visual        |
|----------------|------------------------------------------------------|---------------------------|
| `--bg`         | Background principal das paginas                     | Amarelo muito claro        |
| `--bg2`        | Background de headers, cards e paineis secundarios  | Amarelo claro              |
| `--bg3`        | Background de hover states                           | Amarelo medio              |
| `--card`       | Background de cards                                  | Amarelo claro              |
| `--hover`      | Background de hover interativo                       | Amarelo medio              |
| `--blue`       | Cor primaria de botoes e elementos de acao           | Amarelo primario saturado  |
| `--blue-dark`  | Variante escura para hover de botoes                 | Amarelo escuro             |
| `--text`       | Texto padrao sobre fundos amarelos                   | Escuro com contraste OK    |
| `--text-bright`| Titulos e texto principal                            | Amarelo escuro/dourado     |
| `--border`     | Bordas de componentes                                | Amarelo medio claro        |
| `--yellow`     | Destaque, focus, checkbox ativo, icones              | Amarelo puro/saturado      |

## Elementos Visuais por Pagina

### Pagina Login (`/login`)
- Painel de marca (esquerda): gradiente amarelo — sem mudanca se ja usa amarelo
- Titulo de login (`.login-title`): cor amarela via `var(--text-bright)`
- Botao de submit (`.btn-submit`): background `var(--blue)` (amarelo primario)
- Inputs (`.field-input`): borda e focus em amarelo via `var(--blue)`
- Icones dos campos (`field-icon`): cor amarela

### Pagina Todos (`/todos`)
- Logo (`.logo`, `.material-icons-round`): cor amarela
- Header (`.todos-page header`): background amarelo via `var(--bg2)`
- Botao adicionar (`.btn-add`): background `var(--blue)` (amarelo primario)
- Input de adicionar tarefa: borda focus amarela via `var(--yellow)`
- Filtro ativo (`.filter-btn.active`): borda inferior amarela
- Checkbox marcado (`.checkbox.checked`): background amarelo via `var(--yellow)`

### Pagina Board (`/board` — se existir rota ativa)
- Header (`.board-header`): background `var(--blue)` (amarelo primario)
- Colunas (`.board-column`): background `var(--bg2)` (amarelo claro)
- Botao de nova card (`.card-new-confirm`): background `var(--blue)` (amarelo primario)
- Botao de adicionar card (`.column-add-card-btn`): hover com borda e texto `var(--blue)`

## Fluxo do Usuario
1. Usuario acessa qualquer pagina do site
2. Sistema exibe a pagina com tema amarelo em todos os elementos visuais: fundo, icones, titulos e componentes interativos
3. Usuario navega entre paginas
4. Elementos mantem tema amarelo consistente em toda a navegacao

## Criterios de Aceitacao
- [ ] Fundo das paginas login e todos/board e amarelo ou variacao de amarelo
- [ ] Botoes primarios (submit, add, confirm) exibem cor amarela como background
- [ ] Cards e inputs usam amarelo como cor primaria de borda ou fundo
- [ ] Icones (Material Icons) exibidos no site sao amarelos
- [ ] Titulos/headings principais de cada pagina sao amarelos
- [ ] Texto sobre fundos amarelos mantem contraste minimo WCAG AA (razao 4.5:1 para texto normal)
- [ ] Visual e consistente entre as paginas login, todos e board

## Escopo Tecnico
- Backend necessario: nao
- Frontend necessario: sim

## Suposicoes
- O projeto ja possui variaveis CSS em `:root` com nomes semanticos (`--blue`, `--bg`, `--text-bright`, etc.) que abstraem a cor primaria — a mudanca deve ser feita nessas variaveis globais, nao em valores hardcoded individuais
- "Amarelo" refere-se a uma paleta coerente com variações de claridade (muito claro para fundos, saturado para acoes, escuro para texto), nao uma unica cor flat
- O texto sobre fundos amarelos usara tom escuro (ex.: amarelo muito escuro / dourado) para garantir contraste
- Nao ha guia de marca ou Figma definido; a tonalidade exata do amarelo e decidida durante implementacao com base no que ja existe no projeto
- A variavel `--blue` e seu uso semantico ja representa a cor de acao primaria — renomear a variavel esta fora do escopo; apenas o valor hex deve ser ajustado se necessario

## Fora do Escopo
- Nao alterar estrutura ou layout das paginas
- Nao adicionar novos componentes
- Nao modificar funcionalidades ou logica de negocio
- Nao criar sistema de temas (dark/light mode)
- Nao renomear variaveis CSS existentes
- Nao alterar codigo backend (`server/index.js`)
