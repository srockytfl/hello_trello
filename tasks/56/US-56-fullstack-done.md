# US-56 — Fullstack Done

## Resumo
Implementada a nova tela de perfil com formulário funcional e validável, mantendo menu, header e footer sem alterações.

---

## Backend

### Endpoint adicionado
| Método | Rota | Descrição |
|--------|------|-----------|
| `PUT` | `/api/user/profile` | Atualiza nome, e-mail e cargo do usuário |

### Validações no backend (`server/index.js`)
- `name` obrigatório (trim)
- `email` obrigatório + regex de validação
- `role` opcional (mantém valor anterior se não enviado)
- Retorna `400` com mensagem descritiva em caso de erro
- Retorna o perfil atualizado em caso de sucesso

---

## Frontend

### Serviço atualizado
**`frontend/src/app/services/api.service.ts`**
- Adicionado método `updateUserProfile(data)` → `PUT /api/user/profile`

### Componente reescrito
**`frontend/src/app/pages/profile/profile.component.ts`**

#### Seções da tela
1. **Page Header** — botão "Voltar" + título (inalterado)
2. **Profile Card** — avatar com iniciais, nome, e-mail, cargo (inalterado, dados atualizados em tempo real após salvar)
3. **Formulário "Editar Perfil"** *(novo)*
   - Campo **Nome** (obrigatório, mínimo 2 caracteres) + mensagem de erro inline
   - Campo **E-mail** (obrigatório, validação de formato) + mensagem de erro inline
   - Campo **Cargo** (opcional)
   - Botão **Salvar Alterações** (desabilitado durante requisição)
   - Mensagem de **sucesso** (verde) com auto-dismiss em 4s
   - Mensagem de **erro** (vermelho) em caso de falha na API
4. **Botão "Sair da conta"** (inalterado)

#### Tecnologias Angular usadas
- `ReactiveFormsModule` + `FormBuilder` / `Validators`
- Signals (`signal()`) para estado reativo
- `@if` blocks para feedback condicional
- `form.markAllAsTouched()` para exibir erros ao submeter form inválido

#### Responsividade
- Layout centralizado com `max-width: 560px`
- Botão "Salvar" ocupa 100% da largura em telas < 480px
- Avatar reduz para 52px em telas < 480px

---

## Arquivos criados/modificados
| Arquivo | Operação |
|---------|----------|
| `server/index.js` | Modificado — adicionado `PUT /api/user/profile` |
| `frontend/src/app/services/api.service.ts` | Modificado — adicionado `updateUserProfile()` |
| `frontend/src/app/pages/profile/profile.component.ts` | Modificado — formulário de edição completo |
| `tasks/56/US-56-fullstack-done.md` | Criado — este arquivo |

---

## Critérios de Aceitação Atendidos
- [x] Nova tela implementada com formulário atualizado
- [x] Apenas o formulário alterado; menu, header e footer sem mudanças
- [x] Todos os campos funcionais e validáveis (nome, e-mail obrigatórios; cargo opcional)
- [x] Responsiva (mobile-first)
- [x] Mensagens de sucesso/erro exibidas após submissão
