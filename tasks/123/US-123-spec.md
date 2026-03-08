# US-123 — Rosa no Site

## Especificação Técnica (O QUE)

### Objetivo
Alterar o esquema de cores do site de marrom/laranja para rosa em todos os componentes, título e ícone da aplicação.

### Requisitos Funcionais

#### 1. Alteração de Cores dos Componentes
- Todos os componentes Angular devem utilizar paleta de cores rosa
- Remover completamente cores anteriores (marrom, laranja)
- Garantir consistência de tons rosa em toda a interface

#### 2. Alteração do Título do Site
- Atualizar o atributo `<title>` no `index.html`
- Incorporar "Rosa" ou tema rosa na descrição do site se aplicável
- Manter a estrutura existente, apenas alterando conteúdo relacionado a cores

#### 3. Atualização do Ícone (Favicon)
- Substituir ou recolorir o favicon existente para tom rosa
- Garantir que o arquivo `favicon.ico` ou equivalente esteja em tom rosa
- Atualizar referências no `index.html` se necessário

### Escopo Técnico

#### Frontend (Angular)
- **Arquivos de Estilo**
  - Variáveis SCSS em `src/styles.scss` ou arquivos de tema
  - Cores primárias: rosa (ex: #E91E63, #FF1493, ou tom similar)
  - Cores secundárias: tons de rosa complementares

- **Componentes Afetados**
  - Todos os componentes em `src/app/`
  - Estilos inline em componentes
  - Folhas de estilo do Angular Material (se aplicável)

- **Assets**
  - `src/assets/` — atualizar favicon
  - Imagens com referência a cores anteriores

#### Backend (Express)
- Sem alterações necessárias (mudança visual apenas)

### Restrições
- Nenhuma outra cor deve estar visível na interface
- Deve manter 100% de compatibilidade com funcionalidades existentes
- Nenhuma mudança de comportamento ou lógica

### Validação Técnica
- Nenhum erro de compilação TypeScript
- Nenhum aviso SCSS não resolvido
- Build de produção sem falhas: `cd frontend && npm run build`
- Dev server inicia sem erros: `cd frontend && npm start`

### Impacto Estimado
- **Complexidade:** Baixa
- **Arquivos Afetados:** 5-15 arquivos (estilos + assets)
- **Tempo Estimado:** 30-45 minutos
- **Risco:** Muito baixo

### Critérios de Aceitação
1. Todo componente visual usa apenas tons de rosa
2. Título do site reflete o tema rosa
3. Favicon/ícone está em tom rosa
4. Nenhuma cor anterior (marrom/laranja) visível
5. Build de produção funciona sem erros
6. Todas as funcionalidades mantêm-se íntegras
