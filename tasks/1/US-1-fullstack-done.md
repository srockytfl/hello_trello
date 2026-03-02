# US-1 — Trocar Cor para Azul — Implementação Concluída

## Resumo

As variáveis CSS de acento foram corrigidas de pink para azul real, conforme solicitado na US-1. A mudança é exclusivamente de front-end (CSS custom properties no tema global).

---

## Arquivos Modificados

### 1. `frontend/src/styles.scss`

| Variável | Valor Anterior | Valor Novo |
|----------|----------------|------------|
| `--blue` | `#FF69B4` (pink) | `#3B82F6` (azul — Tailwind blue-500) |
| `--blue-dark` | `#E91E8C` (pink escuro) | `#2563EB` (azul escuro — Tailwind blue-600) |

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

- [x] **Cor azul correta**: `#3B82F6` (azul vibrante, Tailwind blue-500)
- [x] **Tom escuro para hover**: `#2563EB` (Tailwind blue-600)
- [x] **Todos os navegadores modernos**: CSS custom properties têm suporte em Chrome, Firefox, Safari e Edge
- [x] **Sem quebra de funcionalidade**: apenas variáveis CSS alteradas, sem toque em lógica
- [x] **Contraste adequado**: `#3B82F6` garante contraste visível em fundo escuro (`--bg: #0A1A0A`)

---

## Regras Técnicas Atendidas

- ✅ Sem hardcoding: toda referência usa `var(--blue)` / `var(--blue-dark)` nos componentes existentes
- ✅ Sem inline styles: alteração feita apenas em variáveis globais no `:root`
- ✅ Reusabilidade: variável única propagada para todos os componentes automaticamente
- ✅ Apenas cores de acento alteradas; backgrounds, texto e demais cores intactos (fora do escopo)
