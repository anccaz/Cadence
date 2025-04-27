"use client";
import React, { useEffect, useState } from "react";

type Post = {
  id: string;
  instruments: string[];
  songName: string;
  genre: string;
  createdAt: number;
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

  useEffect(() => {
    const initialPosts = getPostsFromStorage();
    // Ensure each post has an instruments array
    const postsWithInstruments = initialPosts.map(post => ({
      ...post,
      instruments: post.instruments || [], // Initialize instruments if undefined
    }));
    setPosts(postsWithInstruments);
  }, []);

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
                  Song Name: {post.songName}
                </h2>
                <p className="text-xl text-[#A694D6] mb-1">
                  Seeking: {post.instruments?.join(", ") || "No instruments specified"}
                </p>
                <p className="text-lg text-[#4B3F72]">
                  Genre: {post.genre}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

