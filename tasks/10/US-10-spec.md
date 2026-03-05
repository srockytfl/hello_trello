# Spec – US-10: Tocar cor para rosa

## Escopo Técnico

Derivado do PRD:
- **Backend necessário:** não
- **Frontend necessário:** sim

Esta é uma mudança puramente visual e cosmética. Não há alterações funcionais, de API ou de lógica de negócio.

---

## Paleta de Cores Rosa

A aplicação adotará uma paleta rosa coerente, substituindo o esquema de cores azul atual. As cores são definidas globalmente em variáveis CSS e herdadas por todos os componentes.

### Tabela de Cores (Variáveis CSS)

| Variável | Propósito | Cor Anterior (Azul) | Cor Nova (Rosa) | Hex |
|----------|-----------|---------------------|-----------------|-----|
| `--bg` | Fundo principal | `#0A1628` | Rosa escuro | `#1A0A14` |
| `--bg2` | Fundo secundário | `#0F2040` | Rosa escuro 2 | `#2D1020` |
| `--bg3` | Fundo terciário | `#172B52` | Rosa escuro 3 | `#3D1629` |
| `--card` | Fundo de cards | `#172B52` | Rosa escuro 3 | `#3D1629` |
| `--hover` | Estado hover | `#1E3564` | Rosa escuro 4 | `#4E1A33` |
| `--blue` | Cor primária (botões, destaques) | `#3B82F6` | Rosa primário | `#EC4899` |
| `--blue-dark` | Cor primária escura | `#2563EB` | Rosa escuro | `#DB2777` |
| `--text` | Texto padrão | `#BFDBFE` | Rosa claro | `#FBCFE8` |
| `--text-bright` | Texto destacado | `#EFF6FF` | Rosa muito claro | `#FDF2F8` |
| `--muted` | Texto desativado | `#64748B` | Cinza rosado | `#9D7A8E` |
| `--green` | Estado sucesso/completo | `#94A3B8` | Rosa claro 2 | `#F9A8D4` |
| `--border` | Bordas | `#1E3564` | Rosa escuro 4 | `#4E1A33` |
| `--red` | Estado erro | `#EF4444` | Mantém vermelho | `#EF4444` |
| `--yellow` | Estado aviso | `#FACC15` | Mantém amarelo | `#FACC15` |

**Notas importantes:**
- Os nomes das variáveis (`--blue`, `--blue-dark`) são mantidos por conveniência (evita alterações em cascata nos componentes)
- Apenas os **valores hexadecimais** são alterados para tons de rosa
- Contraste de cores é mantido para acessibilidade (texto claro sobre fundos escuros)

---

## Alterações Estrutura de Dados

**Não há alterações estruturais.** Esta US afeta apenas a apresentação visual, não o banco de dados ou modelos de dados.

---

## Alterações de Componentes Frontend

**Todos os componentes Angular** herdam automaticamente a mudança de cor via variáveis CSS globais. Não há necessidade de modificar componentes individuais.

Componentes afetados (por herança):
- Login page
- TODO list page
- Buttons (todos os botões)
- Cards
- Headers e footers
- Inputs e formulários
- Elementos de estado (sucesso, erro, aviso)

---

## Arquivos a Modificar

| Arquivo | Tipo de Ação | Descrição |
|---------|-------------|-----------|
| `frontend/src/styles.scss` | Modificar | Atualizar variáveis CSS no bloco `:root` com novos valores de cores rosa |
| `frontend/src/index.html` | Modificar | Alterar `<title>` de "TODO List" para "Rosa" ou similar |

---

## Fluxo Técnico

1. **Usuário acessa o site**
   - Frontend carrega `index.html` com nova tag `<title>Rosa>`
   - Navegador exibe "Rosa" na aba

2. **Browser processa estilos**
   - `styles.scss` é compilado para CSS
   - Variáveis CSS (`:root`) são avaliadas
   - Todos os elementos que usam `var(--blue)`, `var(--bg)`, etc. recebem valores rosa

3. **Renderização Visual**
   - Fundos: alterados de azul escuro para rosa escuro
   - Botões: alterados de azul para rosa
   - Texto: alterado de azul-claro para rosa-claro
   - Estados (hover, active, focus): refletem a paleta rosa

4. **Resultado Final**
   - Usuário vê interface completamente em rosa
   - Funcionalidade permanece idêntica (sem mudanças de lógica)
   - Título da aba do navegador reflete a mudança

---

## Critérios Técnicos de Pronto

- [ ] Variáveis CSS em `frontend/src/styles.scss` atualizadas com valores rosa
- [ ] Tag `<title>` em `frontend/src/index.html` alterada para "Rosa"
- [ ] Todos os componentes refletem a mudança via herança de variáveis
- [ ] Contraste de cores mantém legibilidade (texto claro sobre fundos escuros)
- [ ] Frontend compila sem erros (`npm run build`)
- [ ] Interface renderiza corretamente em múltiplos navegadores
- [ ] Nenhuma funcionalidade foi quebrada (componentes continuam interativos)

---

## Notas de Implementação

- **Simplicidade:** A implementação é trivial — apenas alterar valores CSS
- **Sem refatoração:** Não redesenhar arquitetura, apenas trocar cores
- **Compatibilidade:** Variáveis CSS são suportadas em todos os navegadores modernos
- **Manutenibilidade:** Nomes de variáveis mantidos evita alterações em cascata

---

**Arquivo**: `tasks/10/US-10-spec.md`
