# US-123 — Rosa no Site

## Product Requirements Document (PRD)

### 1. Visão Geral

**Título:** Rosa no Site
**Objetivo:** Alterar completamente o esquema de cores da aplicação Hello Trello para rosa, incluindo componentes, título da página e ícone do site.

**Justificativa:** Atualizar a identidade visual da aplicação para uma nova paleta de cores coerente e consistente.

---

### 2. Contexto do Negócio

O Hello Trello é uma aplicação de quadro Kanban que passou por mudanças de identidade visual nos últimos sprints (azul → laranja → marrom). Esta história finaliza a transição para uma identidade visual em **rosa**, estabelecendo uma paleta única e coerente em toda a aplicação.

---

### 3. Personas

- **Usuário Final:** Qualquer pessoa que acessa a aplicação
- **Desenvolvedor Frontend:** Implementa as mudanças de cor
- **Product Owner:** Define a nova paleta de cores

---

### 4. Requisitos Funcionais

### 4.1 Componentes Coloridos
**Como** usuário da aplicação,
**Quero** que todos os componentes da interface estejam em tons de rosa,
**Para** que a aplicação tenha uma identidade visual coerente e moderna.

#### Detalhes:
- Todos os botões, cards, headers, borders e elementos decorativos devem usar rosa
- A paleta deve incluir rosa primária e variações (rosa claro, rosa escuro, rosa pastel)
- Manter contraste adequado para acessibilidade (WCAG AA mínimo)

### 4.2 Título do Site
**Como** usuário que acessa a aplicação no navegador,
**Quero** que o título da aba reflita o tema rosa,
**Para** que a marca seja reconhecida imediatamente.

#### Detalhes:
- Atualizar `<title>` no HTML
- Pode incluir "Rosa", "Pink" ou referência visual ao novo tema

### 4.3 Ícone (Favicon)
**Como** usuário com múltiplas abas do navegador abertas,
**Quero** que o favicon (ícone da aba) seja em tons de rosa,
**Para** que identifique visualmente a aplicação Hello Trello.

#### Detalhes:
- Substituir favicon existente por versão em rosa
- Manter resolução e compatibilidade com navegadores modernos

---

### 5. Critérios de Aceitação

#### AC1: Cores Removidas
- [ ] Nenhum pixel com cor marrom visível na interface
- [ ] Nenhum pixel com cor laranja visível na interface
- [ ] Nenhum elemento retém cor anterior

#### AC2: Componentes em Rosa
- [ ] Botões principais em rosa
- [ ] Cartões (cards) usam tons de rosa
- [ ] Headers e navegação em rosa
- [ ] Borders e linhas decorativas em rosa
- [ ] Ícones e símbolos em tons de rosa

#### AC3: Título e Favicon
- [ ] `<title>` do HTML inclui referência a rosa/novo tema
- [ ] Favicon visível em rosa em navegadores
- [ ] Ícone do site (todos os tamanhos) em rosa

#### AC4: Qualidade de Implementação
- [ ] Zero erros de compilação TypeScript
- [ ] Zero avisos SCSS ignorados
- [ ] Build de produção (`npm run build`) funciona sem falhas
- [ ] Dev server (`npm start`) inicia sem erros
- [ ] Nenhuma regressão de funcionalidade

#### AC5: Acessibilidade
- [ ] Contraste de cores atende WCAG AA para leiturabilidade
- [ ] Elementos interativos claramente distinguíveis

---

### 6. Fora do Escopo

- Alteração de estrutura HTML ou layout
- Mudança de funcionalidades existentes
- Novos componentes ou features
- Alteração de backend ou APIs
- Refatoração de código (exceto para ajuste de cores)
- Documentação ou tutoriais de cores

---

### 7. Paleta de Cores Sugerida

| Uso | Cor | Hex | RGB |
|-----|-----|-----|-----|
| Primária | Rosa Intenso | #E91E63 | rgb(233, 30, 99) |
| Secundária | Rosa Claro | #F48FB1 | rgb(244, 143, 177) |
| Accent | Rosa Escuro | #C2185B | rgb(194, 24, 91) |
| Background Light | Rosa Pastel | #FCE4EC | rgb(252, 228, 236) |

*Nota: A paleta final deve ser definida pelo designer/PO.*

---

### 8. Definição de Pronto (DoD)

- [x] Especificação técnica completa (US-123-spec.md)
- [ ] Implementação concluída no branch `us-123`
- [ ] Todos os AC validados em dev
- [ ] Testes passando (frontend)
- [ ] Code review aprovado
- [ ] Merged em `main`
- [ ] Deploy em produção (Vercel)

---

### 9. Notas

- Esta é a terceira mudança de identidade visual da aplicação (azul → laranja → marrom → rosa)
- Estimar incluir variações de tom para melhor usabilidade (primária, secundária, clara)
- Considerar impacto em testes visuais se existirem

---

### 10. Histórico

| Data | Evento |
|------|--------|
| 2026-03-08 | PRD criado |
| — | Implementação pendente |
