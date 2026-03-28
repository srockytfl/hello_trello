# US-148 — Fix Footer

## Contexto

O footer atual da aplicação exibe um texto genérico "hello trello" que não fornece informações úteis aos usuários. A data é uma informação relevante que deveria estar presente no footer para melhor contextualização temporal.

## História de Usuário

Como usuário da aplicação,
quero ver a data atual no footer,
para estar ciente de quando a página foi acessada/está sendo visualizada.

## Critérios de Aceitação

1. O footer deve exibir a data atual (formato: DD/MM/YYYY ou equivalente legível)
2. O texto "hello trello" deve ser removido do footer
3. O footer deve ser mantido no rodapé da página em todos os componentes
4. A data deve ser atualizada dinamicamente (refletir a data do sistema)
5. O layout e estilo do footer devem estar consistentes com o design da aplicação

## Regras Técnicas

- Usar React hooks (useState/useEffect) para obter a data atual
- Formatar a data com biblioteca padrão (Date ou date-fns se disponível)
- Manter componente footer reutilizável em `frontend/src/components/` ou `frontend/src/pages/`
- Seguir convenções Sass definidas em CLAUDE.md
- Sem over-engineering: solução simples e direta

## Critérios de Teste (QA)

**E2E:**
- Verificar que o footer exibe a data atual ao carregar a página
- Confirmar que o texto "hello trello" foi removido do footer
- Validar que a data está em formato legível

**API:**
- N/A (mudança apenas de frontend/UI)

## Fora do Escopo

- Mudanças em endpoints da API
- Alterações em estrutura de dados do banco
- Implementação de timezones múltiplos
- Lógica de persistência de data
