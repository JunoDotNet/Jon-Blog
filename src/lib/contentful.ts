import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function fetchBlogPosts() {
  const entries = await client.getEntries({
    content_type: 'blogPage',
    order: ['-fields.publishDate'] as ['-fields.publishDate'],
  });

  return entries.items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title,
    slug: item.fields.postSlug,
    category: item.fields.category,
    categorySlug: item.fields.categorySlug,
    publishDate: item.fields.publishDate,
    body: item.fields.body,
    image: item.fields.image?.fields.file.url || null,
  }));
}
