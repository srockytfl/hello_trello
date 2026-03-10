# US-128 — Nova Tela de Login

## Contexto

O sistema possui uma tela de login básica que utiliza campos de `username` e `password`. A nova tela de login deve usar `email` e `password`, com validação client-side, estados de erro claros e acessibilidade adequada.

## História de Usuário

**Como** usuário do sistema,
**Quero** acessar a aplicação com meu e-mail e senha,
**Para** ter autenticação mais segura e padronizada.

## Critérios de Aceitação

1. O formulário deve ter campos de **e-mail** e **senha**
2. Validação client-side:
   - E-mail é obrigatório e deve ter formato válido (x@y.z)
   - Senha é obrigatória e deve ter ao menos 3 caracteres
3. Erros de validação devem aparecer inline abaixo do campo correspondente
4. Erro 401 da API deve exibir mensagem "E-mail ou senha inválidos"
5. Erro de rede deve exibir mensagem "Erro de conexão. Tente novamente."
6. Botão de submit deve mostrar estado de loading (disabled + texto "Entrando...")
7. Acessibilidade: labels associados via `htmlFor`, `aria-invalid`, `aria-describedby`, `role="alert"`
8. O componente reside em `frontend/src/pages/login/LoginPage.tsx`
9. Estilos em `frontend/src/pages/login/login.scss`

## Critérios de Teste

- [ ] Campo e-mail vazio → erro "E-mail é obrigatório"
- [ ] E-mail inválido (sem @) → erro "E-mail inválido"
- [ ] Senha vazia → erro "Senha é obrigatória"
- [ ] Senha muito curta → erro "Senha deve ter ao menos 3 caracteres"
- [ ] Credenciais corretas → navega para /todos
- [ ] Credenciais incorretas → erro "E-mail ou senha inválidos"
- [ ] Durante loading → botão desabilitado com texto "Entrando..."
- [ ] Usuário já logado → redireciona automaticamente para /todos
