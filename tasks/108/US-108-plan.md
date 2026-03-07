# US-108 — Plano de Implementação

## Fase 1: Análise (TL)

1. Revisar arquitetura de cores atual
   - Verificar `frontend/src/styles.scss`
   - Identificar componentes com cores hardcoded
   - Analisar paleta de cores existente

2. Definir paleta amarela
   - Primário: `#FFD700` (Gold)
   - Secundário: `#FFC700`
   - Claro: `#FFED4E`
   - Manter contraste adequado

3. Planejar divisão de trabalho
   - Frontend: implementar tema, componentes, título, ícone
   - Backend: adicionar suporte a paleta (opcional)

## Fase 2: Implementação Frontend

### Subtarefa 1: Estilos globais
1. Definir variáveis SCSS na raiz de `styles.scss`
2. Substituir referências de cores em todos os arquivos `.scss`
3. Atualizar componentes principais (app, header, cards, botões)

### Subtarefa 2: HTML e Assets
1. Alterar `<title>` em `frontend/src/index.html` para "Amarelo"
2. Alterar heading visível no componente principal para "Amarelo"
3. Gerar ou modificar `favicon.ico` com amarelo
4. Atualizar referência do favicon em `index.html`

### Subtarefa 3: Validação
1. Rodar desenvolvimento local (`cd frontend && npm start`)
2. Verificar tema em todos os componentes
3. Testar responsividade
4. Validar contraste de cores

## Fase 3: Backend (opcional)

1. Se existir endpoint `/api/config` ou similar:
   - Adicionar propriedade `theme` com paleta amarela
   - Retornar cores para consumo frontend (se necessário)

2. Se não existir:
   - Criar stub simples ou pular esta fase

## Fase 4: Testes (QA)

1. Verificar tema em todos os componentes
2. Validar título da página
3. Validar ícone
4. Testar em diferentes resoluções
5. Verificar acessibilidade (contraste)

## Fase 5: Deploy

1. Build production: `npm run build`
2. Verificar build sem erros
3. Abrir PR
4. Merge para main

## Timeline

- Implementação: ~2-3 horas
- Testes: ~1 hora
- Total: ~3-4 horas
