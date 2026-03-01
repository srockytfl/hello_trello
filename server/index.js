const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- Fake data in memory ---
let todos = [
  { id: 1, text: 'Estudar Angular', done: false },
  { id: 2, text: 'Criar API com Express', done: true },
  { id: 3, text: 'Fazer deploy do projeto', done: false },
];
let nextId = 4;

// --- Title ---
let appTitle = 'Teste 1';

app.get('/api/title', (req, res) => {
  res.json({ title: appTitle });
});

// --- Auth ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123') {
    return res.json({ token: 'fake-token', user: { name: 'Admin' } });
  }
  res.status(401).json({ message: 'Credenciais inválidas' });
});

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

// Serve Angular build
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist', 'frontend', 'browser')));
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'frontend', 'browser', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));
