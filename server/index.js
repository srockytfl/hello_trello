const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- Fake data in memory ---
let todos = [
  { id: 1, text: 'Estudar React', done: false },
  { id: 2, text: 'Criar API com Express', done: true },
  { id: 3, text: 'Fazer deploy do projeto', done: false },
];
let nextId = 4;

// --- Auth ---
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

// --- Todos CRUD ---
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const todo = { id: nextId++, text: req.body.text, done: false };
  todos.unshift(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === +req.params.id);
  if (!todo) return res.status(404).json({ message: 'Não encontrado' });
  if (req.body.text !== undefined) todo.text = req.body.text;
  if (req.body.done !== undefined) todo.done = req.body.done;
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== +req.params.id);
  res.json({ ok: true });
});

// Serve React build
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));
