# Spec – US-100: Aplicar Tema Amarelo na Interface

## Escopo Técnico
Derivado do PRD:
- **Backend necessário:** não
- **Frontend necessário:** sim

## Análise de Estrutura Existente

### Arquitetura de Estilos
O projeto usa:
- **Angular 17.3** com componentes standalone
- **Variáveis CSS (CSS Custom Properties)** centralizadas em `frontend/src/styles.scss` para padronizar cores
- **Estilos inline** em cada componente (`styles: [...]` nos decoradores `@Component`)
- **Paleta atual:** azul com acentos amarelos/vermelhos

### Componentes Afetados
1. **LoginComponent** (`frontend/src/app/pages/login/login.component.ts`)
   - Botão de login com cor `var(--blue)`
   - Caixa de login com fundo `var(--bg2)`
   - Título "TODO List" em cor `var(--text-bright)`

2. **TodosComponent** (`frontend/src/app/pages/todos/todos.component.ts`)
   - Header com `background: var(--bg2)`
   - Logo com ícone em `var(--yellow)`
   - Botão "Adicionar" com `background: var(--blue)`
   - Checkbox quando selecionado com `background: var(--yellow)`
   - Filtros com destaque em `var(--yellow)`
   - Input focus com `border-color: var(--yellow)`

## Mudança de Paleta de Cores

### Cores Atuais (Azul)
```
--bg: #0F172A         (azul escuro → fundo principal)
--bg2: #1E293B        (azul médio → cards/headers)
--bg3: #334155        (azul claro → hover states)
--blue: #3B82F6       (azul brilhante → botões primários)
--blue-dark: #2563EB  (azul escuro → botões hover)
--yellow: #60A5FA     (ATUAL: azul para destaque)
```

### Cores Novas (Amarelo)
Para manter legibilidade e contraste, usaremos:
```
--bg: #FEF9E7         (amarelo muito claro → fundo principal)
--bg2: #FEF3C7        (amarelo claro → cards/headers)
--bg3: #FCD34D        (amarelo médio → hover states)
--blue: #F59E0B       (amarelo ouro → botões primários)
--blue-dark: #D97706  (amarelo ouro escuro → botões hover)
--yellow: #FBBF24     (amarelo brilhante → destaques/focus)
--text-bright: #1F2937 (cinza muito escuro → texto em fundo amarelo)
--text: #374151       (cinza escuro → texto secundário)
--muted: #6B7280      (cinza médio → texto terciário)
```

### Justificativa
- **Fundo claro amarelado** (#FEF9E7) em vez de escuro para criar identidade visual clara
- **Amarelos em gradação** (#FEF9E7 → #FEF3C7 → #FCD34D → #F59E0B) para profundidade
- **Texto em cinza escuro** para máxima legibilidade sobre fundos amarelos
- **Contraste WCAG AA+** garantido (razão mínima 7:1 para texto)

## Estrutura de Dados

**Nenhuma mudança de banco de dados** – operação puramente visual.

## Componentes Frontend

### LoginComponent
- **Rota:** `/login`
- **Descrição:** Tela de autenticação com campo de usuário e senha
- **Mudanças:**
  - Fundo da página amarelo claro
  - Caixa de login com fundo amarelo médio
  - Título em cinza escuro (alto contraste)
  - Botão de login amarelo ouro com texto escuro
  - Labels em cinza médio

### TodosComponent
- **Rota:** `/todos` (padrão após login)
- **Descrição:** Tela principal com lista de tarefas
- **Mudanças:**
  - Header com fundo amarelo médio
  - Logo "TODO List" em texto cinza escuro
  - Ícone de check_circle em amarelo brilhante (manter destaque)
  - Input "Nova tarefa" com fundo amarelo bem claro
  - Botão "Adicionar" em amarelo ouro
  - Filtros com destaque em amarelo brilhante
  - Items da lista com fundo alternado em amarelo muito claro e claro
  - Checkbox selecionado em amarelo brilhante
  - Botão "Sair" em texto cinza médio
  - Stats (pendentes/concluídas) em cinza médio

## Fluxo Técnico

1. **Usuário acessa `/login`** → Tela amarela com campos de entrada
2. **Usuário autentica** → Navega para `/todos`
3. **Usuário visualiza interface em amarelo** → Todos elementos visuais em paleta amarela
4. **Usuário interage** (adiciona, completa, deleta tarefas) → Funcionalidade 100% preservada
5. **Cores refletem estado** → Hover, focus, active mantêm coerência visual

## Arquivos a Modificar/Criar

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `frontend/src/styles.scss` | Modificar | Atualizar variáveis CSS `:root` com paleta amarela |
| `frontend/src/app/pages/login/login.component.ts` | Nenhuma | Estilos inline já usam variáveis CSS (sem mudança necessária) |
| `frontend/src/app/pages/todos/todos.component.ts` | Nenhuma | Estilos inline já usam variáveis CSS (sem mudança necessária) |

## Critérios Técnicos de Pronto

- [x] Paleta de cores amarela definida com contraste adequado (WCAG AA+)
- [ ] Arquivo `frontend/src/styles.scss` atualizado com novas variáveis
- [ ] Todos os botões (login, adicionar, delete) em amarelo
- [ ] Fundos (página, cards, header) em tons de amarelo
- [ ] Texto legível em contraste com fundo amarelo
- [ ] Checkboxes selecionados em amarelo brilhante
- [ ] Filtros ativos destacados em amarelo
- [ ] Inputs focus com border amarelo brilhante
- [ ] Nenhuma funcionalidade quebrada
- [ ] Interface responsiva mantida (sem mudanças no layout)
- [ ] Página de login com identidade visual amarela
- [ ] Página de todos com identidade visual amarela
- [ ] Acessibilidade preservada (contraste, sem mudanças semânticas)

## Notas Técnicas

### Por que não há mudanças em componentes específicos?
Os componentes Angular (LoginComponent e TodosComponent) usam **variáveis CSS** (`var(--blue)`, `var(--bg2)`, etc.) que já estão centralizadas em `styles.scss`. Alterar apenas o `:root` CSS garante que:
- Mudança global e consistente
- Sem duplicação de código
- Fácil manutenção futura
- Não requer rebuild de componentes

### Compatibilidade
- Angular 17.3 ✅ (suporta CSS Custom Properties nativamente)
- Navegadores modernos ✅ (IE11+ suporta CSS vars)
- Responsividade ✅ (sem mudanças de layout)

## Definição de Amarelo Utilizado

Paleta **Amber/Ouro** do Tailwind CSS:
- `#FEF9E7` - Amber 50 (fundo principal muito claro)
- `#FEF3C7` - Amber 100 (cards/headers claro)
- `#FCD34D` - Amber 300 (hover states)
- `#F59E0B` - Amber 500 (botões primários - ouro)
- `#D97706` - Amber 600 (botões hover - ouro escuro)
- `#FBBF24` - Amber 400 (destaques/focus - amarelo brilhante)

---

**Arquivo spec:** `tasks/100/US-100-spec.md`
