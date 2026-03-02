# PRD — US-7: Trocar cor para amarelo

## Problema
A aplicação possui uma identidade visual genérica. Os usuários têm dificuldade em identificar visualmente os elementos principais da interface devido à falta de uma cor primária clara e consistente. Isso afeta a experiência visual e o reconhecimento da marca.

## Objetivo
Aplicar amarelo (#FFD700 ou equivalente) como cor primária em elementos principais da interface (botões, headers, destaques) de forma consistente em toda a aplicação, melhorando a experiência visual e a identidade visual do produto.

## Sucesso Esperado
Todos os elementos principais (botões, headers, destaques) exibem a cor amarela de forma consistente. O contraste entre a cor amarela e textos/elementos sobrepostos atende ao padrão WCAG AA. A aplicação funciona corretamente em navegadores modernos (Chrome, Firefox, Safari).

## Requisitos Funcionais
1. Identificar todos os elementos principais da interface (botões, headers, destaques) que devem receber cor amarela
2. Aplicar a cor amarela (#FFD700 ou equivalente) nesses elementos
3. Garantir consistência de cores em toda a aplicação
4. Manter as alterações de cor no frontend Angular de forma persistida

## Requisitos Não-Funcionais
- Contraste: Cor amarela deve atender WCAG AA quando combinada com textos/elementos sobrepostos
- Compatibilidade: Funcionamento correto em navegadores modernos (Chrome, Firefox, Safari)
- Performance: Sem impacto na performance da aplicação

## Fluxo do Usuário
1. Usuário acessa a aplicação web (Angular)
2. Sistema carrega a interface com elementos principais em amarelo
3. Usuário interage com botões, headers e destaques amarelos
4. Elementos mantêm consistência visual em todas as páginas

## Critérios de Aceitação
- [ ] Todos os botões principais da aplicação exibem fundo ou borda em amarelo (#FFD700)
- [ ] Headers/cabeçalhos principais da aplicação exibem amarelo
- [ ] Elementos de destaque/ênfase utilizam amarelo de forma consistente
- [ ] O contraste entre amarelo e texto sobreposto atende WCAG AA
- [ ] A cor amarela persiste no frontend Angular (estilos CSS/SCSS)
- [ ] Aplicação funciona corretamente em Chrome, Firefox e Safari
- [ ] Nenhum endpoint da API foi alterado (funcionalidades não-visuais intactas)

## Suposições
- Assume-se que "elementos principais" refere-se a: botões de ação, headers, barras de navegação e componentes de destaque
- Cor padrão será #FFD700 (ouro padrão) ou equivalente aprovado
- As alterações serão apenas via CSS/SCSS, sem mudanças estruturais em HTML
- A aplicação atualmente usa Angular no frontend e Express no backend
- Não há banco de dados ou autenticação real envolvida na mudança

## Dúvidas em Aberto
- Qual é a exata definição de "elementos principais"? (Listar componentes específicos)
- Será necessário criar variáveis/tokens de cor reutilizáveis ou aplicar cor diretamente?
- Quem aprovará visualmente a aplicação com a nova cor?
- Existe mockup ou design preview da aplicação com amarelo?

## Fora do Escopo
- Mudança de paleta de cores completa
- Alterações na estrutura HTML
- Implementação de novo sistema de temas
- Mudanças na API ou lógica de backend
- Autenticação ou funcionalidades de banco de dados

## Notas
- Esta US é puramente visual/frontend
- As alterações devem ser aplicadas em arquivos CSS/SCSS do projeto Angular
- Não há impacto em endpoints da API
- QA deve validar em múltiplos navegadores e verificar acessibilidade (contraste WCAG AA)
- Foco no happy path: aplicação carrega com amarelo visível em elementos-chave
- Possível próxima iteração: expandir amarelo para outros elementos secundários ou implementar sistema de temas configurável
