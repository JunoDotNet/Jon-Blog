import React, { useState } from 'react';
import HomeButton from '../../HomeButton';
import FramedSlide from '../../FramedSlide';
import BackButton from '../../BackButton';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  image: string | null;
}

interface SearchProps {
  goToHome: () => void;
  goBack: () => void;
  blogPosts: BlogPost[];
  setSelectedPost: (post: BlogPost) => void;
  goToPostView: () => void;
}

const Search: React.FC<SearchProps> = ({
  goToHome,
  goBack,
  blogPosts,
  setSelectedPost,
  goToPostView,
}) => {
  const [query, setQuery] = useState('');

  console.log("Query:", query);
  console.log("All titles:", blogPosts.map((p) => p.title));

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().trim().includes(query.toLowerCase().trim())
  );

  return (
    <FramedSlide frameSrc="/ui/bloguiframenoline.png">
      {/* Header */}
      <div className="-mt-[80px] ml-[-130px]">
        <h1
          style={{ fontFamily: 'FotRodinPro, Arial, sans-serif' }}
          className="text-5xl mb-2 text-white"
        >
          Search Posts
        </h1>
      </div>

      {/* Search input */}
      <div className="mt-[20px] ml-[-120px]">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-3xl px-6 py-4 mb-6 text-black text-md rounded bg-white shadow"
          style={{ fontFamily: 'FotRodinPro, Arial, sans-serif' }}
        />
      </div>

      {/* Full-height column: scrollable posts + fixed buttons */}
      <div className="ml-[-120px] flex flex-col h-full max-h-[400px]">
        {/* Scrollable posts */}
        <div className="overflow-y-auto flex flex-col flex-grow">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => {
                  setSelectedPost(post);
                  goToPostView();
                }}
                className="relative w-[160px] h-[50px] bg-transparent unstyled-button"
              >
                <img
                  src="/ui/blogbtnwnopin.png"
                  alt={post.title}
                  className="w-full h-full object-contain"
                  draggable={false}
                />
                <span className="absolute inset-0 flex flex-col justify-center items-center text-white text-xs font-bold pointer-events-none leading-tight text-center px-2">
                  <span
                    style={{ fontFamily: 'Chiarostd, Arial, sans-serif' }}
                    className="mt-[5px] text-lg"
                  >
                    {post.title}
                  </span>
                  <span className="text-[10px] font-normal">
                    {new Date(post.publishDate).toLocaleDateString()}
                  </span>
                </span>
              </button>
            ))
          ) : (
            <p className="text-gray-400">No results found.</p>
          )}
        </div>

        {/* Fixed nav buttons at bottom */}
        <div className="mt-4">
          <div className="mt-4 flex justify-start">
            <HomeButton goToHome={goToHome} />
          </div>
        </div>
      </div>
      
    </FramedSlide>

  );
};

export default Search;
