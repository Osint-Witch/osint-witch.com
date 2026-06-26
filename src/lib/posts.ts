import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Post = CollectionEntry<'posts'>;

/**
 * Em producao (build) escondemos drafts; em dev eles aparecem para preview.
 */
const isPublished = (e: Post): boolean => (import.meta.env.PROD ? !e.data.draft : true);

/** Posts publicados de um idioma, ordenados por data (mais recente primeiro). */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const all = await getCollection('posts');
  return all
    .filter((e) => e.data.lang === lang && isPublished(e))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Um post especifico pelo slug compartilhado + idioma. */
export async function getPost(lang: Lang, slug: string): Promise<Post | undefined> {
  const all = await getCollection('posts');
  return all.find((e) => e.data.lang === lang && e.data.slug === slug && isPublished(e));
}

/**
 * O slug compartilhado liga as duas versoes: aqui checamos se existe a versao
 * equivalente em outro idioma. Usado pelo toggle PT|EN para decidir se navega
 * para o mesmo write-up ou se marca como "indisponivel neste idioma".
 */
export async function hasVersion(slug: string, lang: Lang): Promise<boolean> {
  const all = await getCollection('posts');
  return all.some((e) => e.data.lang === lang && e.data.slug === slug && isPublished(e));
}

/** Todas as tags presentes nos posts de um idioma (ordem de aparicao). */
export async function getTags(lang: Lang): Promise<string[]> {
  const posts = await getPosts(lang);
  const seen: string[] = [];
  for (const p of posts) for (const t of p.data.tags) if (!seen.includes(t)) seen.push(t);
  return seen;
}

/** Estimativa de tempo de leitura (em minutos) a partir do corpo do post. */
export function readingMinutes(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}
