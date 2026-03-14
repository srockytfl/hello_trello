# PRD — US-0: Trocar cor para amarelo

## Problema
Atualmente, o site usa um esquema de cores que não é amarelo. O usuário quer que o aplicativo tenha uma identidade visual consistente com a cor amarelo em todos os elementos.

## Objetivo
Implementar um esquema de cores amarelo em todo o site, incluindo backgrounds, componentes e elementos de interface, para criar uma identidade visual coesa e consistente.

## Sucesso Esperado
O site inteiro deve apresentar a cor amarelo de forma coerente:
- Backgrounds principais e secundários com tons de amarelo
- Componentes (botões, cards, inputs, etc.) com paleta amarelo
- Título da página em amarelo
- Ícones em amarelo
- Layout visual harmonioso com a nova paleta

## Requisitos Funcionais
1. Todas as cores de fundo devem ser alteradas para tons de amarelo
2. Componentes visuais devem utilizar paleta de amarelo (primário e secundário)
3. Título da página deve ser renderizado em amarelo
4. Todos os ícones devem ser amarelos
5. Manter a funcionalidade e usabilidade existentes durante a mudança de cor

## Requisitos Não-Funcionais
- Acessibilidade: garantir contraste adequado entre texto e fundo amarelo
- Consistência visual: mesma paleta de amarelo em todo o site

## Fluxo do Usuário
1. Usuário acessa o site
2. Sistema carrega com tema amarelo em todos os elementos
3. Usuário interage com componentes (botões, cards, etc.) todos com cor amarelo
4. Título da página e ícones aparecem em amarelo

## Critérios de Aceitação
- [ ] Backgrounds do site são amarelos (páginas, containers, cards)
- [ ] Componentes (botões, inputs, modais) utilizam paleta amarelo
- [ ] Título da página é exibido em amarelo
- [ ] Todos os ícones do site são amarelos
- [ ] Texto mantém legibilidade (contraste adequado)
- [ ] Paleta de cores é consistente em toda a aplicação

## Escopo Técnico
- Backend necessário: não
- Frontend necessário: sim

## Suposições
- A cor amarelo não foi especificada em detalhe; será necessário definir o tom exato (amarelo claro, amarelo vibrante, amarelo corporativo, etc.)
- Todos os componentes existentes devem ser reskinned com a paleta amarelo
- Não há necessidade de criar novas funcionalidades, apenas alterar as cores

## Fora do Escopo
- Alteração de layout ou estrutura dos componentes
- Mudanças de funcionalidade
- Adição de novos componentes
- Mudanças no comportamento ou interação
