// src/app/blog/homepage/page.tsx
import Link from 'next/link';

const categories = [
  { name: 'Upcoming Video', slug: 'upcoming-video' },
  { name: 'Tech Tutorials', slug: 'tech-tutorials' },
  { name: 'Software Reviews', slug: 'software-reviews' },
  { name: 'Movie Reviews', slug: 'movie-reviews' },
  { name: 'Music & Art', slug: 'music-art' },
  { name: 'DIY Projects', slug: 'diy-projects' },
  { name: 'News', slug: 'news' },
];

export default function HomePage() {
  return (
    <main className="p-8">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold">Welcome to My Blog</h1>
        <p className="mt-4 text-lg">Explore posts by category or view them all at once.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            className="block bg-gray-800 text-white p-6 rounded-2xl text-center text-xl font-semibold hover:bg-gray-700 transition"
          >
            {cat.name}
          </Link>
        ))}
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
}
