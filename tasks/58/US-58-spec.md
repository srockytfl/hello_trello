# Spec — US-58: Implementar Novo Layout Conforme Protótipo

## Problema
O usuário utiliza a aplicação TODO List com um layout atual que não corresponde ao design aprovado no protótipo Figma. A experiência visual está desalinhada com os padrões de design estabelecidos para o produto, impactando a percepção de qualidade e usabilidade.

## Objetivo
Redesenhar a interface do TODO List para que corresponda fielmente ao protótipo Figma (node-id=23-740), mantendo todas as funcionalidades existentes intactas.

## Requisitos Funcionais
1. A tela principal de tarefas (rota `/todos`) deve exibir o layout conforme definido no Figma (node-id=23-740).
2. O layout deve respeitar as especificações visuais do Figma: cores, tipografia, espaçamentos, tamanhos de elementos e hierarquia visual.
3. A funcionalidade de **adicionar tarefa** deve permanecer operacional na nova interface.
4. A funcionalidade de **marcar tarefa como concluída/pendente** deve permanecer operacional na nova interface.
5. A funcionalidade de **remover tarefa** deve permanecer operacional na nova interface.
6. Os **filtros de tarefas** (Todas, Pendentes, Concluídas) devem permanecer funcionais, caso presentes no design do Figma; se o Figma não os mostrar, devem ser removidos ou ocultados conforme o design.
7. O layout deve ser responsivo, funcionando corretamente em **mobile** (< 600px), **tablet** (600px–1024px) e **desktop** (> 1024px).
8. Elementos interativos (botões, inputs, checkboxes) devem ser acessíveis via teclado e respeitar convenções de UX.

## Fluxo do Usuário
1. Usuário faz login e é redirecionado para `/todos`.
2. Usuário visualiza a lista de tarefas com o novo layout do Figma.
3. Usuário digita uma nova tarefa no campo de input e pressiona Enter ou clica no botão de adicionar.
4. A nova tarefa aparece na lista com o visual do Figma.
5. Usuário clica no checkbox/botão de conclusão de uma tarefa para alternar seu estado.
6. Usuário clica no botão de exclusão para remover uma tarefa.
7. Em qualquer resolução (mobile, tablet, desktop), o layout se adapta de forma coerente ao design.

## Critérios de Aceitação
- [ ] A página `/todos` exibe o layout idêntico ao design do Figma (node-id=23-740) em desktop.
- [ ] A página `/todos` é responsiva e o layout se adapta corretamente em mobile e tablet.
- [ ] As cores, tipografia e espaçamentos correspondem às especificações do Figma.
- [ ] É possível adicionar uma tarefa nova e ela aparece na lista sem recarregar a página.
- [ ] É possível marcar/desmarcar uma tarefa como concluída.
- [ ] É possível remover uma tarefa da lista.
- [ ] O estado vazio (sem tarefas) possui representação visual adequada, conforme Figma.
- [ ] Não há regressão nas funcionalidades existentes (CRUD de tarefas continua funcionando).
- [ ] Os endpoints da API (`/api/todos`, `/api/title`, etc.) continuam funcionando sem alteração.

## Escopo Técnico
- Backend necessário: **não** (API existente permanece sem alteração)
- Frontend necessário: **sim** (redesign do componente de todos e estilos relacionados)

## Referência Visual (Figma)
https://www.figma.com/design/ik0Qa30O9oNUy3qelJbQO7/Ferramenta-Trello?node-id=23-740&t=YziyyYYWYX7nQbUA-0

O agente Execute **DEVE** usar esta URL com a ferramenta `mcp__figma__get_design_context` para obter o design e implementar o frontend de acordo.

## Suposições
- O node-id `23-740` do Figma corresponde à tela principal de lista de tarefas (`/todos`).
- As demais telas (login, profile) **não** precisam ser alteradas nesta US.
- O layout atual de `todos.component.ts` será substituído pelo novo design do Figma; o código TypeScript de lógica (signals, services, filtros) pode ser aproveitado.
- Caso o Figma apresente componentes que já existem no projeto (sidebar, footer, user-avatar), eles devem ser integrados ao novo layout conforme o design, sem ser recriados do zero.
- A paleta de variáveis CSS globais existente no projeto (`--blue`, `--green`, `--bg`, etc.) pode ser reutilizada se compatível com o design; caso contrário, novas variáveis ou overrides de estilo serão necessários.

## Fora do Escopo
- Alteração de qualquer endpoint da API backend.
- Mudança nas rotas de navegação frontend.
- Redesign das páginas de login (`/login`) e perfil (`/profile`).
- Implementação de novas funcionalidades além do redesign visual (ex: drag-and-drop, categorias, etc.).
- Alteração da estrutura de dados dos todos (campos `id`, `text`, `done`).
