# US-139 — Verde

## Contexto

O site precisa ser totalmente verde para criar uma identidade visual consistente. Isso inclui cores de fundo, componentes, título da página e ícone.

## História de Usuário

Como usuário do site,
quero que toda a interface seja verde,
para ter uma experiência visual consistente e moderna.

## Critérios de Aceitação

1. **Cores de Fundo**
   - Todos os backgrounds de página e componentes utilizam tom de verde
   - Verde primário: #00AA00 (ou similar a ser definido)

2. **Título da Página**
   - O `<title>` do HTML é "Verde"
   - Refletido na aba do navegador

3. **Favicon**
   - Ícone do site (favicon) é exibido em cor verde
   - Arquivo: `frontend/index.html` referencia favicon correto

4. **Componentes UI**
   - Botões com fundo verde
   - Cards com fundo verde ou bordas verdes
   - Inputs e formulários com elementos verdes
   - Mantém contraste e acessibilidade (WCAG AA)

5. **Estilos Globais**
   - Estilos centralizados em `frontend/src/styles.scss`
   - Variáveis Sass para cores reutilizáveis
   - Sem hardcoding de cores em componentes individuais

## Regras Técnicas

- Seguir convenções de `frontend/src/styles.scss` para estilos globais
- Usar variáveis Sass: `$primary-green`, `$secondary-green`, etc.
- Sem modificações de configuração de build (Vite)
- Manter compatibilidade com React 18 + TypeScript

## Critérios de Teste (QA)

### Visual
- Todos os backgrounds da aplicação são verdes
- Ícone é exibido corretamente em verde
- Título da aba exibe "Verde"
- Não há broken links ou imagens

### Navegação
- Todas as páginas mantêm tema verde
- Links e interações funcionam normalmente
- Responsividade mantida em mobile/tablet

### Acessibilidade
- Contraste de texto atende WCAG AA (4.5:1 para texto normal)
- Sem quebra de funcionalidade

## Fora do Escopo

- Temas light/dark
- Paleta de cores secundárias além do verde
- Animações de transição
- Geração de ícones (usar/modificar o existente)
