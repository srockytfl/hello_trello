const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- Users in memory ---
let users = [
  { name: 'Admin', username: 'admin', password: '123' },
];

// --- Fake data in memory ---
let todos = [
  { id: 1, text: 'Estudar React', done: false, status: 'todo' },
  { id: 2, text: 'Criar API com Express', done: true, status: 'done' },
  { id: 3, text: 'Fazer deploy do projeto', done: false, status: 'todo' },
  { id: 4, text: 'Revisar Pull Requests', done: false, status: 'doing' },
  { id: 5, text: 'Escrever testes unitários', done: false, status: 'doing' },
];
let nextId = 6;

// --- Auth ---
app.post('/api/login', (req, res) => {
  const { username, email, password } = req.body;
  const identifier = username || email;
  if (!identifier || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
  }
  const user = users.find(u => u.username === identifier && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  res.json({ token: 'fake-token', user: { name: user.name, username: user.username } });
});

app.post('/api/register', (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ message: 'Nome, usuário e senha são obrigatórios' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'Usuário já cadastrado' });
  }
  const newUser = { name: name.trim(), username: username.trim(), password };
  users.push(newUser);
  res.status(201).json({ token: 'fake-token', user: { name: newUser.name, username: newUser.username } });
});

// --- Profile ---
app.patch('/api/profile', (req, res) => {
  const { name, username } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Nome é obrigatório' });
  }
  const user = { name: name.trim(), username: username || 'admin' };
  res.json({ user });
});

// --- Todos CRUD ---
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const status = req.body.status || 'todo';
  const todo = { id: nextId++, text: req.body.text, done: false, status };
  todos.unshift(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === +req.params.id);
  if (!todo) return res.status(404).json({ message: 'Não encontrado' });
  if (req.body.text !== undefined) todo.text = req.body.text;
  if (req.body.done !== undefined) todo.done = req.body.done;
  if (req.body.status !== undefined) {
    todo.status = req.body.status;
    if (req.body.status === 'done') todo.done = true;
    else todo.done = false;
  }
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
