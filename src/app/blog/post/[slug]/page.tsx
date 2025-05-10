'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
  space: 'gnid317kmek6',
  accessToken: 'bHTRIOuu1YE_QHpnJ5WzbWQY414gA24O52X-liN_Vc0',
});

const PostPage = () => {
  const { slug } = useParams(); // ✅ gets slug param
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        try {
          const res = await client.getEntries({
            content_type: 'blogPage',
            'fields.slug': slug,
          });
          if (res.items.length > 0) {
            console.log('Fetched post data:', res.items[0]); // ✅ console log for debug
            setPost(res.items[0]);
          } else {
            console.log('No post found for slug:', slug);
          }
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };

      fetchPost();
    }
  }, [slug]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-8">
      <article>
        <h1 className="text-5xl font-bold">{post.fields.title}</h1>

        {/* Render Category */}
        <p className="mt-2 text-gray-600">
          Category: <strong>{post.fields.category}</strong>
        </p>

        {/* Render CategorySlug */}
        <p className="text-gray-600">
          Category Slug: <strong>{post.fields.categorySlug}</strong>
        </p>

        {/* Render Post Slug */}
        <p className="text-gray-600">
          Post Slug: <strong>{post.fields.slug}</strong>
        </p>

        {/* Render Publish Date */}
        {post.fields.publishDate && (
          <p className="text-gray-600">
            Published on: {new Date(post.fields.publishDate).toLocaleDateString()}
          </p>
        )}

        {/* Render Image */}
        {post.fields.image && post.fields.image.fields.file && (
          <img
            src={`https:${post.fields.image.fields.file.url}`}
            alt={post.fields.image.fields.title}
            className="w-full h-auto mt-6 rounded-lg shadow"
          />
        )}

        {/* Render Rich Text Body */}
        <div className="mt-8">
          {post.fields.body && documentToReactComponents(post.fields.body)}
        </div>

      </article>
    </main>
  );
};

export default PostPage;
