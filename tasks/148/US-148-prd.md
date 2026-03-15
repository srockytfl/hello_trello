# US-148 — Fix Footer Visibility

## Objetivo

Tornar o footer permanentemente visível na tela sem necessidade de scroll, utilizando layout sticky ou fixed.

## Contexto

Atualmente, o footer está posicionado de forma que fica oculto quando há conteúdo na página, obrigando o usuário a rolar a página para visualizá-lo. O objetivo é deixar o footer sempre acessível ao usuário, seja fixo na parte inferior da tela ou sticky.

## História de Usuário

Como **usuário da aplicação**,
quero **ver o footer sempre visível na tela**,
para que **possa acessar links e informações do footer sem precisar rolar a página inteira**.

## Problema

- Footer desaparece quando há conteúdo acima dele
- Usuário precisa fazer scroll até o final da página para acessar o footer
- Afeta a experiência do usuário e a acessibilidade

## Solução Proposta

Implementar o footer com `position: fixed` ou `position: sticky` para mantê-lo sempre visível na parte inferior da viewport.

## Requisitos

1. Footer deve estar visível em todas as rotas/páginas
2. Footer não deve sobrepor conteúdo importante
3. Layout deve se ajustar para acomodar o footer fixo
4. Responsive — funcionar em desktop, tablet e mobile
5. Footer deve ser acessível sem prejudicar a navegação

## Critérios de Aceitação

1. Footer aparece fixo na parte inferior da tela
2. Footer não sobrepõe conteúdo da página
3. Funcionário em todas as páginas da aplicação
4. Design responsivo mantido
5. Nenhum elemento importante fica oculto atrás do footer

## Fora do Escopo

- Redesenho completo do footer
- Alteração de conteúdo ou links do footer
- Mudança de cores ou tipografia

## Notas Técnicas

- Avaliar se usar `position: fixed` ou `position: sticky` conforme necessário
- Pode ser necessário ajustar padding ou margin em elementos pai
- Verificar compatibilidade com layout existente (React Router)
