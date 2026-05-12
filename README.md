# lucaflammia.it — Personal Website

Professional Italian-first personal website for Luca Flammia, PhD — AI Solutions Architect & Data Scientist. Built to generate B2B consulting leads in the Italian FSI/Enterprise market.

## Stack

- **Framework:** [Astro](https://astro.build) (static site generation)
- **Deployment:** Vercel Hobby Tier
- **Domain:** lucaflammia.it

## Structure

```
src/
├── content/           # Blog articles (Astro Content Collections)
├── layouts/
│   └── Layout.astro   # Base layout with SEO metadata
├── pages/
│   ├── index.astro    # Italian homepage (hero, career arc, skills, blog, CTA)
│   ├── blog/          # Blog listing + individual article pages
│   └── en/
│       └── index.astro  # English mirror page
└── styles/
    └── global.css     # Design system (dark typographic)
```

## Routes

| Route | Description |
|---|---|
| `/` | Italian homepage |
| `/blog/` | Blog listing |
| `/blog/agentic-workflow-2026/` | Article: Agentic Workflow nel 2026 |
| `/blog/agentic-ai-enterprise-systems/` | Article: Sistemi AI Agentici: Architetture sicure per istituti finanziari e grandi imprese |
| `/blog/multi-agent-systems/` | Article: Sistemi Multi-Agent in Produzione |
| `/en/` | English landing page |

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview production build locally |

## Pre-launch checklist

- [ ] Replace `href="#booking"` in `src/pages/index.astro` and `src/pages/en/index.astro` with real Calendly/TidyCal URL
- [ ] Connect repo to Vercel and set custom domain `lucaflammia.it`
