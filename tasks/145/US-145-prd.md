# US-145 — Adicionar footer com copyright

## Objetivo

Adicionar um footer com informações de copyright ao rodapé da aplicação, melhorando a presença legal e profissional do projeto.

## Contexto

A aplicação atualmente não possui um footer. Adicionar um footer com copyright é uma prática comum em aplicações web modernas, fornecendo informações de propriedade intelectual e conformidade legal.

## Historia de Usuario

**Como** um visitante da aplicação,
**quero** ver um footer com informações de copyright no rodapé,
**para** estar ciente dos direitos autorais do projeto.

## Requisitos Funcionais

1. O footer deve ser exibido no rodapé de todas as páginas
2. O footer deve conter:
   - Texto de copyright com ano atual (2026)
   - Nome ou identificação do projeto (hello_trello)
3. O footer deve ser visualmente consistente com o design da aplicação
4. O footer não deve interferir com o conteúdo principal

## Requisitos Não-Funcionais

1. O footer deve ser responsivo (mobile, tablet, desktop)
2. O footer deve permanecer no rodapé mesmo com pouco conteúdo
3. Performance não deve ser impactada
4. Acessibilidade básica (contraste adequado, HTML semântico)

## Critérios de Aceitação

1. Footer está visível em todas as páginas da aplicação
2. Footer contém o texto "© 2026 hello_trello" ou similar
3. Footer possui estilo apropriado (cor, padding, fonte)
4. Footer aparece no rodapé da página sem overlay de conteúdo
5. Footer é responsivo em dispositivos de diferentes tamanhos
6. Nenhuma regressão visual nas páginas existentes

## Design e Estilo

- Posicionamento: rodapé da página (footer tag semântica HTML)
- Background: contrastante com o design atual
- Cor do texto: acessível (WCAG AA mínimo)
- Padding/Margin: consistente com design da aplicação
- Font-size: legível mas menor que conteúdo principal

## Implementação

- Criar componente Footer reutilizável em `frontend/src/components/Footer`
- Adicionar Footer ao layout principal (App.tsx ou Layout)
- Estilizar com Sass seguindo convenções do projeto
- Garantir que o footer não quebre em nenhuma resolução

## Fora do Escopo

- Adicionar múltiplos links no footer (fase futura)
- Adicionar informações de política de privacidade (fase futura)
- Internacionalização de copyright (apenas PT-BR por enquanto)
- Analytics ou tracking no footer

## Dependências

- Nenhuma dependência externa adicional necessária

## Estimativa de Complexidade

Baixa - componente simples de apresentação
