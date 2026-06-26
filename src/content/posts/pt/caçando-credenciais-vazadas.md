---
title: "Caçando credenciais vazadas: do stealer log ao alerta de risco"
date: 2026-06-20
lang: pt
slug: cacando-credenciais-vazadas
tags: ["OSINT", "Dark Web", "Threat Intel"]
summary: "Como rastrear logs de infostealers, identificar credenciais corporativas expostas e transformar isso em um alerta acionável antes que o adversário use."
draft: false
cover: "linear-gradient(135deg,#1a0533,#a78bff 60%,#ff6ec7)"
---

## O problema

Infostealers como Redline, Raccoon e Lumma despejam milhares de logs por dia em fóruns e canais privados do Telegram. Dentro desses logs estão **credenciais de VPN, e-mail corporativo e portais internos** — prontas para serem usadas em ataques de account takeover.

O desafio não é encontrar os logs. É encontrar os seus antes que alguém os use.

---

## O que está num stealer log

Um log típico tem a seguinte estrutura:

```
[CREDENTIALS]
URL: https://vpn.empresa.com.br/login
Username: colaborador@empresa.com.br
Password: Senha@2024

[SYSTEM]
Country: Brazil | OS: Windows 11 | IP: 187.x.x.x
Installed: Chrome 124 | Antivirus: Windows Defender
```

Além das credenciais, o log entrega o **ambiente completo da vítima**: país, IP, sistema operacional, antivírus instalado. Para um analista de CTI, isso é contexto de ouro.

---

## A metodologia de busca

### 1. Monitoramento passivo em canais Telegram

Canais como `@[nome_canal]` distribuem previews de logs gratuitamente para atrair compradores. Uma busca por domínios da organização nesses canais é o primeiro passo.

Ferramentas úteis:
- **TGStat** e **Telemetr.io** — indexam canais públicos e permitem busca por keyword
- **IntelX** — agrega logs históricos com busca por domínio ou e-mail
- **Dehashed / LeakCheck** — validam se o hash da senha já apareceu em outros vazamentos

### 2. Pivotando pelo domínio

Com um domínio em mãos (`@empresa.com.br`), o pivot é direto:

```python
import requests

def busca_intelx(dominio, api_key):
    url = "https://2.intelx.io/intelligent/search"
    payload = {"term": dominio, "maxresults": 100, "media": 0}
    headers = {"x-key": api_key}
    r = requests.post(url, json=payload, headers=headers)
    return r.json()
```

O resultado traz referências a arquivos que contêm o domínio — logs, pastes, fóruns.

### 3. Validando sem queimar a credencial

Nunca tente fazer login com a credencial encontrada. Isso contamina evidências e pode ser interpretado como acesso não autorizado.

A validação correta é:
- Checar se o **e-mail existe** via SMTP (sem autenticar)
- Verificar se a senha segue **padrões ativos** da organização (ex.: política de complexidade)
- Cruzar com **data do log** — logs com mais de 6 meses tendem a ter credenciais já rotacionadas

---

## Transformando em alerta

Um bom alerta de credencial vazada tem:

| Campo | Exemplo |
|---|---|
| Severidade | Alta |
| Sistema exposto | VPN corporativa |
| Usuário | colaborador@empresa.com.br |
| Data do log | 2026-05-14 |
| Fonte | Canal Telegram (privado) |
| Ação recomendada | Reset imediato + verificar acessos nas últimas 72h |

A recomendação de ação é o que diferencia um relatório de CTI de uma lista de e-mails.

---

## Conclusão

Logs de infostealers são uma das fontes de inteligência mais subestimadas em programas de CTI. O monitoramento contínuo desse vetor, com processos claros de triagem e resposta, pode transformar uma exposição silenciosa em uma detecção antes do impacto.

> *"Você não precisa esperar o adversário usar a credencial para saber que ela existe."*
