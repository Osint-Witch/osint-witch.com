---
title: "OSINT: pivoting infrastructure from a single IP"
date: 2026-04-03
lang: en
slug: osint-infra-pivoting
tags: ["OSINT", "Infra", "Pivoting"]
summary: "One lonely address becomes an entire map of adversary infrastructure via passive DNS and certificates."
draft: false
cover: "linear-gradient(135deg,#0f2c3a,#2ee6d6 70%,#5ef2a0)"
---

## The starting point

Sometimes all you have is **one IP**. Here is how to expand it into a whole cluster.

## Pivot layers

1. **Passive DNS** — domains that resolved to the IP.
2. **TLS certificates** — reused fingerprints and CNs.
3. **Favicon hash** — `mmh3` to find identical panels.

```python
import mmh3, requests, codecs
r = requests.get("http://target/favicon.ico")
fav = codecs.encode(r.content, "base64")
print(mmh3.hash(fav))   # -> Shodan search: http.favicon.hash
```

## Result

From 1 IP I reached **14 hosts** sharing the same favicon and certificate pattern — the actor's entire staging infrastructure.
