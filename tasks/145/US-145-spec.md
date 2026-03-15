# US-145 — Adicionar footer com copyright

## Especificação Técnica

### Arquitetura

```
frontend/
  ├── src/
  │   ├── components/
  │   │   └── Footer/
  │   │       ├── Footer.tsx
  │   │       └── Footer.module.scss
  │   ├── App.tsx (atualizado para incluir Footer)
  │   └── styles.scss (atualizado se necessário)
```

### Componente Footer

**Caminho:** `frontend/src/components/Footer/Footer.tsx`

**Responsabilidades:**
- Renderizar footer semântico HTML
- Exibir copyright com ano atual
- Aplicar estilos reutilizáveis

**Props:** Nenhuma (por enquanto)

**Estrutura HTML:**
```html
<footer className="footer">
  <div className="footer__container">
    <p className="footer__text">
      © 2026 hello_trello. All rights reserved.
    </p>
  </div>
</footer>
```

### Estilos (Sass)

**Caminho:** `frontend/src/components/Footer/Footer.module.scss`

**Classes CSS:**
- `.footer` — elemento footer principal
- `.footer__container` — container para conteúdo (BEM methodology)
- `.footer__text` — parágrafo de copyright

**Propriedades esperadas:**
- Background-color: contrastante (ex: dark gray ou similar ao design existente)
- Color (text): acessível (ex: white ou light gray)
- Padding: 20px ou consistente com design
- Font-size: 0.875rem ou 14px (menor que body)
- Border-top: opcional (separação visual)
- Margin-top: auto (sticky footer behavior)

**Responsividade:**
- Desktop: padding 20px
- Tablet: padding 20px
- Mobile: padding 16px (ajuste se necessário)

### Integração ao App

**Arquivo:** `frontend/src/App.tsx`

**Alteração:**
```typescript
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app">
      {/* conteúdo existente */}
      <Footer />
    </div>
  );
}
```

**Consideração:** O App.tsx deve garantir que o layout seja flexível o suficiente para o footer ficar no rodapé mesmo com pouco conteúdo (display: flex com min-height: 100vh).

### Comportamento

1. **Renderização:** Footer renderiza em todas as páginas (integrado no App.tsx)
2. **Dinâmica:** Ano é hardcoded como 2026 (pode ser dinamizado futuramente com `new Date().getFullYear()`)
3. **Sem interatividade:** Footer é apenas apresentacional
4. **Sem fetch de dados:** Nenhuma chamada HTTP necessária

### Testes Esperados

**Unitário (Vitest):**
- Footer renderiza sem erros
- Texto de copyright é exibido corretamente
- Classes CSS são aplicadas

**E2E:**
- Footer é visível em desktop (1920x1080)
- Footer é visível em mobile (375x667)
- Footer está posicionado no rodapé
- Nenhuma regressão visual

### Acessibilidade

- Usar tag semântica `<footer>` (já semântica)
- Garantir contraste WCAG AA (4.5:1 para texto normal)
- Não usar cores apenas para diferenciar (se houver separador visual)
- Texto legível em todos os tamanhos de viewport

### Performance

- Sem impacto (componente simples)
- CSS inline ou via módulo (evitar overhead)

### Compatibilidade

- React 18+ (compatível)
- TypeScript strict mode
- Sass/SCSS standard

### Rollback

Se necessário, remover importação de Footer do App.tsx e deletar componente.
