# US-108 — PRD (Product Requirements Document)

## Visão Geral
Implementar um tema visual completo com paleta de cores amarela em toda a aplicação **Hello Trello**, alterando o título do site para "Amarelo" e incluindo amarelo no ícone.

## Problema
O usuário deseja personalizar a aparência da aplicação com cores amarelas em todos os elementos visuais, mantendo uma identidade visual coerente.

## Solução Proposta
Criar um tema amarelo que:
- Substitua as cores base da aplicação por tons de amarelo
- Mantenha acessibilidade e contraste adequado
- Seja aplicado consistentemente em todos os componentes
- Altere o título visível e o título da página
- Inclua amarelo no ícone/favicon

## Requisitos Funcionais

### RF1: Paleta de Cores Amarela
- **Amarelo Primário**: `#FFD700` (Gold)
  - Uso: backgrounds principais, highlights, botões primários
- **Amarelo Secundário**: `#FFC700`
  - Uso: hover states, accents secundários
- **Amarelo Claro**: `#FFED4E`
  - Uso: backgrounds leves, backgrounds de cards
- **Neutrals**: Mantidos para contraste (branco, cinza)
  - Uso: textos, borders, backgrounds secundários

### RF2: Componentes Afetados
- **App Layout**: background amarelo/tons de amarelo
- **Header/Navbar**: tema amarelo
- **Cards de Tarefas**: borders/backgrounds amarelos
- **Botões**: amarelo primário/secundário
- **Inputs/Forms**: amarelo como accent color
- **Todos os elementos interativos**: hover states em amarelo

### RF3: Título e Branding
- Título HTML (`<title>`): "Amarelo"
- Heading/H1 visível: "Amarelo"
- Favicon: incluir elemento amarelo

## Requisitos Não-Funcionais

### RNF1: Acessibilidade
- Contraste mínimo WCAG AA (4.5:1 para texto pequeno, 3:1 para texto grande)
- Cores devem ser diferenciáveis para daltonismo
- Manter legibilidade em todos os elementos

### RNF2: Consistência
- Tema aplicado uniformemente
- Sem cores hardcoded nos componentes (usar variáveis)
- Paleta centralizada e reutilizável

### RNF3: Performance
- Nenhuma impacto de performance
- CSS otimizado
- Assets leves (ícone em formato apropriado)

### RNF4: Compatibilidade
- Funcionar em navegadores modernos (Chrome, Firefox, Safari, Edge)
- Responsivo em mobile e desktop

## Critério de Aceitação

- [ ] Todas as cores da aplicação foram alteradas para amarelo
- [ ] Título da página HTML é "Amarelo"
- [ ] Heading visível é "Amarelo"
- [ ] Favicon contém elemento amarelo
- [ ] Todos os componentes usam paleta amarela consistentemente
- [ ] Contraste de cores atende WCAG AA
- [ ] Aplicação funciona sem erros no navegador
- [ ] Build produção gera sem warnings

## Impacto

- **Usuário**: Visual completamente transformado para amarelo
- **Negócio**: Demonstra flexibilidade e customização de tema
- **Técnico**: Fundação para temas futuros (múltiplos temas?)

## Notas

- Semelhante a US-105 (Tema Rosa) — pode reutilizar padrões
- Sem alterações de funcionalidade, apenas tema
- Não afeta backend (Express)
