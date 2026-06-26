# CTIWitch — Portfólio de Cyber Threat Intelligence

Portfólio pessoal **bilíngue (PT/EN)** de uma profissional de **Cyber Threat
Intelligence**, construído em **Astro** com **Content Collections** e saída
**100% estática** (`output: 'static'`) — pronto para publicar no **Cloudflare
Pages** sem nenhum backend.

Inclui CV/resume, blog de write-ups com filtro por tags e busca, páginas de post
com syntax highlight, toggle PT|EN persistente por rota e a nuvenzinha
companheira (CSS/SVG + JS puro) presente em todas as páginas.

---

## 🚀 Rodar localmente

Requer **Node.js 18.17+** (ou 20+).

```bash
npm install
npm run dev        # http://localhost:4321
```

Build de produção e preview:

```bash
npm run build      # gera /dist (HTML estático)
npm run preview    # serve /dist localmente
```

---

## ☁️ Deploy no Cloudflare Pages

1. Suba este projeto para um repositório Git (GitHub/GitLab).
2. No Cloudflare Pages → **Create a project** → conecte o repositório.
3. Configurações de build:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Não há variáveis de ambiente nem backend.

> Como o build é estático, **não existe servidor em runtime** — todo o HTML é
> gerado no build.

---

## 🌎 Como funciona o bilíngue (PT/EN)

A **interface** é em Português; o **conteúdo** (CV e posts) existe em PT e EN.
O idioma é definido pela **rota**, então **persiste durante a navegação sem
usar `localStorage`/`sessionStorage`**:

| Idioma | Home | Blog | Post |
| --- | --- | --- | --- |
| PT (padrão) | `/` | `/blog` | `/blog/<slug>` |
| EN | `/en/` | `/en/blog` | `/en/blog/<slug>` |

O **toggle PT|EN** (canto superior direito) é apenas um link para a URL
equivalente no outro idioma. Num post, ele leva ao **mesmo write-up** na outra
língua graças ao **slug compartilhado**. Se a versão não existir, o botão fica
elegantemente **desabilitado** (`indisponível neste idioma`) sem quebrar a
navegação. A lógica está em `src/i18n/ui.ts` e `src/lib/posts.ts`.

---

## ✍️ Como adicionar um write-up

Estratégia: **um arquivo por idioma com slug compartilhado**.

Crie os dois arquivos com **o mesmo `slug`** no frontmatter:

```
src/content/posts/pt/meu-write-up.md   (lang: pt)
src/content/posts/en/meu-write-up.md   (lang: en)
```

Frontmatter (tipado e validado em `src/content.config.ts`):

```yaml
---
title: "Título do post"
date: 2026-06-01
lang: pt                       # 'pt' | 'en'
slug: meu-write-up             # IGUAL nas duas versões → liga PT⇄EN
tags: ["OSINT", "IOC"]
summary: "Resumo curto que aparece no card do blog."
draft: false                   # true = oculto no build
cover: "linear-gradient(135deg,#2a1f5c,#7c5cff 60%,#2ee6d6)"   # opcional
---

## Seu markdown aqui

Blocos de código ganham **syntax highlight** automático (Shiki):

```python
print("hello, threat intel")
```
```

- Se um post existir **só em um idioma**, ele aparece apenas na listagem daquele
  idioma; no outro, o toggle marca como indisponível.
- `draft: true` esconde o post no build de produção (aparece em `npm run dev`).

---

## 🧾 Como editar o CV

Os dados do CV/home ficam em JSON, um por idioma:

```
src/data/cv.pt.json
src/data/cv.en.json
```

Edite os campos (`role`, `about`, `experience`, `skills`, `certs`, `contacts`…)
e a home se atualiza no próximo build. Para trocar o **PDF do CV**, substitua:

```
public/cv/cv-jady-pt.pdf
public/cv/cv-jady-en.pdf
```

(os arquivos atuais são placeholders; o botão de download aponta para eles).

---

## 🗂 Estrutura

```
astro-site/
├── astro.config.mjs          # output: 'static' + Shiki (syntax highlight)
├── package.json
├── public/
│   ├── favicon.svg
│   └── cv/                    # PDFs do CV (placeholders)
└── src/
    ├── content.config.ts      # schema + glob loader da coleção "posts"
    ├── content/posts/
    │   ├── pt/*.md            # versões PT
    │   └── en/*.md            # versões EN
    ├── data/
    │   ├── cv.pt.json         # alimenta a home (PT)
    │   └── cv.en.json         # alimenta a home (EN)
    ├── i18n/ui.ts             # strings da interface + helpers de idioma/rota
    ├── lib/posts.ts           # getCollection helpers (getPosts, hasVersion…)
    ├── styles/global.css      # tema synthwave-fofa (tokens + classes)
    ├── components/
    │   ├── Nav.astro
    │   ├── LangToggle.astro
    │   ├── CloudCompanion.astro   # a nuvenzinha (CSS/SVG + JS, reduced-motion)
    │   ├── Resume.astro           # corpo da home/CV
    │   ├── BlogList.astro         # grid + filtro de tags + busca
    │   ├── PostCard.astro
    │   ├── PostArticle.astro
    │   └── Footer.astro
    ├── layouts/Base.astro     # <head>, nav, footer e a nuvenzinha (global)
    └── pages/
        ├── index.astro              # home PT
        ├── 404.astro
        ├── en/index.astro           # home EN
        ├── blog/index.astro         # blog PT
        ├── blog/[slug].astro        # post PT (getStaticPaths)
        ├── en/blog/index.astro      # blog EN
        └── en/blog/[slug].astro     # post EN (getStaticPaths)
```

---

## ☁️ A nuvenzinha

Vive no layout (`CloudCompanion.astro`), então aparece em todas as páginas.
Flutua com parallax leve no scroll, segue o cursor de forma preguiçosa, pisca,
tira soneca (💤) e, ao ser clicada, solta moeda/coração/estrela/nota com um
"poof". O **som** (tilim de varinha) é **opcional e desligado por padrão** —
ligável no botão 🔇 da barra. Respeita `prefers-reduced-motion` (fica estática).

---

## Notas

- Os 3 write-ups inclusos são **exemplos ilustrativos** de CTI (substitua pelos
  seus). O post `mitre-attack-mapping-apt` existe **só em PT** de propósito, para
  demonstrar o estado "indisponível neste idioma".
- Sem dependências de backend, banco ou storage do navegador.
