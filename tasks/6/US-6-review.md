# Review — US-6: Trocar cor para verde

## Status: APROVADO

## Checklist
- [x] Endpoints conforme contrato (N/A — mudança puramente visual, sem endpoints)
- [x] Componentes conforme Plan (N/A — sem novos componentes; cascata CSS propaga automaticamente)
- [x] Rotas registradas (N/A — nenhuma rota nova)
- [x] Padrões do projeto seguidos (SCSS global em `styles.scss`, TypeScript em `colors.ts`, kebab-case)
- [x] `--blue` em `styles.scss` vale `#22c55e` (verde primário — US-6)
- [x] `--blue-dark` em `styles.scss` vale `#16a34a` (verde hover/active — US-6)
- [x] Comentário de `styles.scss` atualizado de "primary pink — US-10" para "primary green — US-6"
- [x] `colors.ts` renomeado de `PRIMARY_PINK*` para `PRIMARY_GREEN*` com valores corretos
- [x] Nenhuma referência a rosa/pink nos arquivos modificados
- [x] Nenhuma funcionalidade extra implementada fora do escopo
- [x] Nenhum arquivo sensível exposto

## Verificação dos Arquivos

### `frontend/src/styles.scss`
- `--blue: #22c55e` ✅ (conforme Plan e Spec)
- `--blue-dark: #16a34a` ✅ (conforme Plan e Spec)
- Comentário: `/* primary green — US-6 */` ✅
- Fundos dark-green (`--bg`, `--bg2`, `--bg3`, `--card`, `--hover`, `--border`) não alterados ✅

### `frontend/src/app/shared/colors.ts`
- `PRIMARY_GREEN: '#22c55e'` ✅ (conforme Plan)
- `PRIMARY_GREEN_HOVER: '#16a34a'` ✅ (conforme Plan)
- `PRIMARY_GREEN_DARK: '#15803d'` ✅ (conforme Plan)
- Cabeçalho atualizado para "Centralized color palette — US-6" ✅
- Zero referências a `PRIMARY_PINK*` ou `#FF69B4` / `#E05A9E` ✅

## Problemas Encontrados
Nenhum.

## Conclusão
A implementação está completa, correta e estritamente dentro do escopo definido.
Ambos os arquivos especificados no Plan foram modificados com os valores exatos solicitados.
As variáveis CSS globais `--blue` e `--blue-dark` foram atualizadas para tons de verde (`#22c55e` e `#16a34a`),
garantindo que todos os componentes existentes (login, todos, profile, user-avatar) recebam a nova paleta
verde automaticamente via cascata CSS, sem necessidade de alterações individuais.
O arquivo `colors.ts` reflete a mesma paleta em TypeScript, com renomeação semântica adequada.
Nenhum rastro de rosa/pink permanece nos artefatos modificados.
