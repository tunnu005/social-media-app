import React, { useEffect, useRef, useState } from 'react';
import InstagramCard from '../component/card';
import image1 from '../../public/images/1.png';
import ProfileCard from '../component/Profilecard';
import VerticalMenu from '../component/menubar';
import 'animate.css';
import { getUser } from '@/services/userServices';
import { gethomepost } from '@/services/postServices'; // Assuming this function is available
import { comment } from 'postcss';

const Home = () => {
  const [ProfInfo, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1); // Track the current page for pagination
  const [hasMorePosts, setHasMorePosts] = useState(true); // Track if there are more posts to load
  const observer = useRef(null);
  const loaderRef = useRef(null);

  // Fetch user profile
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

  // Fetch initial posts
  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const initialPosts = await gethomepost({ page: 1, limit: 5 }); // Fetching 5 posts initially
        setPosts(initialPosts);
        console.log(initialPosts);
        console.log(posts)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchInitialPosts();
  }, []);


  // Observer for infinite scroll
  useEffect(() => {
    const intersectionCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasMorePosts) {

          loadMorePosts(); // Trigger loading more posts
        }
      });
    };

    observer.current = new IntersectionObserver(intersectionCallback, {
      threshold: 1.0, // Trigger when 100% of the loader element is visible
    });

    if (loaderRef.current) {
      observer.current.observe(loaderRef.current); // Start observing the loader
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect(); // Clean up observer on unmount
      }
    };
  }, [hasMorePosts]);

  // Load more posts when scrolled to the bottom
  const loadMorePosts = async () => {
    try {
      const newPage = page + 1;
      console.log("page : ",newPage)
      const newPosts = await gethomepost({ page: newPage, limit: 5 });
      
      // Safeguard: Ensure newPosts is an array
      if (Array.isArray(newPosts) && newPosts.length > 0) {
        console.log("trigger");
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage(newPage);
      } else {
        setHasMorePosts(false); // No more posts to load
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
  };
  

  // Observer for post visibility animations
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
  }, [posts]);

  const Comments = [{id:1,user:"Mysterious_!Soul🌌",text:"You’re killing it! Keep shining! 💪✨"},
    {id:2,user:"Coffee_@Sunrise🌅",text:"So much talent! Proud of you! 👏🔥"},{id:3,user:"Nature_@Heart🌳",text:"Absolutely gorgeous! 😍🌸"},
    {id:4,user:"Gamer!_Alex_92🎮",text:"Can’t get enough of this! 💯🌈"},
    {id:5,user:"Flirty_@Heart💋",text:"YStunning! You’ve got my heart racing! 💓🔥"}
  ]
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
              style={{ transition: 'opacity 0.5s ease', animationDelay: `${index == 0 ? index * 0.2 : 0.2}s` }}
            >
              <InstagramCard
                profilePicture={post.userId.profilePic}
                username={post.userId.username}
                
                postImage={post.image}
                caption={post.caption}
                initialLikes={post.likes}
                initialComments={Comments}
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
