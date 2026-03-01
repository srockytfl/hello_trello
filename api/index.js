let todos = [
  { id: 1, text: 'Estudar Angular', done: false },
  { id: 2, text: 'Criar API com Express', done: true },
  { id: 3, text: 'Fazer deploy do projeto', done: false },
];
let nextId = 4;

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = req.url.replace('/api', '') || '/';
  const method = req.method;

  // GET /api/title
  if (method === 'GET' && url === '/title') {
    return res.json({ title: 'Hello Github' });
  }

  // POST /api/login
  if (method === 'POST' && url === '/login') {
    const { username, password } = req.body || {};
    if (username === 'admin' && password === '123') {
      return res.json({ token: 'fake-token', user: { name: 'Admin' } });
    }
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // GET /api/todos
  if (method === 'GET' && url === '/todos') {
    return res.json(todos);
  }

  // POST /api/todos
  if (method === 'POST' && url === '/todos') {
    const todo = { id: nextId++, text: req.body.text, done: false };
    todos.unshift(todo);
    return res.status(201).json(todo);
  }

  // PUT /api/todos/:id
  const putMatch = url.match(/^\/todos\/(\d+)$/);
  if (method === 'PUT' && putMatch) {
    const todo = todos.find(t => t.id === +putMatch[1]);
    if (!todo) return res.status(404).json({ message: 'Não encontrado' });
    if (req.body.text !== undefined) todo.text = req.body.text;
    if (req.body.done !== undefined) todo.done = req.body.done;
    return res.json(todo);
  }

  // DELETE /api/todos/:id
  const delMatch = url.match(/^\/todos\/(\d+)$/);
  if (method === 'DELETE' && delMatch) {
    todos = todos.filter(t => t.id !== +delMatch[1]);
    return res.json({ ok: true });
  }

  res.status(404).json({ message: 'Not found' });
};
