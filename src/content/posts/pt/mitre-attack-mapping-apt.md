---
title: "Mapeando TTPs de um APT para o MITRE ATT&CK"
date: 2026-02-18
lang: pt
slug: mitre-attack-mapping-apt
tags: ["MITRE ATT&CK", "APT", "TTP"]
summary: "Transformando um relatório bruto de intrusão em uma matriz ATT&CK navegável e priorizável."
draft: false
cover: "linear-gradient(135deg,#3a1242,#ff6ec7 70%,#a78bff)"
---

## Por que mapear

Um relatório de intrusão sem **ATT&CK** é uma história; com ATT&CK vira inteligência comparável.

> Este write-up existe apenas em PT — serve para demonstrar o estado "indisponível neste idioma" do toggle PT|EN.

## Processo

- Quebrar a narrativa em ações atômicas.
- Casar cada ação a uma técnica/sub-técnica.
- Exportar para o **ATT&CK Navigator** (layer JSON).

```json
{
  "techniqueID": "T1566.001",
  "tactic": "initial-access",
  "score": 90,
  "comment": "Spearphishing com anexo .iso"
}
```

## Priorização

Cruzo a camada do ator com a cobertura de detecção atual — o **gap** vira backlog de hunting.
