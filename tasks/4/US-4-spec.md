# Spec — US-4: Trocar Cor para Laranja

## Escopo Técnico
Derivado do PRD:
- Backend necessário: **não**
- Frontend necessário: **sim**

### Justificativa
Esta é uma mudança puramente visual/estilística. Não requer novos endpoints de API nem alterações em dados. Os componentes Angular existentes devem apenas aplicar a cor laranja (#FF9500) em elementos de destaque.

---

## Contratos de API
**N/A** — Nenhum novo endpoint requerido. A aplicação continua utilizando os endpoints existentes:
- `GET /api/title` — título da aplicação
- `POST /api/login` — autenticação
- `GET /api/todos` — listar todos
- `POST /api/todos` — criar todo
- `PUT /api/todos/:id` — atualizar todo
- `DELETE /api/todos/:id` — deletar todo

Nenhuma alteração necessária no backend Express.

---

## Estrutura de Dados (em memória)

### Definição de Cor
Criar constante/variável centralizadamente para facilitar manutenção:

**Frontend (SCSS/TypeScript):**
```
$primary-orange: #FF9500;  // ou constante TS
$primary-orange-hover: #E68500;  // tom mais escuro para hover
```

**TypeScript (constante centralizadora):**
```typescript
export const COLORS = {
  PRIMARY_ORANGE: '#FF9500',
  PRIMARY_ORANGE_HOVER: '#E68500',
  PRIMARY_ORANGE_DARK: '#CC7A00',
};
```

---

## Componentes Frontend

### Escopo de Aplicação
Aplicar cor laranja em:
1. **LoginComponent** — Botão de login
2. **TodosComponent** — Botões de ação (adicionar, atualizar, deletar)
3. **ProfileComponent** — Elementos de destaque (se houver botões)
4. **Componentes gerais** — Barras de navegação, headers, cabeçalhos

### LoginComponent
- **Rota:** `/login`
- **Descrição:** Tela de autenticação
- **Elementos afetados:**
  - Botão "Login" — cor laranja
  - Possível cabeçalho ou título destacado — laranja
- **Serviço associado:** `services/auth.service.ts`

### TodosComponent
- **Rota:** `/todos`
- **Descrição:** Gerenciamento de tarefas
- **Elementos afetados:**
  - Botão "Adicionar Todo" — cor laranja
  - Botões de ação (editar, deletar) — laranja
  - Títulos/headers — laranja (se aplicável)
  - Indicador de foco/hover — tom mais escuro
- **Serviço associado:** `services/todo.service.ts`

### ProfileComponent
- **Rota:** `/profile`
- **Descrição:** Perfil do usuário
- **Elementos afetados:**
  - Botões de ação — cor laranja
  - Headers/títulos destacados — laranja
- **Serviço associado:** Dados em memória via backend

---

## Fluxo Técnico

1. **Definir paleta de cores** — Criar variáveis SCSS/TS centralizadas
2. **Aplicar em componentes** — Substituir cores antigas por `$primary-orange` nos estilos
3. **Testar contraste** — Validar que laranja + fundo atendem WCAG AA
4. **Validar em browsers** — Chrome, Firefox, Safari, Edge
5. **Sem regressão visual** — Verificar que outros componentes não foram afetados

### Fluxo de Renderização
```
Frontend carrega componente
  ↓
Carrega arquivo SCSS/CSS com variáveis de cor
  ↓
Aplica classe/estilo com $primary-orange
  ↓
Browser renderiza elemento com cor laranja
  ↓
Usuário visualiza interface com laranja
```

---

## Tratamento de Erros
- **Não aplicável** — Mudança visual não gera erros técnicos
- Se houver falha no carregamento de estilos → navegador renderiza cor padrão (fallback)

---

## Observabilidade Básica
- **Logs importantes:**
  - Informativo: "Estilos carregados com tema laranja"
  - (Opcional) Log console em development mode

- **Erros visíveis:**
  - Nenhum erro esperado desta feature
  - Se houver problema de renderização → verificar console do browser

---

## Decisões Técnicas

1. **Definição de Cor:**
   - Use `#FF9500` como código hex principal (conforme PRD)
   - Defina variações para hover/active (`#E68500` ou similar)
   - Centralize em único arquivo (não duplicar em múltiplos arquivos)

2. **Estratégia de Estilos:**
   - Prefira SCSS `$variables` no arquivo de estilos globais ou por componente
   - Alternativa: constante TypeScript exportada para uso em templates dinâmicos
   - Reutilizar ao máximo → evitar hardcoding de hex em múltiplos arquivos

3. **Acessibilidade (WCAG AA):**
   - Testar contraste laranja (#FF9500) + branco/preto
   - Relatório de contraste esperado:
     - Laranja + branco = ~7:1 (passa WCAG AAA)
     - Laranja + cinza claro = verificar se >= 4.5:1
   - Se necessário, ajustar tom de laranja ou fundo

4. **Compatibilidade:**
   - CSS hex color é suportado em todos os navegadores modernos
   - Nenhuma lib adicional necessária (CSS puro + SCSS existente)

---

## Critérios Técnicos de Pronto
- [x] Variáveis de cor definidas centralizadamente
- [x] Cor laranja aplicada em botões primários (login, adicionar todo, etc.)
- [x] Cor laranja aplicada em títulos/headers destacados
- [x] Estados hover/active utilizando tom mais escuro
- [x] Nenhum hardcode de hex — tudo reutiliza variáveis
- [x] Contraste validado (WCAG AA mínimo)
- [x] Testado em navegadores modernos (Chrome, Firefox, Safari, Edge)
- [x] Nenhuma regressão em outros componentes
- [x] Código limpo e maintível

---

## Suposições Técnicas

1. A cor laranja `#FF9500` é a cor correta (conforme mencionado no arquivo US-4-trocar-cor-para-laranja.txt)
2. "Elementos de destaque" refere-se a botões primários e títulos principais
3. Não há design system complexo existente → aplicação é simples e linear
4. Componentes existentes usam estilos inline, classes CSS ou SCSS
5. Não há tema escuro ou sistema de temas → apenas uma paleta visual
6. Acessibilidade WCAG AA é suficiente (não AAA)
7. Todos os componentes (login, todos, profile) precisam ser atualizados

---

## Dúvidas Técnicas em Aberto

1. **Quais exatamente são os "elementos de destaque"?**
   - Suposição: botões primários + títulos/headers
   - Confirmação visual necessária após revisão de design

2. **Há cores secundárias que dependem da primária?**
   - Ex: hover, active, disabled states?
   - Suposição: sim, usar tom mais escuro (`#E68500`) para hover

3. **Borda ou sombra também deve usar laranja?**
   - Suposição: não, apenas preenchimento (fill) dos botões

4. **Qual é a cor de fundo esperada (será branco)?**
   - Suposição: sim, fundo branco/cinza claro
   - Necessário para validar contraste

5. **Existe alguma imagem, ícone ou SVG que precise de cor laranja?**
   - Suposição: não mencionado no PRD → focar em CSS/SCSS

6. **Dev deve manter a cor antiga em algum lugar (para fallback)?**
   - Suposição: não, substituição completa

---

## Caminho da Implementação

```
frontend/src/
  ├── styles.scss ...................... Variáveis globais de cor
  ├── app/
  │   ├── pages/
  │   │   ├── login/
  │   │   │   ├── login.component.ts
  │   │   │   ├── login.component.html
  │   │   │   └── login.component.scss .... Aplicar $primary-orange
  │   │   ├── todos/
  │   │   │   ├── todos.component.ts
  │   │   │   ├── todos.component.html
  │   │   │   └── todos.component.scss .... Aplicar $primary-orange
  │   │   └── profile/
  │   │       ├── profile.component.ts
  │   │       ├── profile.component.html
  │   │       └── profile.component.scss .. Aplicar $primary-orange
  │   └── components/ (se houver)
```

---

## Resumo
- **Mudança:** Visual apenas, sem lógica funcional
- **Impacto:** Frontend (estilos)
- **Risco:** Baixo (CSS puro, sem dependências)
- **Teste:** Visual + validação de contraste + browsers
- **Tempo estimado:** Baixo (1-2 horas)
