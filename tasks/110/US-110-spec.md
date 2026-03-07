# US-110: Azul - Especificação Técnica

## O QUE (Escopo)

Implementar mudança de tema visual da aplicação Hello Trello para um esquema de cores baseado em azul.

### Requisitos Funcionais

1. **Paleta de Cores**
   - Alterar todas as cores da interface para tons de azul
   - Fundo principal: azul
   - Componentes: azul
   - Texto e elementos: ajustar para manter contraste e legibilidade

2. **Título da Aplicação**
   - Alterar o título do site (no HTML e exibição) para "Azul"

3. **Ícone**
   - Adicionar destaque em amarelo ao ícone da aplicação
   - Manter identificabilidade visual

## Componentes Afetados

### Frontend (Angular)
- `src/styles.scss` — estilos globais, variáveis de cor CSS
- `src/index.html` — título da aba do navegador
- Componentes principais — ajustes de cores se necessário
- `favicon.ico` ou ícone — adicionar amarelo

### Backend
- Sem alterações necessárias

## Considerações

- Manter acessibilidade (contraste de cores)
- Consistência visual em toda a aplicação
- Testes visuais para validar tema azul em todos os componentes
