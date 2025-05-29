// Add the "use client" directive to mark this file as a Client Component
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter for Server Components
import { createClient } from 'contentful';
import Link from 'next/link';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

const CategoryPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    const slug = pathname?.split('/').pop(); // Extract the category slug from the pathname

    if (slug) {
      const fetchCategoryPosts = async () => {
        try {
          // Fetch blog posts by category slug
          const res = await client.getEntries({
            content_type: 'blogPage', // Replace with your actual content type ID
            'fields.categorySlug': slug, // Filter posts by categorySlug
          });

          setPosts(res.items);
          setCategoryName(slug as string);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      fetchCategoryPosts();
    }
  }, [pathname]);

  return (
    <main className="p-8">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold">{categoryName} Posts</h1>
        <p className="mt-4 text-lg">Explore blog posts under the "{categoryName}" category.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.sys.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-2xl font-semibold">{post.fields.title}</h2>
              <p className="text-sm text-gray-600">Category: {post.fields.category}</p>
              <div className="mt-4">
                <Link
                  href={`/blog/post/${post.fields.slug}`} // Assuming you have a dynamic post page
                  className="text-blue-600 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available in this category.</p>
        )}
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-500 transition"
        >
          View All Posts
        </Link>
      </div>
    </main>
  );
};

export default CategoryPage;
