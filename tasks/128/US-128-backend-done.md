# US-128 — Backend Done

## Status: CONCLUIDO

## O que foi verificado

O endpoint `POST /api/login` já estava implementado em `server/index.js`. A implementação foi analisada e está completa e alinhada com os requisitos da US-128.

## Endpoint implementado

### POST /api/login
- **Arquivo:** `server/index.js`
- **Alias:** `POST /auth/login` (também registrado)

### Comportamento

**Sucesso (200 OK)**
```json
POST /api/login
{ "email": "admin@example.com", "password": "123" }

Resposta:
{
  "token": "fake-token-1",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com",
    "username": "admin"
  }
}
```

**Erro de validação (400 Bad Request)**
```json
POST /api/login
{ "password": "123" }

Resposta:
{ "message": "Email/usuário e senha são obrigatórios" }
```

**Credenciais inválidas (401 Unauthorized)**
```json
POST /api/login
{ "email": "admin@example.com", "password": "errada" }

Resposta:
{ "message": "Credenciais inválidas" }
```

## Implementação existente

A lógica do handler em `server/index.js` (linhas 17-41):

```js
const USERS = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: '123', name: 'Admin' },
];

function authHandler(req, res) {
  const { username, email, password } = req.body;
  if (!password || (!username && !email)) {
    return res.status(400).json({ message: 'Email/usuário e senha são obrigatórios' });
  }
  const user = USERS.find(u =>
    (username && u.username === username) ||
    (email && u.email === email)
  );
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  return res.json({
    token: 'fake-token-' + user.id,
    user: { id: user.id, name: user.name, email: user.email, username: user.username },
  });
}

app.post('/api/login', authHandler);
app.post('/auth/login', authHandler);
```

## Criterios de aceitacao atendidos

- Aceita email OU username como identificador
- Valida presenca dos campos obrigatorios (retorna 400)
- Retorna 401 para credenciais invalidas
- Retorna token e dados do usuario em caso de sucesso
- Registrado em duas rotas: `/api/login` e `/auth/login`

## Credenciais de teste

| Campo    | Valor               |
|----------|---------------------|
| username | admin               |
| email    | admin@example.com   |
| password | 123                 |

## Arquivos modificados

- Nenhum arquivo modificado — endpoint ja estava corretamente implementado.
