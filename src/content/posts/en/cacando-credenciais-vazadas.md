---
title: "Hunting leaked credentials: from stealer log to risk alert"
date: 2026-06-20
lang: en
slug: cacando-credenciais-vazadas
tags: ["OSINT", "Dark Web", "Threat Intel"]
summary: "How to track infostealer logs, identify exposed corporate credentials and turn that into an actionable alert before the adversary strikes."
draft: false
cover: "linear-gradient(135deg,#1a0533,#a78bff 60%,#ff6ec7)"
---

## The problem

Infostealers like Redline, Raccoon and Lumma dump thousands of logs every day across forums and private Telegram channels. Inside those logs sit **VPN credentials, corporate email accounts and internal portal logins** — ready to be used in account takeover attacks.

The challenge isn't finding the logs. It's finding yours before someone uses them.

---

## What's inside a stealer log

A typical log looks like this:

```
[CREDENTIALS]
URL: https://vpn.company.com/login
Username: employee@company.com
Password: Password@2024

[SYSTEM]
Country: Brazil | OS: Windows 11 | IP: 187.x.x.x
Installed: Chrome 124 | Antivirus: Windows Defender
```

Beyond credentials, the log delivers the **victim's full environment**: country, IP, OS, installed antivirus. For a CTI analyst, this is gold-grade context.

---

## The search methodology

### 1. Passive monitoring on Telegram channels

Channels distribute log previews for free to attract buyers. Searching for your organization's domain in those channels is the first step.

Useful tools:
- **TGStat** and **Telemetr.io** — index public channels and allow keyword search
- **IntelX** — aggregates historical logs with domain and email search
- **Dehashed / LeakCheck** — validate whether a password hash has appeared in other breaches

### 2. Pivoting from the domain

With a domain in hand (`@company.com`), the pivot is straightforward:

```python
import requests

def search_intelx(domain, api_key):
    url = "https://2.intelx.io/intelligent/search"
    payload = {"term": domain, "maxresults": 100, "media": 0}
    headers = {"x-key": api_key}
    r = requests.post(url, json=payload, headers=headers)
    return r.json()
```

The result references files containing the domain — logs, pastes, forums.

### 3. Validating without burning the credential

Never attempt to log in with a found credential. It contaminates evidence and may be construed as unauthorized access.

The right validation approach:
- Check whether the **email exists** via SMTP (without authenticating)
- Verify whether the password follows the organization's **active policy** (e.g. complexity rules)
- Cross-reference the **log date** — logs older than 6 months tend to have already-rotated credentials

---

## Turning it into an alert

A good leaked-credential alert includes:

| Field | Example |
|---|---|
| Severity | High |
| Exposed system | Corporate VPN |
| User | employee@company.com |
| Log date | 2026-05-14 |
| Source | Telegram channel (private) |
| Recommended action | Immediate reset + review accesses in the last 72h |

The recommended action is what separates a CTI report from a list of emails.

---

## Conclusion

Infostealer logs are one of the most underrated intelligence sources in CTI programs. Continuous monitoring of this vector, with clear triage and response processes, can turn a silent exposure into a detection before impact.

> *"You don't need to wait for the adversary to use the credential to know it exists."*
