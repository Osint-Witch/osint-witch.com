---
title: "OSINT: pivotando infraestrutura de um único IP"
date: 2026-04-03
lang: pt
slug: osint-infra-pivoting
tags: ["OSINT", "Infra", "Pivoting"]
summary: "Um endereço solitário vira um mapa inteiro de infraestrutura adversária com passive DNS e certificados."
draft: false
cover: "linear-gradient(135deg,#0f2c3a,#2ee6d6 70%,#5ef2a0)"
---

## O ponto de partida

Às vezes tudo que você tem é **um IP**. Mostro como expandir isso para um cluster inteiro.

## Camadas de pivot

1. **Passive DNS** — domínios que já resolveram para o IP.
2. **Certificados TLS** — fingerprints e CNs reaproveitados.
3. **Favicon hash** — `mmh3` para achar painéis idênticos.

```python
import mmh3, requests, codecs
r = requests.get("http://alvo/favicon.ico")
fav = codecs.encode(r.content, "base64")
print(mmh3.hash(fav))   # -> busca no Shodan: http.favicon.hash
```

## Resultado

De 1 IP cheguei a **14 hosts** compartilhando o mesmo favicon e padrão de certificado — toda a infra de staging do ator.
