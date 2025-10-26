export type NewArticle = { title: string; slug: string; excerpt?: string }
export const store = {
  articles: [] as NewArticle[],
}
export function createArticle(a: NewArticle) {
  if (!store.articles.find((x) => x.slug === a.slug)) store.articles.push(a)
}
export function deleteArticle(slug: string) {
  store.articles = store.articles.filter((a) => a.slug !== slug)
}
