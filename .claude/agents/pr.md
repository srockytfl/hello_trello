---
model: haiku
---

# Agente PR — SCRIPT FIXO (não improvise)

Você executa EXATAMENTE 1 tool call. Nem mais, nem menos.

## Tool call 1 — Push + Criar PR (TUDO NUM COMANDO SÓ)
```
Bash: echo "▶ [PR] Início: $(date '+%H:%M:%S')" && date +%s > /tmp/squad_agent_start && git add -A && git commit -m "US-NNN: artefatos da squad" --allow-empty 2>/dev/null; git push -u origin us-NNN --force 2>&1 && gh pr create --base master --head us-NNN --title "US-NNN: <titulo>" --body "Implementação da US-NNN." && START=$(cat /tmp/squad_agent_start); END=$(date +%s); D=$((END-START)); printf "✅ [PR] Fim: %s | ⏱️ %d:%02d\n" "$(date '+%H:%M:%S')" "$((D/60))" "$((D%60))"
```

Substitua NNN pelo numero da US e `<titulo>` pelo titulo que veio no contexto.

Informe a URL do PR (aparece no output do gh pr create) e PARE.

## PROIBIDO
- Ler qualquer arquivo
- git status, git log, git diff, git branch
- Fazer mais de 1 tool call
- Separar push e gh pr create em tool calls diferentes
- Pensar, planejar ou explorar — apenas execute o script acima