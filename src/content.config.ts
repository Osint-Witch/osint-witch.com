import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Colecao de posts bilingue.
 *
 * Estrategia: UM ARQUIVO POR IDIOMA COM SLUG COMPARTILHADO.
 *   src/content/posts/pt/<slug>.md   (lang: 'pt')
 *   src/content/posts/en/<slug>.md   (lang: 'en')
 *
 * Usamos o glob loader (Astro 5) para que o `id` do entry venha do caminho
 * (ex.: "pt/cobalt-strike-beacon-triage") — assim o campo `slug` do frontmatter
 * fica livre para ser o IDENTIFICADOR COMPARTILHADO entre as duas versoes,
 * sem colidir com o slug reservado do Astro.
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    lang: z.enum(['pt', 'en']),
    /** slug compartilhado: IGUAL nas versoes PT e EN do mesmo write-up */
    slug: z.string(),
    draft: z.boolean().default(false),
    /** CSS de fundo do card (gradiente). Opcional. */
    cover: z.string().optional(),
  }),
});

export const collections = { posts };
