# Spec — US-6: Trocar cor para verde

## Problema
A interface atual utiliza rosa/pink como cor primária de ação (`#FF69B4`, introduzida na US-10), o que não está alinhado com a identidade visual da marca.
O usuário espera uma paleta predominantemente verde para botões, destaques e elementos interativos.

## Objetivo
Substituir a cor primária de ação da interface (atualmente rosa) por verde, garantindo contraste adequado e coerência visual em todos os componentes da aplicação.

## Requisitos Funcionais
1. A cor de fundo principal deve ser verde escuro (tom próximo a `#22c55e` ou compatível com o tema dark atual).
2. A cor primária de ação — usada em botões principais, links e destaques — deve ser verde (`#16a34a` ou similar).
3. O estado hover/active dos elementos primários deve usar um tom de verde mais escuro (ex: `#15803d`).
4. As cores de texto devem manter contraste suficiente (WCAG AA) sobre os fundos verdes.
5. Todos os componentes existentes (login, todos, profile, footer, user-avatar) devem respeitar a nova paleta sem quebra visual.

## Fluxo do Usuário
1. Usuário acessa qualquer página da aplicação (login, todos, profile).
2. O usuário visualiza a interface com esquema de cores predominantemente verde.
3. Botões, links e elementos de destaque aparecem em verde.
4. Ao passar o mouse sobre elementos interativos, o verde escurece (feedback de hover).
5. Textos permanecem legíveis sobre todos os fundos.

## Critérios de Aceitação
- [ ] A cor de fundo principal (`--bg`) é um tom verde escuro visível (ex: `#0A1A0A` já é verde-escuro, mas `--blue` deve ser verde, não rosa).
- [ ] A variável `--blue` (cor primária de ação) exibe verde (`#22c55e` ou similar) e não mais rosa.
- [ ] A variável `--blue-dark` (hover/active) exibe verde mais escuro (`#16a34a` ou similar).
- [ ] Botões na página de login exibem cor verde.
- [ ] Botões e elementos de ação na página de todos exibem cor verde.
- [ ] Nenhum elemento da interface exibe rosa/pink como cor primária.
- [ ] Contraste texto/fundo atende nível WCAG AA em todos os componentes.
- [ ] A interface é responsiva com a nova paleta (mobile e desktop).

## Escopo Técnico
- Backend necessário: **não** (mudança puramente visual)
- Frontend necessário: **sim** (alteração de variáveis CSS/SCSS globais e/ou por componente)

## Suposições
- A mudança deve ser feita nas variáveis CSS globais em `frontend/src/styles.scss`, centralizando a alteração.
- As variáveis `--blue` e `--blue-dark` são as responsáveis pela cor primária de ação em toda a aplicação; substituí-las é suficiente para cobrir a maioria dos componentes.
- Os fundos dark-green já existentes (`--bg`, `--bg2`, `--bg3`, `--card`, `--hover`, `--border`) já estão alinhados com o tema verde e não precisam ser alterados.
- Não há requisito de tema claro (light mode); apenas o tema escuro (dark) está em uso.

## Fora do Escopo
- Alteração de estrutura HTML ou templates Angular.
- Implementação de troca dinâmica de temas.
- Personalização de cores por usuário.
- Mudança nas cores semânticas (`--red`, `--yellow`, `--green` de status).
- Alterações no backend ou na API.
