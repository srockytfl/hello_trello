# US-36 — Footer: Novo Título "Trelo by AI" — Conclusão

## Resumo

Alteração de UI pura: adição do título **"Trelo by AI"** no footer da aplicação, reforçando a identidade da marca.

---

## O que foi implementado

### Frontend

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `frontend/src/app/components/footer/footer.component.ts` | Modificado | Adição do título "Trelo by AI" e estilo `.footer-brand` |

### Backend

Nenhuma alteração necessária (mudança exclusiva de UI).

---

## Detalhes da Mudança

### `footer.component.ts`

**Template:** Adicionado elemento `<p class="footer-brand">Trelo by AI</p>` acima do copyright, com semântica HTML adequada (elemento de parágrafo para identificação de marca).

**Estilos (`.footer-brand`):**
- `font-size: 0.95rem` — levemente maior que o texto de copyright
- `font-weight: 600` — destaque visual sem quebrar consistência
- `color: #c0c0d0` — ligeiramente mais claro que o `#a0a0b0` do corpo, mas dentro da paleta existente
- `letter-spacing: 0.03em` — sutil espaçamento para melhorar legibilidade
- `margin: 0 0 4px` — espaçamento mínimo entre o título e o copyright

---

## Critérios de Aceitação Atendidos

1. ✅ O footer exibe o texto "Trelo by AI"
2. ✅ O título está visível e bem posicionado (acima do copyright)
3. ✅ O estilo é consistente com o design do footer existente (mesma paleta de cores escura)
4. ✅ Semântica HTML adequada (`<p>` com classe descritiva)

---

## Arquivos Criados/Modificados

- **Modificado:** `frontend/src/app/components/footer/footer.component.ts`
- **Criado:** `tasks/36/US-36-fullstack-done.md`
