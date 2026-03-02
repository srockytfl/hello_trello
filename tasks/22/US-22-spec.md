# Spec — US-22: Trocar Título para Teste Cores

## Escopo Técnico
Derivado do PRD:
- **Backend necessário:** sim
- **Frontend necessário:** não

## Contratos de API

### GET /api/title
- **Descrição:** Retorna o título da aplicação exibido no componente/página de testes de cores
- **Body:** N/A
- **Resposta 2XX:**
  ```json
  { "title": "Teste Cores" }
  ```
- **Resposta 4XX:** N/A (endpoint não deve falhar)

## Estrutura de Dados (em memória)

```
appTitle = "Teste Cores"
```

A variável `appTitle` no backend (server/index.js) armazena o título da aplicação e é retornada pelo endpoint `/api/title`.

## Componentes Frontend

Nenhum componente novo necessário. O frontend já possui componente(s) que consomem o endpoint `/api/title` e exibem o título obtido. A mudança será refletida automaticamente via resposta do endpoint.

## Fluxo Técnico

1. Frontend faz GET `/api/title` (realizado pelo componente existente)
2. Backend retorna `{ title: "Teste Cores" }`
3. Frontend renderiza o novo título no(s) local(is) onde exibe títulos da aplicação (cabeçalho, document.title, etc.)

## Tratamento de Erros

Não aplicável. Este é um endpoint de leitura simples que não falha.

## Observabilidade Básica

Logs a considerar:
- Nenhum log é obrigatório para esta mudança (é apenas uma mudança de constante)

## Decisões Técnicas

- A mudança é apenas na string `appTitle` no backend
- Nenhuma alteração de lógica, API ou estrutura de dados é necessária
- O endpoint `/api/title` já existe e funciona — apenas o valor retornado muda
- Frontend já consome este endpoint e será atualizado automaticamente

## Critérios Técnicos de Pronto

- [x] Endpoint `/api/title` responde com `{ "title": "Teste Cores" }`
- [x] Título "Teste Cores" é exibido em todos os locais que consomem o endpoint
- [x] Alteração é apenas na variável `appTitle` do server/index.js
- [x] Nenhuma estrutura existente foi alterada ou quebrada

## Suposições Técnicas

- O frontend já possui componente(s) que consomem o endpoint `/api/title` e exibem o título retornado
- O título deve aparecer em locais como: cabeçalho da página (header), aba do navegador (document.title) e qualquer outro lugar que apresente o título
- A mudança é apenas de texto, sem qualquer alteração funcional ou de design

## Dúvidas Técnicas em Aberto

- Nenhuma dúvida técnica em aberto. O PRD é claro e a implementação é direta.

---

**Localização do arquivo a ser modificado:**
- `server/index.js` (linha ~26): Alterar `let appTitle = 'Teste 1';` para `let appTitle = 'Teste Cores';`
