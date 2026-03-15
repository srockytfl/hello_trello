# Spec — US-144: Azul

## Problema
A aplicacao nao possui uma identidade visual coesa. Os usuarios percebem inconsistencia de cores entre os componentes, o que prejudica a experiencia visual e a sensacao de produto acabado.

## Objetivo
Aplicar um tema de cor azul de forma consistente em toda a aplicacao, incluindo backgrounds, componentes, titulo da aba do navegador e favicon.

## Requisitos Funcionais
1. Todos os fundos de paginas e componentes devem utilizar variacoes de azul
2. O titulo exibido na aba do navegador deve ser "Azul"
3. O favicon exibido na aba do navegador deve ser em tom azul
4. A paleta azul deve ser aplicada de forma uniforme em todas as paginas existentes (login e todos)

## Fluxo do Usuario
1. Usuario acessa a aplicacao pela URL
2. Sistema exibe toda a interface com paleta de cores azul em backgrounds e componentes
3. Usuario visualiza o titulo "Azul" na aba do navegador
4. Usuario visualiza o favicon em tom azul na aba do navegador

## Criterios de Aceitacao
- [ ] Todos os fundos de componentes utilizam variacoes de azul
- [ ] Titulo da aba do navegador exibe "Azul"
- [ ] Favicon azul esta configurado e visivel na aba do navegador
- [ ] Paleta de cores azul e aplicada consistentemente em todas as paginas (login e todos/board)
- [ ] Texto mantem legibilidade sobre fundos azuis (contraste minimo WCAG AA — ratio 4.5:1)
- [ ] Layout responsivo funciona corretamente com o tema azul em mobile, tablet e desktop

## Escopo Tecnico
- Backend necessario: nao
- Frontend necessario: sim

## Suposicoes
- A paleta azul sera aplicada via variaveis CSS/SCSS globais para garantir consistencia
- Favicon pode ser definido como SVG inline no HTML em vez de arquivo .ico separado
- O titulo da pagina e gerenciado diretamente via tag `<title>` no HTML
- Cores de estado (erro em vermelho, sucesso em verde) sao mantidas para nao prejudicar usabilidade
- A mudanca e puramente visual: nenhuma funcionalidade ou estrutura de layout deve ser alterada

## Fora do Escopo
- Alterar tipografia, fontes ou espacamentos
- Modificar estrutura ou layout dos componentes
- Adicionar novos componentes ou funcionalidades
- Alterar funcionalidades existentes (CRUD de todos, autenticacao, kanban)
- Suporte a modo escuro ou troca de tema dinamica
