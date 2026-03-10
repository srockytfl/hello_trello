# US-128 — Nova tela de login

## CONTEXTO

A aplicação precisa de uma tela de login seguindo o design definido no Figma. Esta tela será o ponto de entrada para autenticação de usuários na plataforma Trello Clone.

## HISTÓRIA

Como usuário,
quero acessar uma tela de login conforme o design do Figma,
para autenticar-me na aplicação de forma clara e intuitiva.

## CRITÉRIOS DE ACEITAÇÃO

1. A tela de login deve seguir exatamente o layout definido no Figma (node-id: 48-721)
2. Deve conter campos para email/username e senha
3. Deve ter um botão "Entrar" com estados (normal, hover, disabled)
4. Deve exibir mensagens de erro quando credenciais forem inválidas
5. Deve ser responsivo em dispositivos móveis e desktop
6. Deve integrar com o backend para validação de credenciais
7. Após login bem-sucedido, deve redirecionar para a página principal
8. Deve persistir o estado de autenticação em sessão/token

## CRITÉRIOS DE TESTE (QA)

### E2E:
- Usuário pode preencher email e senha e submeter o formulário
- Sistema exibe erro ao submeter credenciais inválidas
- Sistema redireciona para página principal ao submeter credenciais válidas
- Formulário mantém valores ao focar em diferentes campos
- Layout é responsivo em telas de diferentes tamanhos

### API:
- Endpoint POST `/auth/login` retorna token e dados do usuário em caso de sucesso
- Endpoint retorna erro 401 quando credenciais são inválidas
- Endpoint valida presença de email e senha antes de processar

## REGRAS TÉCNICAS

- Seguir convenções do CLAUDE.md — React functional components com hooks
- Componente React em `frontend/src/pages/login/`
- Usar React Router para navegação pós-login
- Backend em `server/index.js` ou rota dedicada
- TypeScript obrigatório no frontend
- Styling com SASS/SCSS
- Sem over-engineering — implementar o mínimo viável conforme design
- Validação de entrada apenas campos obrigatórios

## REFERÊNCIA VISUAL (FIGMA)

[https://www.figma.com/design/ik0Qa30O9oNUy3qelJbQO7/Ferramenta-Trello?node-id=48-721](https://www.figma.com/design/ik0Qa30O9oNUy3qelJbQO7/Ferramenta-Trello?node-id=48-721)

## FORA DO ESCOPO

- Recuperação de senha (será US separada)
- Autenticação com provedores terceiros (Google, GitHub, etc.)
- Implementação de captcha
- Rate limiting no login (será tratado em hardening de segurança)
