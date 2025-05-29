import { useState, useEffect } from 'react';
import SearchButton from '../../SearchButton';
import { fetchBlogPosts } from '../../../lib/contentful';
import FramedSlide from '../../FramedSlide'; // ✅ import the new wrapper

interface HomepageProps {
  goToSearch: () => void;
  setSelectedCategory: (category: string | null) => void;
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  image: string | null;
}

const Homepage: React.FC<HomepageProps> = ({ goToSearch, setSelectedCategory }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await fetchBlogPosts();
        setBlogPosts(posts);

        const allCategories = [
          "Video Updates",
          "Tutorials",
          "Project Showcases",
          "Creative Inspiration",
          "Life & Reflections"
        ];

        setCategories(allCategories);

        const categoryPostCounts: Record<string, number> = {};
        allCategories.forEach((cat) => {
          categoryPostCounts[cat] = posts.filter((p) => p.category === cat).length;
        });

        setCategoryCounts(categoryPostCounts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(null);
    setTimeout(() => {
      setSelectedCategory(category);
    }, 0);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <FramedSlide frameSrc="/ui/bloguiframenoline.png">
      <div className="-mt-[90px] ml-[-130px]">
        <h1
          style={{ fontFamily: 'FotRodinPro, Arial, sans-serif' }}
          className="text-xl mb-2 text-white"
        >
          Welcome to Jon's Blog
        </h1>
        <h2 style={{ fontFamily: 'FotRodinPro, Arial, sans-serif' }} 
        className="text-5xl font-Chiarostd mb-6"
        >
          Please select a file.
        </h2>
      </div>

      <div className='ml-[-150px]'>
        {/* Categories */}
        <div>

          <div className="flex flex-col gap-0 items-start mt-[40px]">
            {categories.map((category) => {
              const count = categoryCounts[category] || 0;
              const isDisabled = count === 0;

              return (
                <button
                  key={category}
                  onClick={() => !isDisabled && handleCategoryClick(category)}
                  disabled={isDisabled}
                  className={`unstyled-button
                    ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <img
                    src="/ui/blogbtnwnopin.png"
                    alt={category}
                    className={`w-full h-full object-contain ${isDisabled ? 'opacity-40' : ''}`}
                    draggable={false}
                  />
                  <span
                    style={{ fontFamily: 'Chiarostd, Arial, sans-serif' }}
                    className="absolute inset-0 flex items-center justify-center text-white text-xl pointer-events-none">
                    {category}
                  </span>
                  <span className="absolute top-1 right-2 bg-white text-blue-600 text-[10px] px-1.5 py-0.5 rounded-full pointer-events-none">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-[50px] pl-2">
          <button onClick={goToSearch} className="unstyled-button w-[160px] h-[50px] relative">
            <img
              src="/ui/blogbtnwnopin.png"
              alt="Search"
              className="w-full h-full object-contain"
              draggable={false}
            />
            <span
              style={{ fontFamily: 'Chiarostd, Arial, sans-serif' }} 
              className="absolute inset-0 flex items-center justify-center text-white text-xl  pointer-events-none">
              Search
            </span>
          </button>
        </div>
      </div>

    </FramedSlide>

  );
};

export default Homepage;
