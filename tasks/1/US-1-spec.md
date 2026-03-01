# Spec — US-1: Trocar Cor para Azul

## Escopo Técnico
Derivado do PRD:
- Backend necessário: **não**
- Frontend necessário: **sim**

## Contexto
Atualmente, a variável CSS `--blue` está definida como `#FF9500` (laranja). Esta especificação define a atualização para uma cor azul conforme o design system do projeto.

## Contratos de API
**N/A** — Esta é uma alteração visual apenas, sem mudanças em endpoints ou contratos de API.

## Estrutura de Dados (em memória)
**N/A** — Sem mudanças em estrutura de dados.

## Componentes Frontend

### Mudança em Arquivo de Estilos Global

**Arquivo:** `frontend/src/styles.scss`

- **Descrição:** Arquivo que define todas as variáveis de cor do design system utilizadas em toda a aplicação.
- **Mudança necessária:**
  - Variável `--blue` atualmente: `#FF9500` (laranja)
  - Variável `--blue` nova: **um tom de azul** a ser definido (sugestão: `#3B82F6`, `#0EA5E9` ou `#2563EB`)
  - Variável `--blue-dark` também deve ser atualizada para corresponder a um tom mais escuro do novo azul

### Componentes que utilizam `--blue`

Os seguintes componentes utilizam a variável `--blue` e serão visualmente impactados:

1. **LoginComponent** (`frontend/src/app/pages/login/login.component.ts`)
   - `.btn-login`: background-color (linha 83)
   - `.btn-login:hover`: background-color com `--blue-dark` (linha 91)
   - `input:focus`: border-color (linha 77)

2. **TodosComponent** (`frontend/src/app/pages/todos/todos.component.ts`)
   - `.logo .material-icons-round`: color (linha 89)
   - `.btn-add`: background-color (linha 151)
   - `.btn-add:hover`: background-color com `--blue-dark` (linha 162)
   - `.filter-btn.active`: border-bottom-color (linha 183)
   - `.checkbox:hover`: border-color (linha 211)
   - `.checkbox.checked`: background-color e border-color (linhas 213-214)
   - `input:focus`: border-color (linha 144)

## Fluxo Técnico

1. Desenvolvedor identifica o valor correto para azul de acordo com o design system
2. Desenvolvedor atualiza `--blue` em `frontend/src/styles.scss`
3. Desenvolvedor atualiza `--blue-dark` em `frontend/src/styles.scss` para corresponder visualmente
4. Frontend é rebuildo (hot reload em dev, ou `ng build` em produção)
5. Todas as instâncias que usam `var(--blue)` refletem a nova cor automaticamente

## Tratamento de Erros
**N/A** — Não há lógica de API ou processamento que gere erros. É uma mudança visual pura.

## Observabilidade Básica
- Sem logs ou erros esperados
- Mudança é verificável visualmente em qualquer navegador

## Decisões Técnicas

1. **Usar variáveis CSS:** Mantém reusabilidade e facilita futuros ajustes de tema
2. **Atualizar ambas `--blue` e `--blue-dark`:** Garante consistência em estados hover e active
3. **Sem inline styles:** Todos os componentes já usam variáveis CSS, nenhuma mudança de padrão necessária
4. **Global em `styles.scss`:** Impacta todos os componentes que usam a variável, sem mudanças individuais nos componentes

## Critérios Técnicos de Pronto

- [ ] Variável `--blue` está atualizada para um tom de azul em `frontend/src/styles.scss`
- [ ] Variável `--blue-dark` está atualizada para um tom de azul escuro correspondente
- [ ] Componente LoginComponent exibe botão de login em azul
- [ ] Componente TodosComponent exibe:
  - Ícone check_circle no header em azul
  - Botão "Adicionar" em azul
  - Abas de filtro com underline em azul quando ativa
  - Checkbox marcado em azul
  - Inputs com border azul em focus
- [ ] Alteração é visível em todos os navegadores suportados (Chrome, Firefox, Safari)
- [ ] Sem quebra de funcionalidade existente

## Suposições Técnicas

1. O termo "azul" no PRD refere-se a um único tom de azul, aplicado uniformemente via variável CSS
2. O valor exato da cor azul será definido durante a implementação, respeitando padrões de design
3. A variável `--blue-dark` é derivada da mesma família de cor azul (tom mais escuro para hover)
4. Nenhuma mudança será necessária no backend
5. A alteração será aplicada globalmente via CSS, sem refactor de componentes

## Dúvidas Técnicas em Aberto

1. **Qual é o valor hexadecimal exato para a cor azul?** (ex: `#3B82F6`, `#0EA5E9`, `#2563EB`)
   - Impacto: Determina o valor a ser inserido em `--blue`
   - Sugestão: Verificar design system ou wireframes do projeto

2. **A cor `--blue-dark` deve ser uma versão mais escura do novo azul ou um tom diferente?**
   - Impacto: Define consistência visual em estados hover
   - Sugestão: Manter a proporção de contraste (similar à relação entre `#FF9500` e `#E08400`)

## Resumo

- **Modificações:** 1 arquivo (`frontend/src/styles.scss`)
- **Componentes impactados:** 2 (LoginComponent, TodosComponent)
- **Tipo:** Alteração visual / CSS
- **Teste:** Visual + Verificação em navegadores
- **Complexidade:** Baixa
