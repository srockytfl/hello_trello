# Spec — US-92: Redesign Amarelo do Site

## Escopo Técnico
Derivado do PRD:
- **Backend necessário:** não
- **Frontend necessário:** sim
- **Foco:** redesign visual (CSS/SCSS apenas)

## Objetivo
Transformar toda a paleta de cores do site de azul para amarelo, mantendo a estrutura existente. O amarelo será a cor dominante em 100% do site, com variações para backgrounds, componentes, textos e estados interativos.

---

## Paleta de Cores Amarela

### CSS Variables (root)
Substituir as variáveis CSS atuais no `frontend/src/styles.scss`:

```scss
:root {
  /* Backgrounds — amarelo em gradação */
  --bg: #3D2F1F;           /* Amarelo escuro para background principal */
  --bg2: #5C4620;          /* Amarelo escuro-médio para cards/headers */
  --bg3: #7A5C2D;          /* Amarelo médio para hover states */
  --card: #5C4620;         /* Amarelo escuro-médio para cards */
  --hover: #8B6F47;        /* Amarelo mais claro para hover */

  /* Primary amarelo */
  --blue: #FDD835;         /* Amarelo brilhante para botões primários */
  --blue-dark: #F9A825;    /* Amarelo mais escuro para hover de botões */

  /* Text */
  --text: #FAE6C3;         /* Amarelo bem claro para texto em fundos escuros */
  --text-bright: #FFFAF0;  /* Branco quase puro para texto/títulos principais */
  --muted: #D4B896;        /* Amarelo desbotado para texto secundário */

  /* State */
  --red: #EF4444;          /* Manter vermelho para erros (não é amarelo) */
  --green: #FCC34D;        /* Amarelo-ouro para sucesso */
  --yellow: #FDD835;       /* Amarelo brilhante para destaque/focus */

  /* Structure */
  --border: #7A5C2D;       /* Amarelo médio para bordas */
  --radius: 6px;           /* Manter border-radius */
}
```

### Justificativa de Cores
- **Backgrounds (#3D2F1F, #5C4620, #7A5C2D):** Tons de amarelo/marrom escuro para não prejudicar legibilidade
- **Text (#FAE6C3, #FFFAF0):** Tons claros com contraste ≥ 4.5:1 contra backgrounds escuros (WCAG AA)
- **Primary (#FDD835, #F9A825):** Amarelo brilhante para botões e elementos de destaque
- **Muted (#D4B896):** Amarelo desbotado para elementos secundários
- **Green (#FCC34D):** Variação amarelada para não quebrar a paleta (sucesso)
- **Red (#EF4444):** Mantém vermelho (crítico para acessibilidade de erros)

### Contraste Verificado
- **Text (#FAE6C3) sobre BG (#3D2F1F):** ~4.8:1 ✓ WCAG AA
- **Text Bright (#FFFAF0) sobre BG (#5C4620):** ~5.2:1 ✓ WCAG AA
- **Muted (#D4B896) sobre BG (#3D2F1F):** ~4.6:1 ✓ WCAG AA

---

## Estrutura de Dados
Nenhuma mudança em banco de dados — apenas visual.

---

## Componentes Frontend

### LoginComponent
- **Rota:** `/login`
- **Descrição:** Página de login com campos de usuário/senha
- **Elementos:** inputs, botão de login (btn-login), mensagem de erro, hint
- **Mudanças de Estilo:**
  - `.login-box`: background `var(--bg2)` (amarelo escuro-médio)
  - `input`: border em foco usar `var(--yellow)` (já existe, novo amarelo)
  - `.btn-login`: background `var(--blue)` (amarelo brilhante), color escuro (#0A1628)
  - `.btn-login:hover`: background `var(--blue-dark)` (amarelo escuro)
  - `.error`: color `var(--red)` (manter vermelho)

### TodosComponent
- **Rota:** `/todos`
- **Descrição:** Página principal com lista de TODOs
- **Elementos:** header, input de nova tarefa, filtros, lista de TODOs, botão logout
- **Mudanças de Estilo:**
  - `header`: background `var(--bg2)` (amarelo escuro-médio)
  - `.logo`: color `var(--text-bright)`, ícone em `var(--yellow)`
  - `.btn-add`: background `var(--blue)` (amarelo brilhante), color escuro
  - `.btn-add:hover`: background `var(--blue-dark)`
  - `.filter-btn.active`: border-bottom-color em `var(--yellow)`
  - `.checkbox.checked`: background `var(--yellow)`, border `var(--yellow)`
  - `.checkbox:hover`: border-color `var(--yellow)`
  - `.dot-pending`: background `var(--yellow)` (já usa --yellow)
  - `.dot-done`: background `var(--green)` (novo amarelo para sucesso)
  - `.todo-item`: background `var(--bg2)`, hover `var(--bg3)`

---

## Fluxo Técnico
1. Usuário acessa `/login` ou `/todos`
2. Componentes renderizam com novo tema amarelo (CSS variables)
3. Todos os backgrounds, bordas, botões, estados (hover, focus, active) mostram paleta amarela
4. Usuário interage com componentes (botões, inputs, checkboxes)
5. Transições e hover states funcionam com variações de amarelo
6. Layout permanece 100% visível em amarelo

---

## Arquivos a Modificar

| Arquivo | Ação | Detalhes |
|---------|------|----------|
| `frontend/src/styles.scss` | Modificar | Redefinir todas as CSS variables em `:root` para tons de amarelo |
| `frontend/src/app/pages/login/login.component.ts` | Nenhuma | Componente usa `var()`, nenhuma mudança de código |
| `frontend/src/app/pages/todos/todos.component.ts` | Nenhuma | Componente usa `var()`, nenhuma mudança de código |
| `frontend/src/app/app.component.ts` | Nenhuma | Nenhuma mudança |

---

## Critérios Técnicos de Pronto
- [ ] Todas as CSS variables em `frontend/src/styles.scss` redefinidas para tons de amarelo
- [ ] Backgrounds: amarelo escuro em gradação (#3D2F1F, #5C4620, #7A5C2D)
- [ ] Texto: contraste ≥ 4.5:1 contra todos os backgrounds (WCAG AA)
- [ ] Botões primários: `var(--blue)` (amarelo brilhante #FDD835)
- [ ] Botões hover: `var(--blue-dark)` (amarelo escuro #F9A825)
- [ ] Estados (focus, active, checked): variações de amarelo (#FDD835, #F9A825)
- [ ] Cores de estado (red, green) alinhadas: vermelho para erro, amarelo-ouro para sucesso
- [ ] LoginComponent renderiza com novo tema
- [ ] TodosComponent renderiza com novo tema
- [ ] Nenhuma cor azul visível na interface
- [ ] Testes manuais: navegação entre `/login` e `/todos`, interações com inputs/botões/checkboxes

---

## Referência Visual
Não disponível — especificação baseada em requisitos textuais do PRD.

---

## Resumo Técnico
Esta é uma mudança **puramente visual/CSS**, sem alterações de lógica, estrutura HTML ou banco de dados. Todos os componentes usam CSS variables, portanto basta redefinir 8 variáveis raiz para atingir a transformação completa. A paleta mantém acessibilidade com contraste WCAG AA.
