import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

const BlogPage = async () => {
  // Fetching the content entries
  const res = await client.getEntries({
    content_type: 'blogPage', 
  });

  const posts = res.items;

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">Blog</h1>
      <p className="mt-4">Here are my latest posts.</p>

      <div className="mt-8 space-y-8">
        {posts.map((post: any) => {
          return (
            <div key={post.sys.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-2xl font-semibold">{post.fields.title}</h2>

              {/* Render Category */}
              <p className="text-sm text-gray-600">
                Category: <strong>{post.fields.category}</strong>
              </p>

              {/* Render CategorySlug */}
              <p className="text-sm text-gray-600">
                Category Slug: <strong>{post.fields.categorySlug}</strong>
              </p>

              {/* Render Post Slug */}
              <p className="text-sm text-gray-600">
                Post Slug: <strong>{post.fields.slug}</strong>
              </p>

              {/* Render Publish Date */}
              {post.fields.publishDate && (
                <p className="text-sm text-gray-600">
                  Published on: {new Date(post.fields.publishDate).toLocaleDateString()}
                </p>
              )}

              {/* Render Image */}
              {post.fields.image && post.fields.image.fields.file && (
                <img
                  src={`https:${post.fields.image.fields.file.url}`} 
                  alt={post.fields.image.fields.title}
                  className="w-full h-auto mt-4"
                />
              )}

              {/* Render the Rich Text Body */}
              <div className="mt-4">
                {post.fields.body && documentToReactComponents(post.fields.body)} {/* Convert rich text */}
              </div>

              {/* Dump all fields for debugging */}
              <pre className="mt-4 bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                {JSON.stringify(post.fields, null, 2)}
              </pre>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default BlogPage;
