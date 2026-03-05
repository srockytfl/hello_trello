# QA Checklist — US-7: Trocar cor para amarelo

**Objetivo:** Validar que todos os elementos de destaque primário foram convertidos para amarelo (`#FACC15`) e atendem aos critérios de aceitação.

---

## Ambiente de Teste
- [ ] Frontend rodando em `http://localhost:4200`
- [ ] Backend rodando e acessível
- [ ] Credenciais de teste: `admin` / `123`
- [ ] Navegadores testados: Chrome (latest), Firefox (latest), Safari (latest)

---

## Tela: Login (`/localhost:4200/login`)

### Elemento: Botão "Entrar"

| Teste | Verificação | Chrome | Firefox | Safari | Status |
|-------|-------------|--------|---------|--------|--------|
| Cor de fundo | `background: #FACC15` (amarelo) | [ ] | [ ] | [ ] | |
| Cor do texto | `color: #0A1628` (escuro) | [ ] | [ ] | [ ] | |
| Hover state | `background: #E6B800` (amarelo escuro) | [ ] | [ ] | [ ] | |
| Disabled state | `opacity: 0.6` (desativado) | [ ] | [ ] | [ ] | |
| Contraste | Legível (ratio ≥ 4.5:1) | [ ] | [ ] | [ ] | |

### Elemento: Input (usuário/senha)

| Teste | Verificação | Chrome | Firefox | Safari | Status |
|-------|-------------|--------|---------|--------|--------|
| Foco — borda | `border-color: #FACC15` (amarelo) | [ ] | [ ] | [ ] | |
| Foco — visibilidade | Borda claramente visível | [ ] | [ ] | [ ] | |
| Sem foco | `border-color: var(--border)` (cinza) | [ ] | [ ] | [ ] | |

---

## Tela: Todos (`/localhost:4200/todos`)

### Elemento: Logo (ícone `check_circle`)

| Teste | Verificação | Chrome | Firefox | Safari | Status |
|-------|-------------|--------|---------|--------|--------|
| Cor | `color: #FACC15` (amarelo) | [ ] | [ ] | [ ] | |
| Visibilidade | Contrasta com background | [ ] | [ ] | [ ] | |
| Tamanho | Proporções mantidas (20px) | [ ] | [ ] | [ ] | |

### Elemento: Botão "Adicionar"

| Teste | Verificação | Chrome | Firefox | Safari | Status |
|-------|-------------|--------|---------|--------|--------|
| Cor de fundo | `background: #FACC15` (amarelo) | [ ] | [ ] | [ ] | |
| Cor do texto | `color: #0A1628` (escuro) | [ ] | [ ] | [ ] | |
| Cor do ícone | `color: #0A1628` (escuro) | [ ] | [ ] | [ ] | |
| Hover state | `background: #E6B800` (amarelo escuro) | [ ] | [ ] | [ ] | |
| Disabled state | `opacity: 0.5` quando vazio | [ ] | [ ] | [ ] | |
| Contraste | Legível (ratio ≥ 4.5:1) | [ ] | [ ] | [ ] | |

### Elemento: Input "Nova tarefa..."

| Teste | Verificação | Chrome | Firefox | Safari | Status |
|-------|-------------|--------|---------|--------|--------|
| Foco — borda | `border-color: #FACC15` (amarelo) | [ ] | [ ] | [ ] | |
| Placeholder | Texto cinza visível | [ ] | [ ] | [ ] | |
| Digitação | Texto entrável normalmente | [ ] | [ ] | [ ] | |

### Elemento: Filtros (Todas/Pendentes/Concluídas)

| Teste | Verificação | Chrome | Firefox | Safari | Status |
|-------|-------------|--------|---------|--------|--------|
| Filtro ativo — borda | `border-bottom: 2px solid #FACC15` (amarelo) | [ ] | [ ] | [ ] | |
| Filtro ativo — texto | `color: text-bright` (branco) | [ ] | [ ] | [ ] | |
| Filtro inativo | `border-bottom: transparent` | [ ] | [ ] | [ ] | |
| Filtro inativo — hover | `color: var(--text)` (cinza claro) | [ ] | [ ] | [ ] | |
| Clique | Troca de filtro funciona | [ ] | [ ] | [ ] | |

### Elemento: Checkbox (tarefas)

#### Estado: Desmarcado
| Teste | Verificação | Chrome | Firefox | Safari | Status |
|-------|-------------|--------|---------|--------|--------|
| Borda | `border-color: var(--muted)` (cinza) | [ ] | [ ] | [ ] | |
| Hover — borda | `border-color: #FACC15` (amarelo) | [ ] | [ ] | [ ] | |
| Ícone check | Não visível (hidden) | [ ] | [ ] | [ ] | |

#### Estado: Marcado (concluído)
| Teste | Verificação | Chrome | Firefox | Safari | Status |
|-------|-------------|--------|---------|--------|--------|
| Background | `background: #FACC15` (amarelo) | [ ] | [ ] | [ ] | |
| Borda | `border-color: #FACC15` (amarelo) | [ ] | [ ] | [ ] | |
| Ícone check | `color: #0A1628` (escuro) e visível | [ ] | [ ] | [ ] | |
| Contraste | Ícone legível sobre fundo | [ ] | [ ] | [ ] | |

#### Interação
| Teste | Verificação | Chrome | Firefox | Safari | Status |
|-------|-------------|--------|---------|--------|--------|
| Clique → marca | Checkbox muda para amarelo | [ ] | [ ] | [ ] | |
| Clique → desmarca | Checkbox volta ao estado padrão | [ ] | [ ] | [ ] | |

---

## Validação Transversal

### Acessibilidade (WCAG AA)

| Teste | Verificação | Status |
|-------|-------------|--------|
| Contraste botões | Ratio text vs fundo ≥ 4.5:1 | [ ] |
| Contraste ícone checkbox | Ratio icon vs fundo ≥ 4.5:1 | [ ] |
| Foco visível | Inputs focusados têm borda clara | [ ] |
| Keyboard navigation | Tab atravessa todos os elementos | [ ] |

### Regressões Visuais

| Elemento | Original | Alterado? | Status |
|----------|----------|-----------|--------|
| Cores de estado (vermelho/verde) | Sem alteração | [ ] Não | [ ] |
| Layout principal | Sem alteração | [ ] Não | [ ] |
| Tipografia | Sem alteração | [ ] Não | [ ] |
| Espaçamento | Sem alteração | [ ] Não | [ ] |
| Stats (pendentes/concluídas) | Sem alteração | [ ] Não | [ ] |

---

## Resumo de Resultados

### Por Navegador
- **Chrome:** [ ] PASS / [ ] FAIL
- **Firefox:** [ ] PASS / [ ] FAIL
- **Safari:** [ ] PASS / [ ] FAIL

### Geral
- **Funcionalidade:** [ ] PASS / [ ] FAIL
- **Acessibilidade:** [ ] PASS / [ ] FAIL
- **Regressões:** [ ] Nenhuma / [ ] Encontradas

---

## Observações e Bugs Encontrados

```
[Espaço para notas de QA]




```

---

## Assinatura de Aprovação

- **Testador:** ___________________
- **Data:** ___________________
- **Status Final:** [ ] APROVADO / [ ] REPROVADO / [ ] REPROVADO COM OBSERVAÇÕES

---

**Última atualização:** 2026-03-05
**Versão do checklist:** 1.0
