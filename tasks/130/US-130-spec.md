# US-130 — Nova tela de Login

## Contexto

A aplicação precisa de uma nova tela de login implementada conforme especificações de design no Figma. Essa tela deve substituir a interface de login atual e seguir os padrões visuais definidos no layout.

## História de Usuário

Como um usuário,
quero fazer login através de uma nova tela redesenhada,
para acessar a aplicação com uma interface moderna e intuitiva.

## Critérios de Aceitação

1. A tela de login deve ser renderizada conforme o layout especificado no Figma (node-id: 48-721)
2. O formulário deve permitir entrada de e-mail e senha
3. Deve existir botão "Entrar" que realiza o login via backend
4. Deve exibir mensagens de erro quando as credenciais forem inválidas
5. A página deve ser responsiva e funcionar em dispositivos mobile
6. Deve ter links ou opções para "Esqueci minha senha" (se no layout)
7. Deve ter transição suave para a dashboard após login bem-sucedido

## Critérios de Teste

### API
- `POST /login` com e-mail e senha válidos retorna token/sessão com HTTP 200
- `POST /login` com credenciais inválidas retorna erro com HTTP 401
- Validação básica de formato de e-mail no backend

### E2E
- Campo de e-mail aceita entrada do usuário
- Campo de senha aceita entrada do usuário
- Clique em "Entrar" dispara requisição ao backend
- Mensagem de erro exibida para login falho
- Login bem-sucedido redireciona para dashboard
- Layout responsivo em viewports mobile (320px, 768px, 1024px+)

## Referência Visual (Figma)

https://www.figma.com/design/ik0Qa30O9oNUy3qelJbQO7/Ferramenta-Trello?node-id=48-721

## Fora do Escopo

- Implementar "Recuperação de Senha" (se não estiver no layout)
- Autenticação via redes sociais (a menos que no design)
- Two-factor authentication
- Sistema de registro de novo usuário (trata-se apenas da tela de login)
