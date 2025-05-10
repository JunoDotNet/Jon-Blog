import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
  space: 'gnid317kmek6', // Replace with your space ID
  accessToken: 'bHTRIOuu1YE_QHpnJ5WzbWQY414gA24O52X-liN_Vc0', // Replace with your access token
});

const BlogPage = async () => {
  // Fetching the content entries
  const res = await client.getEntries({
    content_type: 'blogPage', // Replace with the actual content type ID
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
                  src={`https:${post.fields.image.fields.file.url}`} // Ensure it uses the full URL
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
