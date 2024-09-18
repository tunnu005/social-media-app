import React, { useEffect, useRef, useState } from 'react';
import InstagramCard from '../component/card';
import image1 from '../../public/images/1.png';
import image2 from '../../public/images/2.png';
import ProfileCard from '../component/Profilecard';
import VerticalMenu from '../component/menubar';
import 'animate.css';
import { getProfile, getUser } from '@/services/userServices';

const Home = () => {
  const [ProfInfo, setProfile] = useState({});

  useEffect(() => {
    const Profilehandle = async () => {
      try {
        const Profile = await getUser();
        console.log('Fetched Profile:', Profile); // Log fetched data
        setProfile(Profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    Profilehandle();
  }, []);

  useEffect(() => {
    console.log('ProfInfo updated:', ProfInfo); // Log ProfInfo whenever it updates
  }, [ProfInfo]);

  const posts = [
    // Your posts data here...
  ];

  const [visiblePosts, setVisiblePosts] = useState([]); // Track visible posts

  const observer = useRef(null);

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
        threshold: 0.1, // Trigger when 10% of the post is visible
      }
    );

    const elements = document.querySelectorAll('.post');
    elements.forEach((element) => observer.current.observe(element));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="flex">
      {/* Fixed Vertical Menu */}
      <div className="fixed top-0 left-0 w-[15%] h-full z-20">
        <VerticalMenu />
      </div>

      {/* Instagram Feed */}
      <div className="w-[65%] ml-[17%] pt-4 items-end justify-end">
        <div className="justify-end">
          {posts.map((post, index) => (
            <div
              className={`post my-3 ${
                visiblePosts.includes(index) ? 'animate__animated animate__fadeInBottomRight' : 'opacity-0'
              }`}
              data-index={index}
              key={index}
              style={{ transition: 'opacity 0.5s ease', animationDelay: `${index === 1 ? index * 0.2 : 0.1}s` }}
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
        </div>
      </div>

      {/* Fixed Profile Card */}
      <div className="fixed top-0 right-0 w-[20%] mt-7 mr-12">
        <ProfileCard
          profilePicture={ProfInfo.profilePic || image1}
          username={ProfInfo.username || 'Default Username'} // Use ProfInfo.username here
          bio={ProfInfo.bio || 'The ProfileCard now has ample margin and padding, giving it a well-spaced and neat appearance.'} // Ensure ProfInfo contains this or provide a default
          followers={ProfInfo.followers || 0} // Ensure ProfInfo contains this or provide a default
          following={ProfInfo.following || 0} // Ensure ProfInfo contains this or provide a default
          posts={ProfInfo.posts || 0} // Ensure ProfInfo contains this or provide a default
          userId={ProfInfo._id || 0} // Ensure ProfInfo contains this or provide a default
        />
      </div>
    </div>
  );
};

export default Home;
