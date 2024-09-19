// src/pages/Home.js
import React, { useEffect, useRef, useState } from 'react';
import InstagramCard from '../component/card';
import image1 from '../../public/images/1.png';
import image2 from '../../public/images/2.png';
import ProfileCard from '../component/Profilecard';
import VerticalMenu from '../component/menubar';
import 'animate.css';
import { getUser } from '@/services/userServices';
import { fetchPosts } from '@/services/postServices'; // Assuming this function is available

const Home = () => {
  const [ProfInfo, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1); // Track the current page for pagination
  const [hasMorePosts, setHasMorePosts] = useState(true); // Track if there are more posts to load
  const observer = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUser();
        console.log('Fetched Profile:', profile);
        setProfile(profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const initialPosts = await fetchPosts({ page: 1, limit: 10 });
        setPosts(initialPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchInitialPosts();
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMorePosts) {
            loadMorePosts();
          }
        });
      },
      {
        threshold: 1.0, // Trigger when 100% of the loader element is visible
      }
    );

    if (loaderRef.current) {
      observer.current.observe(loaderRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMorePosts]);

  const loadMorePosts = async () => {
    try {
      const newPage = page + 1;
      const newPosts = await fetchPosts({ page: newPage, limit: 10 });
      if (newPosts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage(newPage);
      } else {
        setHasMorePosts(false); // No more posts to load
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisiblePosts((prevVisiblePosts) => {
              if (!prevVisiblePosts.includes(index)) {
                return [...prevVisiblePosts, index];
              }
              return prevVisiblePosts;
            });
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll('.post');
    elements.forEach((element) => observer.current.observe(element));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [posts]);

  return (
    <div className="flex">
      {/* Fixed Vertical Menu */}
      <div className="fixed top-0 left-0 w-[15%] h-full z-20">
        <VerticalMenu />
      </div>

      {/* Instagram Feed */}
      <div className="w-[65%] ml-[17%] pt-4">
        <div className="justify-end">
          {posts.map((post, index) => (
            <div
              className={`post my-3 ${
                visiblePosts.includes(index) ? 'animate__animated animate__fadeInBottomRight' : 'opacity-0'
              }`}
              data-index={index}
              key={index}
              style={{ transition: 'opacity 0.5s ease', animationDelay: `${index * 0.2}s` }}
            >
              <InstagramCard
                profilePicture={post.profilePicture}
                username={post.username}
                handle={post.handle}
                postImage={post.postImage}
                caption={post.caption}
                initialLikes={post.initialLikes}
                initialComments={post.initialComments}
              />
            </div>
          ))}
          {hasMorePosts && (
            <div ref={loaderRef} className="loader">
              Loading more posts...
            </div>
          )}
        </div>
      </div>

      {/* Fixed Profile Card */}
      <div className="fixed top-0 right-0 w-[20%] mt-7 mr-12">
        <ProfileCard
          profilePicture={ProfInfo.profilePic || image1}
          username={ProfInfo.username || 'Default Username'}
          bio={ProfInfo.bio || 'Default Bio'}
          followers={ProfInfo.followers || 0}
          following={ProfInfo.following || 0}
          posts={ProfInfo.posts || 0}
          userId={ProfInfo._id || 0}
        />
      </div>
    </div>
  );
};

export default Home;
