// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Homepage from '../../components/apps/slides/Homepage';
import CategorySelect from '../../components/apps/slides/CategorySelect';
import PostSelect from '../../components/apps/slides/PostSelect';
import Search from '../../components/apps/slides/Search';
import NavigationButtons from '../../components/QuitButton';
import { fetchBlogPosts } from '../../lib/contentful'; 
import PostView from '../../components/apps/slides/PostSelect';
import QuitButton from '../../components/QuitButton';



interface BlogPost {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  image: string | null;
}

const Page = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | 'top' | 'bottom' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [lastSlide, setLastSlide] = useState<number | null>(null);



  

  // Slide when category is selected
  useEffect(() => {
    if (selectedCategory) {
      console.log('Selected Category:', selectedCategory);
      changeSlide(1, 'left');
    }
  }, [selectedCategory]);

  // Load posts on first mount
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await fetchBlogPosts();
        console.log("Loaded blogPosts:", posts); 
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      }
    };

    loadBlogPosts();
  }, []);

  const changeSlide = (target: number, direction: typeof transitionDirection) => {
    setPrevSlide(currentSlide);
    setTransitionDirection(direction);
    setLastSlide(currentSlide);
    setCurrentSlide(target);
  };

  const goToSearch = () => changeSlide(3, 'bottom');
  const goToHome = () => {
    setSelectedCategory(null);
    setSelectedPost(null);
    setLastSlide(null);
    changeSlide(0, 'top');
  };
  const goBack = () => {

    if (currentSlide === 0){
        window.location.href = '/';
        return;
    }

    if (currentSlide === 2 && lastSlide === 3){
        changeSlide(3, 'right');    
    } else {
        changeSlide(Math.max(0, currentSlide - 1), 'right');
    }
  };



  const goToNext = () => changeSlide(Math.min(2, currentSlide + 1), 'left');

  const renderSlide = (index: number) => {
    switch (index) {
      case 0:
        return (
          <Homepage
            goToSearch={goToSearch}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 1:
        return (
          <CategorySelect
            goToSearch={goToSearch}
            goToHome={goToHome}
            goBack={goBack}
            selectedCategory={selectedCategory}
            blogPosts={blogPosts}
            setSelectedPost={setSelectedPost}
            goToPostView={() => changeSlide(2, 'left')}
          />
        );
      case 2:
        return (
            <PostView
            goToSearch={goToSearch}
            goToHome={goToHome}
            selectedPost={selectedPost}
            />
        );
      case 3:
        return (
            <Search
            goToHome={goToHome}
            goBack={goBack}
            blogPosts={blogPosts}
            setSelectedPost={(post) => {
                console.log("Post clicked from search:", post.title)
                setSelectedPost(post);
                setSelectedCategory(null);
                changeSlide(2, 'left');
            }}
            goToPostView={() => changeSlide(2, 'left')}
            />
        );

      default:
        return null;
    }
  };

  const getSlideClass = (index: number) => {
    if (index === currentSlide) {
      switch (transitionDirection) {
        case 'left':
          return 'animate-slide-in-from-right';
        case 'right':
          return 'animate-slide-in-from-left';
        case 'top':
          return 'animate-slide-in-from-bottom';
        case 'bottom':
          return 'animate-slide-in-from-top';
        default:
          return '';
      }
    } else if (index === prevSlide) {
      return 'hidden';
    } else {
      return 'hidden';
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-[-1]"
        >
            <source src="/background/daysky.mp4" type="video/mp4" />

            Your browser does not support the video tag. 
        </video>

        {[0, 1, 2, 3].map((index) => (
            <div
            key={index}
            className={`absolute w-full h-full transition-all duration-500 ${getSlideClass(index)}`}
            >
            {renderSlide(index)}
            </div>
      ))}
        
        <QuitButton/>
    </div>
  );
};

export default Page;
