import React from 'react';
import HomeButton from '../../HomeButton';
import SearchButton from '../../SearchButton';
import FramedSlide from '../../FramedSlide';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  image: string | null;
  body?: any; // Contentful rich text (optional)
}

interface PostViewProps {
  goToSearch: () => void;
  goToHome: () => void;
  selectedPost: BlogPost | null;
}

const PostView: React.FC<PostViewProps> = ({ goToSearch, goToHome, selectedPost }) => {
  if (!selectedPost) {
    return (
      <FramedSlide frameSrc="/ui/bloguiframenoline.png">
        <h1 className="text-3xl text-red-500">No Post Selected</h1>
        <HomeButton goToHome={goToHome} />
      </FramedSlide>
    );
  }

  // Fallback plain text for rich content
  const bodyText =
    selectedPost.body?.content
      ?.map((block: any) =>
        block.content?.map((textBlock: any) => textBlock.value).join(' ')
      )
      .join('\n\n') || "No body content.";

  return (
    <FramedSlide frameSrc="/ui/bloguiframenoline.png">
      <div className="-mt-20 ml-[-100px] w-full max-w-6xl px-6">
        <h1
          style={{ fontFamily: 'FotRodinPro, Arial, sans-serif' }}
          className="text-4xl font-bold mb-2"
          >
            {selectedPost.title}
        </h1>
        <p style={{ fontFamily: 'FotRodinPro, Arial, sans-serif' }} 
        className="mb-1 text-sm italic text-gray-200">
          Category: {selectedPost.category}
        </p>
        <p 
          style={{ fontFamily: 'FotRodinPro, Arial, sans-serif' }}
          className="mb-4 text-sm text-gray-200">
          Published on: {new Date(selectedPost.publishDate).toLocaleDateString()}
        </p>

        <div className="w-full h-[500px] overflow-y-auto">
          {selectedPost.image && (
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full max-h-[500px] object-contain rounded-lg shadow mb-4"
            />
          )}

          <div
            style={{ fontFamily: 'Chiarostd, Arial, sans-serif' }} 
            className="w-full text-lg leading-relaxed whitespace-pre-wrap">
            {bodyText}
          </div>
        </div>

        <div className="mt-4">
          <div className="mt-4 flex justify-start">
            <SearchButton goToSearch={goToSearch} />
            <HomeButton goToHome={goToHome} />
          </div>
        </div>
      </div>
    </FramedSlide>

  );
};

export default PostView;
