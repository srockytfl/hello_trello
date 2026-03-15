# US-144 — Azul

## Contexto
O site necessita de uma identidade visual coesa com tema azul. A aplicação deve refletir essa paleta de cores em todos os elementos visuais, incluindo a página do navegador.

## História
Como usuário,
quero que a aplicação tenha uma identidade visual azul coerente,
para que o site seja visualmente consistente e profissional.

## Critérios de Aceitação
1. Todas as cores de fundo dos componentes devem ser variações de azul (claro, médio ou escuro conforme apropriado)
2. O título da aba do navegador (page title) deve exibir "Azul"
3. O favicon (ícone do site) deve ser em tom azul
4. A paleta de cores azul deve ser aplicada de forma consistente em toda a aplicação
5. O design visual deve manter legibilidade e contraste apropriados

## Regras Técnicas
- Seguir convenções do CLAUDE.md
- Utilizar variáveis CSS/SCSS para a paleta de cores azul
- Manter a estrutura de componentes existentes (sem over-engineering)
- Atualizar arquivo global `frontend/src/styles.scss` com nova paleta
- Favicon deve ser gerado/atualizado em `frontend/public/` ou equivalente
- Page title deve ser atualizado no arquivo `frontend/index.html` ou via React

## Critérios de Teste (QA)

### Visual/UI:
- Verificar se todos os elementos de fundo utilizam tons de azul
- Validar legibilidade de textos sobre fundos azuis (contraste WCAG)
- Confirmar consistência visual em diferentes páginas/componentes

### Navegador:
- Aba do navegador exibe "Azul" como título
- Favicon azul é exibido corretamente na aba

### Responsividade:
- Layout com tema azul mantém responsividade em mobile/tablet/desktop

## Fora do Escopo
- Alterar tipografia ou fontes
- Modificar estrutura de layout dos componentes
- Adicionar novos componentes ou funcionalidades
