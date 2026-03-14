# PRD — US-139: Trocar cor do site para amarelo

## Problema
O site atual não apresenta uma identidade visual clara com cores vibrantes. Há necessidade de estabelecer uma cor consistente (amarelo) em toda a interface para melhorar o branding e a identificação visual.

## Objetivo
Implementar amarelo como cor primária em todo o site, incluindo fundos, componentes e elementos visuais principais, criando uma experiência visual coerente e reconhecível.

## Sucesso Esperado
Quando um usuário acessar o site, ele verá uma paleta de cores consistente em amarelo em:
- Fundos (páginas e seções)
- Componentes (botões, cards, elementos interativos)
- Ícones
- Título da página

## Requisitos Funcionais
1. Cores de fundo do site devem ser aplicadas em amarelo (ou variações de amarelo para profundidade)
2. Componentes visuais (botões, cards, inputs) devem utilizar amarelo como cor primária
3. Ícones exibidos no site devem ser amarelos
4. Título/heading da página deve ser exibido em amarelo
5. Deve haver contraste adequado para legibilidade de texto sobre fundos amarelos

## Requisitos Não-Funcionais
- Acessibilidade: manter contraste mínimo WCAG AA para legibilidade de texto
- Consistência: amarelo deve ser aplicado uniformemente em toda a UI

## Fluxo do Usuário
1. Usuário acessa o site
2. Sistema exibe página com tema amarelo em todos os elementos visuais
3. Usuário navega entre páginas/componentes
4. Elementos mantêm tema amarelo consistente

## Critérios de Aceitação
- [ ] Cores de fundo das páginas/seções são amarelas
- [ ] Componentes (botões, cards, inputs) aplicam amarelo como cor primária
- [ ] Ícones exibidos no site são amarelos
- [ ] Títulos/headings da página são amarelos
- [ ] Texto sobre fundos amarelos mantém contraste adequado para legibilidade
- [ ] Visual é consistente em todas as páginas do site

## Escopo Técnico
- Backend necessário: não
- Frontend necessário: sim

## Suposições
- Assume-se que "amarelo" refere-se a uma única tonalidade ou paleta de amarelos coerente (não especificada na issue)
- O texto sobre fundos amarelos será legível (provavelmente texto escuro ou com drop shadow)
- Componentes reutilizáveis (botões, cards) têm estilos globais que podem ser alterados
- Não há marca visual ou guia de cor definido; a tonalidade exata do amarelo será definida durante a implementação

## Fora do Escopo
- Não alterar a estrutura ou layout das páginas
- Não adicionar novos componentes
- Não modificar funcionalidades existentes
- Não criar novo sistema de temas (apenas aplicar amarelo)
