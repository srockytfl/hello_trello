# Spec — US-10: Alterar Cor para Rosa

## Escopo Técnico
Derivado do PRD:
- **Backend necessário:** Não
- **Frontend necessário:** Sim (alteração de estilos CSS)

## Contratos de API
N/A — Esta US não requer novos endpoints ou alterações de contrato de API.

## Estrutura de Dados (em memória)
N/A — Nenhuma alteração em estrutura de dados ou persistência.

## Componentes Frontend

### LoginComponent
- **Rota:** `/login`
- **Descrição:** Página de login da aplicação
- **Elementos:**
  - Input para username
  - Input para password
  - Botão de login
  - Labels e textos
- **Impacto da mudança:** Se houver uso da cor alvo em botões, borders ou backgrounds
- **Serviço associado:** `auth.service.ts`

### TodosComponent
- **Rota:** `/todos`
- **Descrição:** Página de tarefas (todos)
- **Elementos:**
  - Lista de todos
  - Botões de ação (add, delete, toggle)
  - Inputs de texto
  - Checkboxes
- **Impacto da mudança:** Se houver uso da cor alvo em botões, checkboxes ou highlights
- **Serviço associado:** `todos.service.ts`

### ProfileComponent
- **Rota:** `/profile`
- **Descrição:** Página de perfil do usuário
- **Elementos:**
  - Informações do usuário (nome, email, role, etc)
  - Inputs de edição
  - Botões de ação
- **Impacto da mudança:** Se houver uso da cor alvo em botões, borders ou cards
- **Serviço associado:** `profile.service.ts`

## Fluxo Técnico

1. **Identificação da cor alvo:** Localizar qual cor CSS específica deve ser alterada para rosa
2. **Definição de variável CSS:** Criar ou alterar variável CSS (ex: `--primary-color`) para `#FF69B4`
3. **Aplicação em componentes:** Garantir que todos os componentes que utilizam esta cor herdam o novo valor
4. **Validação visual:** Verificar renderização em todos os componentes afetados
5. **Testes de contraste:** Confirmar que legibilidade e contraste WCAG AA são mantidos
6. **Verificação no console:** Garantir zero erros/warnings ao carregar a aplicação

## Implementação da Cor

### Opção A (Recomendado): Variável CSS Global
- Criar/alterar variável CSS em `styles.scss` ou `styles.css`
- Exemplo: `--primary-color: #FF69B4;`
- Todos os componentes usam a variável
- **Vantagem:** Centralizado, fácil manutenção

### Opção B: Alteração Direta em Componentes
- Alterar cor diretamente em arquivos `*.component.scss`
- Se houver hardcoding de cores
- **Vantagem:** Localizado, específico
- **Desvantagem:** Distribuído, difícil manutenção

**Decisão:** Preferir Opção A (variável CSS global) conforme convenções do projeto.

## Tratamento de Erros

### Validação Visual
- [ ] Cor rosa visível em todos os componentes afetados
- [ ] Sem mudanças em cores não-alvo
- [ ] Sem deformação ou quebra de layout

### Compatibilidade
- [ ] Funciona em navegadores modernos (Chrome, Firefox, Safari, Edge)
- [ ] CSS é válido e sem warnings

### Console
- [ ] Zero erros no console do navegador
- [ ] Zero warnings não-relacionados

## Observabilidade Básica

### Logs Importantes
- Não há backend logging necessário
- Frontend: verificar console para CSS parsing errors

### Validação
- Verificar visualmente em devtools a cor aplicada
- Inspecionar elemento para confirmar valor CSS correto

## Decisões Técnicas

1. **Variáveis CSS Global:** Usar `styles.scss` ou arquivo de tema centralizado
2. **Cor:** `#FF69B4` (conforme PRD, pode ser ajustado conforme design final)
3. **Componentes afetados:** Todos os que herdam a variável CSS
4. **Sem breaking changes:** Alteração é puramente visual
5. **Sem dependencies externas:** Não requer novas libs ou pacotes

## Critérios Técnicos de Pronto

- [ ] Variável CSS (ou alteração equivalente) implementada
- [ ] Cor rosa (#FF69B4) aplicada em todos os componentes alvo
- [ ] Legibilidade mantida: contraste WCAG AA validado
- [ ] Zero erros/warnings no console do navegador
- [ ] Aplicação renderiza corretamente em login, todos e profile
- [ ] Nenhuma regressão em funcionalidade existente
- [ ] CSS build completa sem erros
- [ ] Pronto para teste visual E2E

## Suposições Técnicas

- A cor rosa #FF69B4 será mantida conforme especificado ou ajustada conforme design final
- Existe um sistema de variáveis CSS centralizado (em `styles.scss` ou equivalente) onde a cor pode ser definida
- Todos os componentes herdam estilos globais
- Não há temas dinâmicos que precisem de lógica adicional (apenas CSS puro)
- Componentes afetados seguem convenções Angular do projeto
- Build do Angular CLI compilará corretamente a alteração CSS

## Dúvidas Técnicas em Aberto

1. **Qual exatamente é a cor alvo a ser alterada?**
   - Exemplo: Havia uma cor azul ou vermelho que deve virar rosa?
   - Ou é adicionar rosa em um novo contexto?

2. **Em quais componentes específicos a cor deve aparecer?**
   - Apenas botões?
   - Backgrounds?
   - Borders?
   - Textos?
   - Todos os acima?

3. **Existe mockup de design visual como referência?**
   - Necessário para validar cor exata e posicionamento

4. **Sistema de temas existe ou é puramente CSS global?**
   - Há suporte a dark mode ou múltiplos temas?
   - Cor rosa deve estar em todos os temas?

5. **Qual é o exato valor hexadecimal da cor rosa esperada?**
   - #FF69B4 é aproximação?
   - Há especificação de design com código exato?

## Notas Adicionais

- US é focada, simples e sem complexidade técnica
- Alteração é visual apenas, sem lógica de negócio
- Recomenda-se usar variáveis CSS para facilitar futuras mudanças de tema
- Testes visuais em E2E devem validar cor em diferentes resoluções (mobile, tablet, desktop)
- Acessibilidade: contraste é crítico para garantir legibilidade da cor rosa
