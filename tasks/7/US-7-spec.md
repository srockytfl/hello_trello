# Spec — US-7: Trocar cor para amarelo

## Problema
A interface atualmente utiliza azul como cor de destaque primária (botões de ação, checkbox marcado, filtro ativo, ícone do logo). O usuário não consegue identificar visualmente qual é o elemento de destaque pois a cor não comunica a intenção desejada.

## Objetivo
Substituir a cor de destaque primária da interface (atualmente azul) pela cor amarela (`--yellow: #FACC15`), tornando os elementos interativos mais visíveis e consistentes com a nova identidade visual.

## Requisitos Funcionais
1. O botão "Adicionar" tarefa deve exibir a cor amarela como cor de fundo.
2. O checkbox de tarefa concluída deve exibir a cor amarela quando marcado.
3. O filtro de lista ativo deve exibir a cor amarela no indicador de seleção (borda inferior).
4. O ícone do logo no cabeçalho deve exibir a cor amarela.
5. O campo de input em foco deve exibir borda na cor amarela.
6. O botão "Entrar" na tela de login deve exibir a cor amarela como cor de fundo.
7. A cor amarela aplicada deve respeitar contraste mínimo WCAG AA (4.5:1 para texto sobre fundo amarelo, 3:1 para elementos gráficos).

## Fluxo do Usuário
1. Usuário acessa a tela de login (`/login`).
2. Usuário visualiza o botão "Entrar" na cor amarela.
3. Usuário faz login e acessa a lista de tarefas (`/todos`).
4. Usuário visualiza o cabeçalho com ícone amarelo, o botão "Adicionar" em amarelo e o filtro ativo com indicador amarelo.
5. Usuário marca uma tarefa como concluída e o checkbox exibe cor amarela.
6. Usuário clica em um campo de input e vê borda amarela no foco.

## Criterios de Aceitacao
- [ ] Botão "Adicionar" renderiza com fundo amarelo (`--yellow`) em vez de azul.
- [ ] Checkbox marcado exibe fundo e borda amarelos.
- [ ] Filtro ativo (Todas/Pendentes/Concluídas) exibe borda inferior amarela.
- [ ] Ícone do logo (`check_circle`) exibe cor amarela.
- [ ] Input em foco exibe `border-color` amarela.
- [ ] Botão "Entrar" na tela de login exibe fundo amarelo.
- [ ] Texto sobre fundo amarelo é legível (cor de texto escura para garantir contraste).
- [ ] A aparência é consistente nos navegadores Chrome, Firefox e Safari.
- [ ] Nenhum outro elemento visual é alterado além dos listados acima.

## Escopo Tecnico
- Backend necessario: **nao**
- Frontend necessario: **sim**

## Suposicoes
- "O elemento visual" mencionado na issue refere-se à **cor de destaque primária** (primary accent color) da interface, atualmente azul (`--blue: #3B82F6`), que é usada nos botões de ação, checkbox ativo, filtro ativo e ícone do logo.
- A variável CSS `--yellow: #FACC15` já está definida em `frontend/src/styles.scss` e deve ser reutilizada — sem criar nova variável de cor.
- O texto dentro do botão amarelo deve usar cor escura (ex: preto ou cinza escuro) para garantir contraste adequado, pois `#FACC15` é uma cor clara.
- O `dot-pending` (indicador de tarefas pendentes no stats do header) já usa `--yellow` e não precisa ser alterado.

## Fora do Escopo
- Alteração da cor de fundo, cards ou estrutura de layout.
- Criação de tema escuro/claro (dark/light mode toggle).
- Alteração de cores de estado como vermelho (erro/deletar) e verde (concluídas no stats).
- Mudanças em comportamento funcional (lógica de adicionar, editar, deletar tarefas).
- Alterações no backend.
