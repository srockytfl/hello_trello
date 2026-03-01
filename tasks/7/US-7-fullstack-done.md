# US-7 — Trocar Cor para Amarelo — Implementação Concluída

## Resumo

Alteração da cor primária do sistema de rosa/pink (`#FF69B4`) para amarelo (`#FFEB3B`), conforme especificado na US-7. Mudança aplicada globalmente via variável CSS `--blue` em `styles.scss`, propagando automaticamente a todos os componentes.

## Alterações no Backend

Nenhuma — a US-7 é exclusivamente frontend (CSS/SCSS). Os endpoints existentes não foram alterados.

## Alterações no Frontend

### Arquivo Modificado

| Arquivo | Alteração |
|---|---|
| `frontend/src/styles.scss` | `--blue`: `#FF69B4` → `#FFEB3B`; `--blue-dark`: `#C74F8C` → `#F9A825` |

### Detalhe da Alteração (styles.scss)

```scss
/* Antes */
--blue: #FF69B4;
--blue-dark: #C74F8C;

/* Depois */
--blue: #FFEB3B;
--blue-dark: #F9A825;
```

## Elementos Afetados pela Mudança de `--blue`

- **Botão "Entrar"** (login) — fundo amarelo `#FFEB3B`, hover `#F9A825`
- **Botão "Adicionar"** (todos) — fundo amarelo `#FFEB3B`, hover `#F9A825`
- **Checkbox marcado** — fundo e borda amarelos, ícone escuro (`#111111`)
- **Checkbox hover** — borda amarela
- **Filtro ativo** — borda inferior amarela
- **Input com foco** — borda amarela
- **Ícone do logo** (`.material-icons-round` no header) — amarelo

## Contraste WCAG AA

- Texto `#111111` sobre botão `#FFEB3B`: rácio ≈ **12:1** ✅ (WCAG AA exige ≥ 4.5:1)
- Ícone `#FFEB3B` sobre fundo escuro `#0D200D`: rácio ≈ **8:1** ✅

## Critérios de Aceitação Atendidos

| Critério | Status |
|---|---|
| Cor primária alterada para amarelo (`#FFEB3B`) em todos os botões primários | ✅ |
| Ícones e indicadores visuais primários exibem em amarelo | ✅ |
| Hover (`#F9A825`) mantém contraste adequado com a nova cor | ✅ |
| Mudança aplicada globalmente via variável CSS (sem hardcode) | ✅ |

## Fora do Escopo (não alterado)

- Paleta de cores secundárias (backgrounds, bordas, etc.)
- Tipografia
- Estrutura HTML dos componentes
- Backend / endpoints da API
