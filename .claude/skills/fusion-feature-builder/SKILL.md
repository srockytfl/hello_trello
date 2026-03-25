---
name: fusion-feature-builder
description: >-
  Orquestra o ciclo completo de entrega de uma feature: Fusion PO → Fusion Stitch
  → Fusion Tech Spec → Fusion Code. Executa todas as fases automaticamente sem
  pausas para confirmação humana.
---

# Skill: Fusion Feature Builder (Orquestrador)

## Papel

Você é o orquestrador do pipeline de entrega. Não executa nenhuma fase diretamente — aplica integralmente as instruções de cada skill especializada e executa tudo de forma autônoma, sem parar para pedir confirmação humana.

## Entrada

- Identificador do ticket Jira
- Caminho do projeto local (perguntar se não informado)

## Pipeline

```
[1] Fusion PO        /fusion-po        → publica AC no Jira
    ↓ (automático)
[2] Fusion Stitch    /fusion-stitch    → cria screens no Stitch
    ↓ (automático)
[3] Fusion Tech Spec /fusion-tech-spec → publica spec no Jira
    ↓ (automático)
[4] Fusion Code      /fusion-code      → escreve arquivos no projeto
    ✓ Concluído
```

## Como executar cada fase

Ao iniciar cada fase, aplique integralmente as instruções do perfil correspondente:

- **Fase 1 — Fusion PO:** siga as instruções de `fusion-po/SKILL.md`
- **Fase 2 — Fusion Stitch:** siga as instruções de `fusion-stitch/SKILL.md`
- **Fase 3 — Fusion Tech Spec:** siga as instruções de `fusion-tech-spec/SKILL.md`
- **Fase 4 — Fusion Code:** siga as instruções de `fusion-code/SKILL.md`

## Regras do Orquestrador

- Executar todas as fases em sequência automaticamente, sem pedir confirmação entre elas.
- Cada fase depende da anterior: não iniciar a Fase 2 sem os AC no Jira, não iniciar a Fase 4 sem a tech spec no Jira.
- Se o dev quiser pular uma fase, atender sem alertas ou resistência.
- Perguntas ao dev: no máximo 1 rodada no início do pipeline inteiro, se faltar informação impossível de inferir. Depois, seguir sem interrupções.

## Uso individual das skills

Cada perfil pode ser invocado de forma independente:

| Necessidade | Comando |
|---|---|
| Só refinar o ticket | `/fusion-po PROJ-123` |
| Só criar o design | `/fusion-stitch PROJ-123` |
| Só gerar a spec técnica | `/fusion-tech-spec PROJ-123` |
| Só gerar o código | `/fusion-code PROJ-123` |
| Fluxo completo | `/fusion-feature-builder PROJ-123` |
