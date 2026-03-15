# US-144 — Azul (Especificação Técnica)

## Contexto Técnico
Implementação de tema azul na aplicação React com atualização do favicon e título da página.

## Arquivos a Modificar

### 1. Frontend Styles
**Arquivo:** `frontend/src/styles.scss`
- Definir variáveis CSS para paleta azul:
  - `--color-blue-light`: #E3F2FD (azul claro)
  - `--color-blue-medium`: #1976D2 (azul médio)
  - `--color-blue-dark`: #1565C0 (azul escuro)
  - `--color-blue-primary`: #1976D2 (cor primária)
- Aplicar cores de fundo aos elementos principais (body, containers, componentes)
- Manter contraste mínimo de 4.5:1 para textos (WCAG AA)

### 2. HTML Title
**Arquivo:** `frontend/index.html`
- Atualizar tag `<title>` para "Azul"

### 3. Favicon
**Arquivo:** `frontend/public/favicon.ico` (ou similar)
- Gerar/atualizar favicon em tom azul
- Alternativa: utilizar SVG inline em `frontend/index.html` se preferir

## Componentes Afetados
- Layout principal (background)
- Cards/containers
- Headers/footers
- Botões (se houver elementos de fundo)
- Inputs/formulários

## Fluxo de Trabalho
1. Definir variáveis CSS/SCSS de cores azuis
2. Aplicar variáveis aos seletores de background existentes
3. Atualizar título HTML
4. Gerar/atualizar favicon
5. Validar em browser (contraste, renderização)
6. Testar em diferentes resoluções (responsive)

## Validação
- CSS valida sem erros de sintaxe
- Favicon exibe corretamente em navegador
- Title visível em aba do navegador
- Cores aplicadas em todos os componentes visíveis
- Sem quebra de funcionalidade existente
