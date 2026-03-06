# US-108 — Tema Visual Amarelo Completo

## Especificação Técnica

### Objetivo
Implementar tema visual completo com paleta de cores amarela em toda a aplicação, alterando o título do site e o ícone.

### Escopo

#### Frontend (Angular)
1. **Cores base amarelas:**
   - Amarelo primário: `#FFD700` (Gold)
   - Amarelo secundário: `#FFC700`
   - Amarelo claro: `#FFED4E`
   - Neutrals mantidos para contraste (branco/cinza)

2. **Componentes afetados:**
   - `AppComponent` — título, layout geral
   - Header/Navbar
   - Cards de tarefas
   - Botões e elementos interativos
   - Backgrounds

3. **Arquivos a modificar:**
   - `frontend/src/styles.scss` — variáveis e estilos globais
   - `frontend/src/app/app.component.html` — título
   - `frontend/src/app/app.component.scss` — estilos do app
   - Componentes específicos que usam cores hardcoded

4. **Título:**
   - Alterar o texto do `<title>` em `index.html` para "Amarelo"
   - Alterar heading/H1 visível para "Amarelo"

5. **Ícone:**
   - Substituir ou modificar `favicon.ico` para incluir amarelo
   - Atualizar referência em `index.html`

#### Backend (Express)
- Sem alterações obrigatórias para tema visual
- Se houver endpoint que retorna config (ex: GET /api/config), adicionar paleta de cores amarela

### Requisitos Não-Funcionais
- Contraste de cores deve manter acessibilidade (WCAG AA)
- Tema deve ser consistente em toda a aplicação
- Mudanças devem ser reversíveis (se necessário)

### Dependências
- Nenhuma dependência externa obrigatória
- Pode usar SCSS variables ou CSS custom properties
