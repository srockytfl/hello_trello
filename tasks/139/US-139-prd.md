# PRD — US-139: Trocar cor do site para Verde

## Problema
O site atual não apresenta uma identidade visual consistente em verde. Há necessidade de estabelecer verde como cor primária em toda a interface, incluindo fundos, componentes, ícones e títulos para uma identidade visual coerente.

## Objetivo
Implementar verde como cor primária em todo o site, aplicando a cor em fundos, componentes visuais, ícones e título da página para criar uma experiência visual consistente e reconhecível.

## Sucesso Esperado
Quando um usuário acessar o site, ele verá uma paleta de cores consistente em verde em:
- Fundos (páginas e seções)
- Componentes (botões, cards, elementos interativos)
- Ícones
- Título/heading da página
- Todos os elementos visuais principais

## Requisitos Funcionais
1. Cores de fundo do site devem ser aplicadas em verde (ou variações de verde para profundidade)
2. Componentes visuais (botões, cards, inputs) devem utilizar verde como cor primária
3. Ícones exibidos no site devem ser verdes
4. Título/heading da página deve ser exibido em verde
5. Ícone da aba do navegador (favicon) deve ser em verde
6. Deve haver contraste adequado para legibilidade de texto sobre fundos verdes

## Requisitos Não-Funcionais
- Acessibilidade: manter contraste mínimo WCAG AA para legibilidade de texto
- Consistência: verde deve ser aplicado uniformemente em toda a UI

## Fluxo do Usuário
1. Usuário acessa o site
2. Sistema exibe página com tema verde em todos os elementos visuais
3. Ícone da aba do navegador (favicon) exibe em verde
4. Usuário navega entre páginas/componentes
5. Elementos mantêm tema verde consistente

## Critérios de Aceitação
- [ ] Cores de fundo das páginas/seções são verdes
- [ ] Componentes (botões, cards, inputs) aplicam verde como cor primária
- [ ] Ícones exibidos no site são verdes
- [ ] Títulos/headings da página são verdes
- [ ] Favicon (ícone da aba do navegador) é verde
- [ ] Texto sobre fundos verdes mantém contraste adequado para legibilidade
- [ ] Visual é consistente em todas as páginas do site

## Escopo Técnico
- Backend necessário: não
- Frontend necessário: sim

## Suposições
- Assume-se que "verde" refere-se a uma única tonalidade ou paleta de verdes coerente (não especificada na issue)
- O texto sobre fundos verdes será legível (provavelmente texto escuro ou claro conforme o tom de verde)
- Componentes reutilizáveis (botões, cards) têm estilos globais que podem ser alterados centralmente
- Não há marca visual ou guia de cor definido; a tonalidade exata do verde será definida durante a implementação
- Favicon pode ser atualizado junto com as mudanças visuais

## Fora do Escopo
- Não alterar a estrutura ou layout das páginas
- Não adicionar novos componentes
- Não modificar funcionalidades existentes
- Não criar novo sistema de temas (apenas aplicar verde)
