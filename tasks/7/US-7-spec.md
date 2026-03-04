# Spec — US-7: Trocar cor para amarelo

## Escopo Técnico
Derivado do PRD:
- Backend necessário: **não**
- Frontend necessário: **sim**

### Justificativa
Esta mudança é exclusivamente de estilo visual (CSS/SCSS). O backend não requer alterações — nenhum novo endpoint ou modificação de dados é necessária.

## Contratos de API

**N/A** — Nenhum novo endpoint será criado. Os endpoints existentes permanecem inalterados:
- `GET /api/title`
- `GET /api/user/profile`
- `PUT /api/user/profile`
- `POST /api/login`
- `GET /api/todos`
- `POST /api/todos`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`

## Estrutura de Dados (em memória)

Sem alterações. Dados existentes permanecem:

```
userProfile = {
  name: string,
  email: string,
  role: string,
  joinedAt: string
}

todos = [
  { id: number, text: string, done: boolean }
]

appTitle = string
```

## Componentes Frontend

### Escopo de Estilos

A cor primária (amarelo) será aplicada nos seguintes contextos:

#### 1. **Variáveis de Tema (CSS Custom Properties)**
   - **Localização:** `frontend/src/styles.scss` (`:root`)
   - **Alteração:**
     - Renomear/redirecionar `--blue` para usar tons de amarelo
     - Atualizar cores relacionadas: `--blue-dark`, `--blue-darker`, `--blue-glow`
     - Cor primária: `#FFD700` (ouro padrão)
     - Tom mais escuro: derivado de `#FFD700` (ex: `#E6C200`)
     - Ton mais claro/glow: `rgba(255, 215, 0, 0.3)` para efeitos brilhantes

#### 2. **Componentes Afetados**
   - **Header/Navbar** — Deve exibir amarelo como cor de destaque
   - **Botões Primários** — Fundos/bordas em amarelo
   - **Links de Navegação** — Estado ativo em amarelo
   - **Inputs Focus** — Outline/border em amarelo
   - **Cards Destaque** — Bordas ou acentos em amarelo
   - **Badges/Status** — Elementos que representem prioridade/destaque em amarelo

#### 3. **Acessibilidade (WCAG AA)**
   - Texto sobre fundo amarelo deve ter **contraste ≥ 4.5:1** para texto normal
   - Texto sobre fundo amarelo deve ter **contraste ≥ 3:1** para texto grande (18pt+)
   - Usar texto escuro (ex: `#000` ou `#333`) sobre amarelo para melhor legibilidade
   - Cores não devem ser o único indicador de status (adicionar ícones/texto quando relevante)

### Arquivo de Estilos
- **Localização principal:** `frontend/src/styles.scss`
- **Escopo:** Variáveis CSS no seletor `:root`
- **Abordagem:** Manter sistema de variáveis existente, apenas alterar valores

## Fluxo Técnico

1. **Frontend carrega** `styles.scss`
2. **CSS Custom Properties** são definidas com cores amarelas
3. **Componentes Angular** usam variáveis CSS via `var(--blue)`, etc.
4. **Navegador renderiza** elementos com cores amarelas
5. **Usuário visualiza** interface com tema amarelo consistente

## Tratamento de Erros

Sem aplicabilidade — mudança puramente estilística não tem erros de lógica.

Validação em testes:
- [ ] Cores aparecem corretamente em diferentes browsers (Chrome, Firefox, Safari)
- [ ] Contraste está conforme WCAG AA
- [ ] Nenhuma quebra visual em responsive design

## Observabilidade Básica

Sem aplicabilidade — mudança não requer logging ou observabilidade de negócio.

## Decisões Técnicas

1. **Sistema de Variáveis CSS**: Aproveitar o sistema de variáveis existente (`:root`)
   - Motivo: Projeto já utiliza CSS custom properties; reutilização = simples e consistente

2. **Paleta de Amarelos**: Usar tons derivados de `#FFD700`
   - Primário: `#FFD700` (ouro padrão)
   - Escuro: `#E6C200` ou `#D4AF37` (para hover/active)
   - Claro/Glow: `rgba(255, 215, 0, 0.3)` (para shadows/highlights)
   - Motivo: Mantém legibilidade e contraste WCAG

3. **Sem Alteração HTML**: Apenas CSS é modificado
   - Motivo: PRD exige mudança visual, não estrutural; evita riscos

4. **Manter Compatibilidade**: CSS custom properties são suportadas em todos browsers modernos
   - Motivo: Projeto segmenta Chrome, Firefox, Safari

## Critérios Técnicos de Pronto

- [ ] Variáveis CSS em `:root` atualizadas para tons de amarelo
- [ ] Todos elementos principais exibem amarelo consistentemente
- [ ] Contraste WCAG AA validado (texto sobre amarelo legível)
- [ ] Nenhuma quebra visual em responsive design
- [ ] Elementos não afetados pelo tema (ex: dados, status) mantêm cores apropriadas
- [ ] Testes E2E passam em Chrome, Firefox, Safari
- [ ] Build frontend completa sem erros

## Suposições Técnicas

1. **"Elementos principais"** refere-se a:
   - Header/Navbar
   - Botões primários (CTA)
   - Links ativos em navegação
   - Elementos com classe "primary" ou "accent"
   - Borders/shadows com efeito de destaque

2. **Cor amarela específica**: `#FFD700` (ouro padrão CSS), variações derivadas para contraste

3. **Sem novo sistema de temas**: Mudança é estática, não dinâmica (usuário não escolhe cores)

4. **Todos os browsers listados** em CLAUDE.md suportam CSS custom properties (Chrome, Firefox, Safari, Edge)

## Dúvidas Técnicas em Aberto

1. **Quais componentes exatamente são "elementos principais"?**
   - Recomendação: Implementador deve revisar design/mockup para validar escopo
   - Marcar como não-blocante: Implementação começa com header + botões primários

2. **Contraste WCAG: qual será a cor de fundo dos elementos amarelos?**
   - Exemplo: Amarelo sobre branco/claro vs. amarelo sobre escuro
   - Recomendação: Definir pares cor-texto durante implementação

3. **Elementos como badges/status devem usar amarelo?**
   - Exemplo: Um badge com status "warning" pode ser amarelo, mas um "success" deve ser verde
   - Recomendação: Aplicar amarelo apenas em contextos primários/destaque, não status

4. **Será necessário dark mode/light mode?**
   - PRD não menciona; suposição é tema único
   - Se future: sistema CSS já está preparado

## Resumo Executivo

**US-7** é uma alteração **exclusivamente de CSS** que redefine a cor primária da aplicação de rosa (`#FF69B4`) para amarelo (`#FFD700`), aplicando a mudança consistentemente em elementos de destaque (header, botões, navegação, highlights).

Sem alterações de backend, dados ou estrutura HTML. Implementação é simples, isolada e de baixo risco — reduz-se a atualizar variáveis de cor em `styles.scss` e validar acessibilidade (WCAG AA).
