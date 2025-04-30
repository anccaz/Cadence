"use client";
import React, { useEffect, useState } from "react";

type Post = {
  id: string;
  instruments: string[];
  songName: string;
  genre: string;
  createdAt: number;
  interestedMusicians: string[];
};

function getPostsFromStorage(): Post[] {
  try {
    const storedPosts = localStorage.getItem("activity_posts");
    return storedPosts ? JSON.parse(storedPosts) : [];
  } catch (error) {
    console.error("Error parsing posts from localStorage:", error);
    return [];
  }
}

function savePostsToStorage(posts: Post[]) {
  try {
    localStorage.setItem("activity_posts", JSON.stringify(posts));
  } catch (error) {
    console.error("Error saving posts to localStorage:", error);
  }
}

export default function ActivityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [profileName, setProfileName] = useState<string>(""); // default to empty string

  useEffect(() => {
    const initialPosts = getPostsFromStorage();
    setPosts(initialPosts);
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);
        setProfileName(typeof profile.name === "string" ? profile.name : "");
      } catch (error) {
        setProfileName("");
      }
    } else {
      setProfileName("");
    }
  }, []);

  const handleInterestedClick = (postId: string) => {
    if (!profileName) {
      alert("Please create a profile before expressing interest.");
      return;
    }

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const isInterested = post.interestedMusicians.includes(profileName);
        let updatedInterestedMusicians = [...post.interestedMusicians];

        if (isInterested) {
          updatedInterestedMusicians = updatedInterestedMusicians.filter(name => name !== profileName);
        } else {
          updatedInterestedMusicians.push(profileName);
        }

        return {
          ...post,
          interestedMusicians: updatedInterestedMusicians,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    savePostsToStorage(updatedPosts);
  };

  return (
    <main className="font-serif flex flex-col items-center w-full bg-gradient-to-br from-white via-[#b9a9de] to-[#8C70C4] pt-16 pb-44">
      <section className="w-full max-w-4xl mt-12 mb-12 px-4 mx-auto">
        <h1 className="text-5xl font-extrabold text-[#8C70C4] mb-10 text-center">
          <span className="text-[#5D4197]">Activity</span> Feed
        </h1>
        {posts.length === 0 ? (
          <div className="text-center text-[#4B3F72] text-2xl font-serif mt-16">
            No posts yet. Create a post to get started!
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border-4 border-[#D6CBEF] flex flex-col items-center p-6"
              >
                <h2 className="text-2xl font-bold text-[#7A5FB3] mb-2">
                  Song Name & Artist: {post.songName}
                </h2>
                <p className="text-xl text-[#A694D6] mb-1">
                  Seeking: {post.instruments?.join(", ") || "No instruments specified"}
                </p>
                <p className="text-lg text-[#4B3F72]">
                  Genre: {post.genre}
                </p>
                <div className="flex flex-col items-center w-full mt-4">
                  <button
                    onClick={() => handleInterestedClick(post.id)}
                    className="mt-2 px-4 py-1 bg-[#B9A9DE] text-[#5D4197] rounded-full font-semibold text-sm shadow hover:bg-[#C8B8E5] transition"
                  >
                    {profileName && post.interestedMusicians.includes(profileName)
                      ? "Remove Interest"
                      : "Express Interest"}
                  </button>

                  {post.interestedMusicians && post.interestedMusicians.length > 0 && (
                    <div className="w-full mt-2">
                      <h4 className="text-[#8C70C4] font-bold mb-1 text-sm">Interested Musicians:</h4>
                      <ul className="list-disc pl-5">
                        {post.interestedMusicians.map((musician, index) => (
                          <li key={index} className="text-sm text-[#4B3F72]">
                            {musician}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
