# US-139 — Verde

## Objetivo do Produto

Implementar tema visual verde para toda a aplicação, alinhando a identidade visual do site com a cor verde em todos os elementos.

## Problema

Atualmente, a aplicação não possui um esquema de cores definido ou utiliza cores diferentes do verde. É necessário padronizar toda a interface visual para verde.

## Solução

Aplicar verde como cor principal em:
- Fundos de página
- Componentes UI (botões, cards, etc.)
- Título da página (tag `<title>`)
- Ícone do site (favicon)

## Escopo

### Incluso
- Tema de cores verde em backgrounds
- Componentes UI em verde
- Alteração do título do HTML para "Verde"
- Favicon em verde
- Estilos globais Sass

### Fora do Escopo
- Temas alternativos (light/dark mode)
- Paleta de cores com múltiplas variações
- Animações ou transições não solicitadas

## Critérios de Sucesso

1. Toda a aplicação exibe componentes com cor de fundo verde
2. O título da página (browser tab) exibe "Verde"
3. O favicon é exibido em cor verde
4. Estilos estão centralizados em `frontend/src/styles.scss`

## Estimativa

- Complexidade: P1 (Simples)
- Tempo: 1-2 horas
- Dependências: Nenhuma
