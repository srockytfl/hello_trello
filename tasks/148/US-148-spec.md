# US-148 — Fix Footer Visibility — Especificação Técnica

## Descrição Técnica

Implementar o footer como elemento sticky ou fixed para manter a visibilidade permanente na viewport, independentemente do scroll de conteúdo.

## Componentes Afetados

- `App.tsx` — estrutura layout principal
- `frontend/src/styles.scss` — estilos globais do footer
- Footer component (localizar e modificar)

## Detalhes da Implementação

### 1. Layout Principal

O layout deve ser estruturado para acomodar o footer fixo:

```
<div className="app-layout">
  <header>...</header>
  <main>...</main>
  <footer className="footer-sticky">...</footer>
</div>
```

### 2. Estilos CSS

Adicionar ou modificar regras SCSS:

```scss
.footer-sticky {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: var(--footer-bg-color, #f5f5f5);
  border-top: 1px solid var(--border-color, #ccc);
  z-index: 10;
  // Garantir que não sobrepõe conteúdo importante
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

body, html {
  // Adicionar padding-bottom para acomodar footer fixo
  padding-bottom: <altura-do-footer>;
}
```

### 3. Responsividade

- Desktop: footer fixo na parte inferior
- Tablet: manter estrutura do desktop
- Mobile: garantir footer não oculte elementos interativos

### 4. Altura do Footer

Determinar altura fixa ou dinâmica:
- Se altura conhecida: usar valor fixo (ex: 80px)
- Se dinâmica: usar CSS custom properties ou JavaScript

## Critérios de Teste

### Funcional

1. Footer visível ao carregar a página
2. Footer permanece visível ao fazer scroll de conteúdo
3. Footer não cobre botões ou elementos interativos
4. Todas as rotas mostram o footer
5. Links do footer funcionam corretamente

### Responsivo

1. Desktop (>1024px) — footer full width
2. Tablet (768px-1024px) — footer adaptado
3. Mobile (<768px) — footer legível, não oculta conteúdo

### Browser

- Chrome/Edge (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Possíveis Alternativas

### Opção 1: `position: fixed`
- **Pros:** Sempre visível
- **Cons:** Pode cobrir conteúdo se não gerenciado
- **Recomendado:** Se altura do footer é fixa

### Opção 2: `position: sticky`
- **Pros:** Não sai do fluxo normal, mais natural
- **Cons:** Precisa de contexto (parent com overflow)
- **Recomendado:** Se contexto permite

### Opção 3: Flexbox Layout
- **Pros:** Melhor controle do espaço
- **Cons:** Requer mudança maior na estrutura
- **Recomendado:** Se refatoração é aceitável

## Arquivos a Modificar

- `frontend/src/styles.scss` — adicionar/modificar estilos do footer
- `frontend/src/App.tsx` — ajustar layout se necessário
- Footer component (se existir em `frontend/src/pages/` ou `frontend/src/components/`)

## Implementação Sugerida

1. Identificar arquivo do footer
2. Adicionar classe `.footer-sticky` ou modifier
3. Aplicar `position: fixed; bottom: 0;` com z-index apropriado
4. Ajustar padding-bottom do body para evitar sobreposição
5. Testar em múltiplas resoluções
6. Validar em todos os navegadores alvo

## Notas

- Manter compatibilidade com design system existente
- Não adicionar dependências novas
- Considerar performance (avoid repaints desnecessários)
- Validar acessibilidade (focus management, keyboard navigation)
