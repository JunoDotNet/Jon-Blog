'use client';

import { useState } from 'react';
import Link from 'next/link';

const categories = [
  { name: 'Upcoming Video', slug: 'upcoming-video', info: 'Stay tuned for upcoming videos on various topics.' },
  { name: 'Tech Tutorials', slug: 'tech-tutorials', info: 'Explore in-depth tutorials on the latest tech.' },
  { name: 'Software Reviews', slug: 'software-reviews', info: 'Read detailed reviews of popular software.' },
  { name: 'Movie Reviews', slug: 'movie-reviews', info: 'Get insightful reviews of the latest movies.' },
  { name: 'Music & Art', slug: 'music-art', info: 'Discover the world of music and art through blog posts.' },
  { name: 'DIY Projects', slug: 'diy-projects', info: 'Learn how to create amazing DIY projects.' },
  { name: 'News', slug: 'news', info: 'Stay updated with the latest news in tech and entertainment.' },
];

export default function HomePage() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <main className="p-8">
      <section className="mb-12 ml-20">
        <h1 className="text-5xl font-bold">Welcome to Jon's Blog</h1>
        <p className="mt-4 text-lg">Please select a category.</p>
      </section>

      <section className="flex flex-col gap-[1px] ml-12">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="relative w-[400px]" // Set the width here to 400px
            onMouseEnter={() => setHoveredCategory(cat.slug)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Link
              href={`/blog/category/${cat.slug}`}
              className="bevel-left text-lg font-semibold px-6 py-5 w-full h-[60px] flex items-center justify-center" 
            >
              {cat.name}
            </Link>

            {/* Hover Info Box */}
            {hoveredCategory === cat.slug && (
              <div className="hover-info-box">
                {cat.info}
              </div>
            )}
          </div>
        ))}

        <Link
          href="/blog"
          className="bevel-left  text-white text-lg font-semibold hover:bg-gray-700 transition-all duration-200 px-6 py-5 w-[400px] mt-[80px] h-[60px] flex items-center justify-center selected-glow"
        >
          View All Posts
        </Link>

        <Link
          href="/"
          className="bevel-left bg-gray-800 text-white text-lg font-semibold hover:bg-gray-700 transition-all duration-200 px-6 py-5 w-[400px] mt-[50px] h-[60px] flex items-center justify-center"
        >
          Go home
        </Link>
      </section>
    </main>
  );
}
