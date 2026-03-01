# US-14 — Trocar Título para "Teste 1" — Implementação Fullstack

## Resumo

Alteração do título da aplicação para **"Teste 1"** em todos os contextos onde é exibido, com suporte a configuração via API.

---

## Backend

### Endpoint criado

| Método | Rota         | Descrição                          |
|--------|--------------|------------------------------------|
| GET    | /api/config  | Retorna configuração da aplicação  |

**Resposta:**
```json
{ "title": "Teste 1" }
```

### Arquivo modificado
- `server/index.js` — adição do objeto `appConfig` e rota `GET /api/config`

---

## Frontend

### Arquivos modificados

| Arquivo                                          | Alteração                                                  |
|--------------------------------------------------|------------------------------------------------------------|
| `frontend/src/index.html`                        | `<title>` alterado de "Hello Github" para "Teste 1"        |
| `frontend/src/app/app.component.ts`              | Injeção de `Title` e `ApiService`; `ngOnInit` busca `/api/config` e aplica o título dinamicamente |
| `frontend/src/app/services/api.service.ts`       | Adição do método `getConfig()` que faz `GET /api/config`   |

### Comportamento
1. O `<title>` estático em `index.html` já exibe "Teste 1" imediatamente (garante persistência no reload).
2. Ao inicializar, `AppComponent.ngOnInit()` consulta `GET /api/config` e usa o serviço `Title` do Angular para reforçar o título dinamicamente.
3. Em caso de falha na API, o fallback mantém "Teste 1" via `error` callback.

---

## Critérios de Aceitação — Verificação

| Critério                                              | Status |
|-------------------------------------------------------|--------|
| Título exibe "Teste 1" após implementação             | ✅     |
| Mudança persiste após refresh/reload                  | ✅     |
| Título atualizado em todos os contextos               | ✅     |
| API retorna configuração de título corretamente       | ✅     |
