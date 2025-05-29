import React from 'react';
import HomeButton from '../../HomeButton';
import SearchButton from '../../SearchButton';
import FramedSlide from '../../FramedSlide'; 
import BackButton from '../../BackButton';

interface CategorySelectProps {
  goToSearch: () => void;
  goToHome: () => void;
  goBack: () => void;
  selectedCategory: string | null;
  blogPosts: BlogPost[];
  setSelectedPost: (post: BlogPost) => void;
  goToPostView: () => void;
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  image: string | null;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  goToSearch,
  goToHome,
  goBack,
  selectedCategory,
  blogPosts,
  setSelectedPost,
  goToPostView,
}) => {
  const filteredPosts = blogPosts.filter(
    (post) => post.category === selectedCategory
  );

 return (
    <FramedSlide frameSrc="/ui/bloguiframenoline.png">
      {/* Keep your styled header untouched */}
      <div className="-mt-[60px] ml-[-130px]">
        <h2
          style={{ fontFamily: 'FotRodinPro, Arial, sans-serif' }}
          className="text-5xl mb-6"
        >
          {selectedCategory}
        </h2>
      </div>

      {/* Scrollable content area for posts only */}
      <div className="flex flex-col flex-1 overflow-y-auto ml-[-150px] mt-[40px]">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => {
                setSelectedPost(post);
                goToPostView();
              }}
              className="relative w-[160px] h-[50px] p-0 bg-transparent unstyled-button"
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
                  className="mt-[5px]absolute inset-0 flex items-center justify-center text-white text-lg pointer-events-none"
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
          <p className="text-lg mt-4">No posts in this category yet.</p>
        )}
      </div>

      <div className="mt-[300px] ml-[-150px]">
        <div
         className="flex gap-2">
          <BackButton goBack={goBack} />
          <HomeButton goToHome={goToHome} />
          <SearchButton goToSearch={goToSearch} />
        </div>
      </div>


    </FramedSlide>

  );

};

export default CategorySelect;
