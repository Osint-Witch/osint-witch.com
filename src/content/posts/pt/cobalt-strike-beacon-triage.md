---
title: "Triagem de beacon Cobalt Strike: da config aos IOCs"
date: 2026-05-12
lang: pt
slug: cobalt-strike-beacon-triage
tags: ["Malware", "IOC", "Threat Hunting"]
summary: "Extraindo a configuração de um beacon e transformando em indicadores acionáveis para caça."
draft: false
cover: "linear-gradient(135deg,#2a1f5c,#7c5cff 60%,#2ee6d6)"
---

## Contexto

Um e-mail de phishing entregou um `dropper` que, após algumas camadas, carregava um beacon **Cobalt Strike** em memória. O objetivo da triagem: extrair a config e gerar IOCs acionáveis.

## Extração da config

Usei um parser open-source para puxar os campos do beacon:

```python
# extrai a config do beacon a partir do dump de memória
from beacon_parser import parse

cfg = parse("beacon_dump.bin")
print(cfg["c2_server"])      # 185.x.x.x,/api/v2
print(cfg["watermark"])      # 0x5109bf3a
print(cfg["sleep"])          # 60000
```

> O **watermark** é ouro: liga o beacon a uma licença/ator específico.

## Pivot de infraestrutura

Com o C2 em mãos, pivotei via passive DNS e Censys para achar a infra irmã:

```bash
censys search "services.tls.certificates.leaf_data.subject_dn: \"CN=update\""
```

## IOCs finais

- **C2:** `185.x.x.x` (porta 443)
- **Watermark:** `0x5109bf3a`
- **JA3:** `a0e9f5d64349fb13191bc781f81f42e1`

Mapeando para ATT&CK: `T1071.001` (Web Protocols) e `T1573` (Encrypted Channel).
