# Spec — US-1: Trocar Cor para Azul

## Problema
O componente primário da aplicação exibe atualmente uma cor que não está alinhada com o design system esperado (atualmente verde, conforme aplicado na US-6). O usuário percebe inconsistência visual ao interagir com botões, ícones e elementos de destaque da aplicação.

## Objetivo
Atualizar a cor primária da aplicação para azul, garantindo consistência visual com o design system sem quebrar funcionalidades existentes.

## Requisitos Funcionais
1. A cor primária da aplicação deve ser alterada para azul.
2. Todos os elementos que utilizam a cor primária (botões de ação, ícones de destaque, bordas de foco e indicadores ativos) devem ser exibidos em azul.
3. A cor azul deve ser definida via variáveis CSS ou constantes centralizadas do design system — sem inline styles.
4. Devem existir variações de tom para os estados normal e hover/active do elemento primário.

## Fluxo do Usuário
1. Usuário acessa qualquer página da aplicação (login, tarefas, perfil).
2. Usuário visualiza botões, ícones e elementos primários destacados.
3. Sistema exibe esses elementos na cor azul, consistente com o design system.
4. Ao passar o cursor ou clicar em elementos primários, o sistema responde com a variação de tom mais escura do azul.

## Critérios de Aceitação
- [ ] Elementos primários (botões de ação, ícones de destaque, checkboxes, indicadores de foco) são exibidos em azul.
- [ ] A cor azul é consistente em toda a aplicação — não há mistura com a cor anterior.
- [ ] O estado de hover e active dos elementos primários utiliza um tom mais escuro do azul.
- [ ] Nenhuma funcionalidade existente é quebrada pela mudança de cor.
- [ ] A aplicação renderiza corretamente nos navegadores Chrome, Firefox e Safari.
- [ ] A aplicação renderiza corretamente em diferentes resoluções de tela.

## Escopo Técnico
- Backend necessário: não
- Frontend necessário: sim

## Suposições
- "Azul" refere-se a um tom de azul adequado para fundo escuro (dark background), com contraste suficiente para acessibilidade (WCAG AA).
- O valor hexadecimal exato será decidido na etapa de Plan, respeitando os padrões de design do projeto.
- A variável CSS `--blue` (e a constante correspondente em `colors.ts`) é o ponto central de definição da cor primária — ambas devem ser atualizadas.
- A variável `--blue-dark` representa a variação de hover/active e também deve ser atualizada para um tom mais escuro do novo azul.

## Fora do Escopo
- Refatoração de componentes ou reestruturação de estilos.
- Mudanças em elementos que não usam a cor primária.
- Implementação de temas (dark mode, modo claro, múltiplos temas).
- Alteração de cores de background, texto ou elementos secundários.
