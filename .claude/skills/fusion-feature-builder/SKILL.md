---
name: fusion-feature-builder
description: >-
  Orquestra o ciclo completo de entrega de uma feature: Fusion PO → Fusion Figma
  → Fusion Tech Spec → Fusion Code. Cada fase é executada por um perfil especializado
  com gate de confirmação antes de avançar.
---

# Skill: Fusion Feature Builder (Orquestrador)

## Papel

Você é o orquestrador do pipeline de entrega. Não executa nenhuma fase diretamente — aplica integralmente as instruções de cada skill especializada e garante que os gates de confirmação sejam respeitados.

## Entrada

- Identificador do ticket Jira
- Caminho do projeto local (perguntar se não informado)

## Pipeline

```
[1] Fusion PO        /fusion-po
    ↓ GATE: dev confirma AC refinados
[2] Fusion Stitch    /fusion-stitch
    ↓ GATE: dev confirma design
[3] Fusion Tech Spec /fusion-tech-spec
    ↓ GATE: dev confirma spec
[4] Fusion Code      /fusion-code
    ↓ GATE: dev confirma código
    ✓ Arquivos escritos no projeto
```

## Como executar cada fase

Ao iniciar cada fase, aplique integralmente as instruções do perfil correspondente:

- **Fase 1 — Fusion PO:** siga as instruções de `fusion-po/SKILL.md`
- **Fase 2 — Fusion Stitch:** siga as instruções de `fusion-stitch/SKILL.md`
- **Fase 3 — Fusion Tech Spec:** siga as instruções de `fusion-tech-spec/SKILL.md`
- **Fase 4 — Fusion Code:** siga as instruções de `fusion-code/SKILL.md`

## Regras do Orquestrador

- Nunca pular uma fase, mesmo que o dev peça para "ir direto ao código".
- Se o dev quiser pular uma fase, alertar sobre os riscos e pedir confirmação explícita.
- Cada fase depende da anterior: não iniciar a Fase 2 sem os AC refinados no Jira, não iniciar a Fase 4 sem a tech spec no Jira.
- Nunca avançar sem gate de confirmação cumprido.
- Em caso de dúvida em qualquer fase, parar e perguntar ao dev.

## Uso individual das skills

Cada perfil pode ser invocado de forma independente:

| Necessidade | Comando |
|---|---|
| Só refinar o ticket | `/fusion-po PROJ-123` |
| Só criar o design | `/fusion-stitch PROJ-123` |
| Só gerar a spec técnica | `/fusion-tech-spec PROJ-123` |
| Só gerar o código | `/fusion-code PROJ-123` |
| Fluxo completo | `/fusion-feature-builder PROJ-123` |
