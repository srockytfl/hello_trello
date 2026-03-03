# Plan — US-58: Implementar Novo Layout Conforme Protótipo

## Escopo Técnico
Derivado da Spec:
- Backend necessário: **não** (API existente permanece sem alteração)
- Frontend necessário: **sim** (redesign do componente de todos e estilos inline)

---

## Contratos de API

Nenhum endpoint novo ou alterado. Os contratos existentes permanecem intactos:

### GET /api/todos
- **Descrição:** Retorna lista de todos do usuário autenticado
- **Body:** N/A
- **Resposta 200:** `[{ id: number, text: string, done: boolean }]`

### POST /api/todos
- **Descrição:** Cria nova tarefa
- **Body:** `{ text: string }`
- **Resposta 201:** `{ id: number, text: string, done: boolean }`
- **Resposta 400:** `{ error: "Texto obrigatório" }`

### PUT /api/todos/:id
- **Descrição:** Atualiza texto ou status de conclusão de uma tarefa
- **Body:** `{ text?: string, done?: boolean }`
- **Resposta 200:** `{ id: number, text: string, done: boolean }`
- **Resposta 404:** `{ error: "Not found" }`

### DELETE /api/todos/:id
- **Descrição:** Remove uma tarefa
- **Body:** N/A
- **Resposta 200:** `{ ok: true }`
- **Resposta 404:** `{ error: "Not found" }`

---

## Estrutura de Dados

Nenhuma alteração no modelo de dados. O objeto `Todo` mantém a estrutura existente:

```
Todo {
  id: number
  text: string
  done: boolean
}
```

---

## Componentes Frontend

### TodosComponent (modificar)
- **Rota:** `/todos`
- **Arquivo:** `frontend/src/app/pages/todos/todos.component.ts`
- **Descrição:** Redesenhar o template inline e os estilos inline para refletir fielmente o design do Figma (node-id=23-740), mantendo toda a lógica TypeScript existente intacta.
- **Lógica preservada:**
  - Signals: `todos`, `filter`, `newText`
  - Computed: `filtered()`, `pendingCount()`, `doneCount()`
  - Métodos: `load()`, `add()`, `toggle()`, `remove()`, `getCount()`, `emptyTitle()`, `emptyMessage()`
  - Serviços injetados: `ApiService`, `TitleService`, `UserAvatarComponent`
- **Elementos visuais a atualizar conforme Figma:**
  - Cabeçalho / hero da tela (título, subtítulo, estatísticas)
  - Campo de input para nova tarefa + botão de adicionar
  - Barra de filtros (Todas / Pendentes / Concluídas) — manter ou adaptar conforme Figma
  - Cards/itens de tarefa (checkbox, texto, badge de status, botão excluir)
  - Estado vazio (empty state) com visual do Figma
  - Barra de progresso (se presente no Figma)
  - Responsividade: mobile (< 600px), tablet (600–1024px), desktop (> 1024px)
- **Variáveis CSS:** Reutilizar variáveis globais de `styles.scss` (`--blue`, `--green`, `--bg`, `--bg2`, `--bg3`, `--text-bright`, `--muted`, `--red`, etc.) onde compatíveis com o Figma; adicionar variáveis locais no componente se o Figma exigir valores diferentes.
- **Serviço:** `services/api.service.ts` (sem alteração)

---

## Fluxo Técnico

1. Usuário acessa `/todos` após login.
2. `TodosComponent.ngOnInit()` chama `load()` → `ApiService.getTodos()` → GET /api/todos.
3. Backend retorna array de todos; signal `todos` é atualizado.
4. Template renderiza a lista com o novo visual do Figma.
5. Usuário digita no input e pressiona Enter ou clica "Adicionar" → `add()` → POST /api/todos → lista atualizada.
6. Usuário clica no checkbox → `toggle()` → PUT /api/todos/:id → estado visual atualizado.
7. Usuário clica em excluir → `remove()` → DELETE /api/todos/:id → item removido da lista.
8. Filtros atualizam o computed `filtered()` localmente, sem chamada extra à API.
9. Se lista filtrada estiver vazia, exibe empty state visual do Figma.

---

## Arquivos a Modificar/Criar

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `frontend/src/app/pages/todos/todos.component.ts` | **Modificar** | Substituir template inline e styles inline pelo novo design do Figma; preservar toda lógica TypeScript |
| `frontend/src/styles.scss` | **Modificar (se necessário)** | Adicionar novas variáveis CSS globais caso o Figma exija cores/valores não presentes |

> **Nenhum outro arquivo** precisa ser criado ou alterado. O backend, as rotas Angular, os serviços e os demais componentes (sidebar, footer, user-avatar, login, profile) permanecem intactos.

---

## Referência Visual (Figma)

https://www.figma.com/design/ik0Qa30O9oNUy3qelJbQO7/Ferramenta-Trello?node-id=23-740&t=YziyyYYWYX7nQbUA-0

O agente Execute **DEVE** usar esta URL com a ferramenta `mcp__figma__get_design_context` para obter o design e implementar o frontend de acordo.

---

## Critérios Técnicos de Pronto
- [ ] Template e estilos do `TodosComponent` refletem fielmente o design do Figma (node-id=23-740) em desktop
- [ ] Layout responsivo funciona corretamente em mobile (< 600px), tablet (600–1024px) e desktop (> 1024px)
- [ ] Cores, tipografia e espaçamentos correspondem às especificações do Figma
- [ ] Funcionalidade de adicionar tarefa operacional no novo layout
- [ ] Funcionalidade de marcar/desmarcar tarefa como concluída operacional
- [ ] Funcionalidade de remover tarefa operacional
- [ ] Estado vazio (sem tarefas) possui representação visual adequada conforme Figma
- [ ] Filtros (Todas / Pendentes / Concluídas) funcionam conforme design do Figma
- [ ] Endpoints da API continuam funcionando sem alteração
- [ ] Lógica TypeScript existente (signals, computed, métodos CRUD) preservada sem regressões
- [ ] Elementos interativos acessíveis via teclado
