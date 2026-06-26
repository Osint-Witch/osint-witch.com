---
title: "Cobalt Strike beacon triage: from config to IOCs"
date: 2026-05-12
lang: en
slug: cobalt-strike-beacon-triage
tags: ["Malware", "IOC", "Threat Hunting"]
summary: "Extracting a beacon configuration and turning it into actionable hunting indicators."
draft: false
cover: "linear-gradient(135deg,#2a1f5c,#7c5cff 60%,#2ee6d6)"
---

## Context

A phishing email delivered a `dropper` that, after a few layers, loaded a **Cobalt Strike** beacon in memory. Triage goal: extract the config and generate actionable IOCs.

## Config extraction

I used an open-source parser to pull the beacon fields:

```python
# extract beacon config from the memory dump
from beacon_parser import parse

cfg = parse("beacon_dump.bin")
print(cfg["c2_server"])      # 185.x.x.x,/api/v2
print(cfg["watermark"])      # 0x5109bf3a
print(cfg["sleep"])          # 60000
```

> The **watermark** is gold: it ties the beacon to a specific license/actor.

## Infrastructure pivoting

With the C2 in hand, I pivoted via passive DNS and Censys to find sibling infra:

```bash
censys search "services.tls.certificates.leaf_data.subject_dn: \"CN=update\""
```

## Final IOCs

- **C2:** `185.x.x.x` (port 443)
- **Watermark:** `0x5109bf3a`
- **JA3:** `a0e9f5d64349fb13191bc781f81f42e1`

Mapping to ATT&CK: `T1071.001` (Web Protocols) and `T1573` (Encrypted Channel).
