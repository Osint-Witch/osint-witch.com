/**
 * i18n da INTERFACE (rotulos, menus, textos de UI).
 *
 * A interface inteira troca junto com o idioma. O idioma e definido pela URL
 * (rota), entao ele PERSISTE durante a navegacao sem precisar de
 * localStorage/sessionStorage:
 *   PT (default): /, /blog, /blog/<slug>
 *   EN:           /en/, /en/blog, /en/blog/<slug>
 */

export const languages = { pt: 'Português', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';

export const ui = {
  pt: {
    'nav.home': 'Início',
    'nav.blog': 'Blog',
    'hero.readBlog': 'Ler o blog →',
    'hero.available': 'aberta a trocas e colaborações',
    'section.about': 'SOBRE',
    'section.experience': 'EXPERIÊNCIA',
    'section.skills': 'SKILLS & FERRAMENTAS',
    'section.certs': 'CERTIFICAÇÕES',
    'section.contact': 'CONTATO',
    'blog.title': 'Blog & Pesquisa',
    'blog.subPre': 'Análises de ameaças, threat hunting e OSINT — exibindo a versão ',
    'blog.subPost': '.',
    'blog.search': 'Buscar por título…',
    'blog.tagAll': 'todos',
    'blog.empty': 'Nenhum post encontrado',
    'blog.emptyFilter': ' com esse filtro',
    'blog.emptyLang': ' neste idioma',
    'post.back': '← voltar ao blog',
    'post.minRead': ' min de leitura',
    'post.unavailable': 'indisponível neste idioma',
    'toggle.tip': 'Trocar idioma do conteúdo',
    'sound.tip': 'Som da nuvem',
    'cloud.tip': 'me clica! ☁️',
    'footer': 'feito com ☁️ por CTIWitch · ctiwitch.com · estático no Cloudflare Pages',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'hero.readBlog': 'Read the blog →',
    'hero.available': 'open to chats & collaborations',
    'section.about': 'ABOUT',
    'section.experience': 'EXPERIENCE',
    'section.skills': 'SKILLS & TOOLSET',
    'section.certs': 'CERTIFICATIONS',
    'section.contact': 'CONTACT',
    'blog.title': 'Blog & Research',
    'blog.subPre': 'Threat analysis, threat hunting and OSINT — showing the ',
    'blog.subPost': ' version.',
    'blog.search': 'Search by title…',
    'blog.tagAll': 'all',
    'blog.empty': 'No posts found',
    'blog.emptyFilter': ' with this filter',
    'blog.emptyLang': ' in this language',
    'post.back': '← back to the blog',
    'post.minRead': ' min read',
    'post.unavailable': 'not available in this language',
    'toggle.tip': 'Switch content language',
    'sound.tip': 'Cloud sound',
    'cloud.tip': 'click me! ☁️',
    'footer': 'made with ☁️ by CTIWitch · ctiwitch.com · static on Cloudflare Pages',
  },
} as const;

export type UIKey = keyof (typeof ui)['pt'];

/** Retorna a funcao t() para o idioma dado, com fallback no idioma padrao. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Monta um caminho localizado: ('en', 'blog') -> '/en/blog' ; ('pt','') -> '/' */
export function localizedPath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  return clean ? `${prefix}/${clean}` : `${prefix}/`;
}

/** Idioma "oposto" ao atual. */
export function otherLang(lang: Lang): Lang {
  return lang === 'pt' ? 'en' : 'pt';
}

/** Formata a data no padrao do idioma (ex.: "12 mai 2026" / "May 12, 2026"). */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
