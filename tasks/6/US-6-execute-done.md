# Execute Done — US-6

## Arquivos criados/modificados
- `frontend/src/styles.scss` — Alteradas variáveis CSS `--blue` para `#22c55e` e `--blue-dark` para `#16a34a`; comentário atualizado de "primary pink — US-10" para "primary green — US-6"
- `frontend/src/app/shared/colors.ts` — Renomeadas chaves `PRIMARY_PINK`, `PRIMARY_PINK_HOVER`, `PRIMARY_PINK_DARK` para `PRIMARY_GREEN`, `PRIMARY_GREEN_HOVER`, `PRIMARY_GREEN_DARK`; valores atualizados para `#22c55e`, `#16a34a`, `#15803d` respectivamente; comentário de cabeçalho atualizado

## Endpoints implementados
N/A — mudança puramente visual, sem alterações de backend ou API.

## Componentes implementados
N/A — nenhum novo componente criado. A mudança de variáveis CSS propaga automaticamente para todos os componentes existentes (login, todos, profile, user-avatar) via cascata CSS.

## Observações
- As variáveis `--blue` e `--blue-dark` em `styles.scss` são consumidas por todos os componentes via `var(--blue)` / `var(--blue-dark)`, portanto a mudança nas variáveis globais é suficiente.
- Nenhuma referência às chaves antigas (`PRIMARY_PINK*`) foi encontrada em outros arquivos do projeto — a renomeação em `colors.ts` é segura.
- Os fundos dark-green (`--bg`, `--bg2`, `--bg3`, `--card`, `--hover`, `--border`) não foram alterados, conforme especificado no Plan.
