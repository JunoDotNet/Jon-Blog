'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';



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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (selectedCategory) {
      const timeout = setTimeout(() => {
        router.push(`/blog/category/${selectedCategory}`);
      }, 1200); // Delay for animation
      return () => clearTimeout(timeout);
    }
  }, [selectedCategory, router]);

  return (
    <main className="relative p-8">
      <section className="relative z-10 ml-[125px]">
        <div className="fixed top-[-2%] left-[-4%] w-[1700px] h-auto pointer-events-none z-[-10]">
          <img
            src="/ui/blogbg.png"
            alt="Background"
            className="w-full h-auto"
          />
        </div>

        <h1 className="absolute top-[-22%] left-[-5%] text-white text-sml font-bold font-fotrodin">
          Welcome to Jon's Blog
        </h1>

        <h1 className="absolute top-[-16%] left-[-5%] text-white text-5xl font-bold font-fotrodin">
          Please select a file.
        </h1>

        {/* Button group */}
        <div className="flex flex-col mt-40">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="relative w-[400px]"
              onMouseEnter={() => setHoveredCategory(cat.slug)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link href={`/blog/category/${cat.slug}`} className="relative block w-[200px]">
                <img
                  src="/ui/blogbtnwpin.png"
                  alt={`${cat.name} button`}
                  className="w-full h-auto"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg font-chiarostd">
                  {cat.name}
                </span>
              </Link>

              {hoveredCategory === cat.slug && (
                <div className="absolute top-0 left-[200px] w-[400px] z-20">
                  <div className="relative">
                    <img
                      src="/ui/blogdescwindow.png"
                      alt="Description background"
                      className="w-full h-auto"
                    />
                    <img
                      src="/ui/blogpin.png"
                      alt="decorpin"
                      className="absolute top-3 left-[-30px] w-[70px] h-auto z-30"
                    />
                    <p className="absolute inset-0 p-4 text-white text-sm font-medium leading-snug font-chiarostd">
                      {cat.info}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* View All Posts */}
          <Link href="/blog" className="relative block w-[200px] mt-[50px]">
            <img
              src="/ui/blogbtnwnopin.png"
              alt="View All Posts"
              className="w-full h-auto hover:opacity-90 transition-all duration-200"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg font-chiarostd">
              View All Posts
            </span>
          </Link>

          {/* Go Home */}
          <Link href="/" className="relative block w-[200px] mt-[50px]">
            <img
              src="/ui/blogbtnwnopin.png"
              alt="Go Home"
              className="w-full h-auto hover:opacity-90 transition-all duration-200"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg font-chiarostd">
              Go Home
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
