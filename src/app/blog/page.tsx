import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { createClient } from 'contentful';

type Post = {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
};

type BlogPageProps = {
  posts: Post[];
};

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="mb-8">Here are my latest posts.</p>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="border rounded p-4 bg-white shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
            <p className="mb-2">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">Read more</Link>
          </div>
        ))}
      </div>
    </main>
  );
}

// Fetch posts at build time
export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: 'gnid317kmek6',
    accessToken: 'nCX23AjkjYJe9CeVUrqQdOYVG7-W90nagR4xTyaC9Cg',
  });

  const res = await client.getEntries({ content_type: 'yourContentModelId' });

  const posts = res.items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title,
    slug: item.fields.slug,
    date: item.fields.date,
    excerpt: item.fields.excerpt || '',
  }));

  return {
    props: {
      posts,
    },
  };
};
