# US-1 — Trocar cor para azul — Implementação Concluída

## Resumo

As variáveis CSS de acento foram corrigidas de dourado para azul real, conforme solicitado na US-1. A mudança é exclusivamente de front-end (CSS custom properties no tema global).

---

## Arquivos Modificados

### 1. `frontend/src/styles.scss`

| Variável | Valor Anterior | Valor Novo |
|----------|----------------|------------|
| `--blue` | `#FFD700` (ouro) | `#3B82F6` (azul — Tailwind blue-500) |
| `--blue-dark` | `#C8A800` (ouro escuro) | `#2563EB` (azul escuro — Tailwind blue-600) |

---

## Elementos Afetados (via variável CSS — sem alteração direta)

Todos os elementos que referenciavam `var(--blue)` e `var(--blue-dark)` passaram automaticamente a exibir azul:

| Componente | Elemento | Uso da variável |
|------------|----------|-----------------|
| `LoginComponent` | Botão "Entrar" | `background: var(--blue)` / hover `var(--blue-dark)` |
| `LoginComponent` | Borda de foco dos inputs | `border-color: var(--blue)` |
| `TodosComponent` | Ícone do logo (header) | `color: var(--blue)` |
| `TodosComponent` | Botão "Adicionar" | `background: var(--blue)` / hover `var(--blue-dark)` |
| `TodosComponent` | Borda de foco do input | `border-color: var(--blue)` |
| `TodosComponent` | Indicador ativo nos filtros | `border-bottom-color: var(--blue)` |
| `TodosComponent` | Checkbox marcado | `background/border: var(--blue)` |

---

## Endpoints de API

Nenhum endpoint foi criado ou alterado. A US é exclusivamente de front-end.

---

## Critérios de Aceitação Atendidos

- [x] **Cor azul correta**: `#3B82F6` (azul vibrante, amplamente reconhecível)
- [x] **Contraste mínimo 4.5:1**: `#3B82F6` + texto `#111111` → contraste ≈ 5.05:1 (WCAG AA ✅)
- [x] **Todos os navegadores modernos**: CSS custom properties têm suporte em Chrome, Firefox, Safari e Edge
- [x] **Sem quebra de funcionalidade**: apenas variáveis CSS alteradas, sem toque em lógica

---

## Regras Técnicas Atendidas

- ✅ Sem hardcoding: toda referência usa `var(--blue)` / `var(--blue-dark)` nos componentes existentes
- ✅ Apenas cores de acento alteradas; backgrounds, texto e demais cores intactos (fora do escopo)
