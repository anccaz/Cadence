"use client";
import React, { useEffect, useState } from "react";

type Comment = {
  name: string;
  text: string;
  createdAt: number;
};

type Post = {
  id: string;
  instruments: string[];
  songName: string;
  genre: string;
  createdAt: number;
  comments: Comment[];
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
  const [commentInputs, setCommentInputs] = useState<Record<string, { name: string; text: string }>>({});

  useEffect(() => {
    const initialPosts = getPostsFromStorage();
    setPosts(initialPosts);
  }, []);

  const handleCommentChange = (postId: string, field: "name" | "text", value: string) => {
    setCommentInputs((inputs) => ({
      ...inputs,
      [postId]: {
        ...inputs[postId],
        [field]: value,
      },
    }));
  };

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const comment = commentInputs[postId];
    if (!comment || !comment.name.trim() || !comment.text.trim()) {
      alert("Please enter your name and a comment.");
      return;
    }

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            { name: comment.name.trim(), text: comment.text.trim(), createdAt: Date.now() }
          ]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    savePostsToStorage(updatedPosts);

    // Clear the comment input for this post
    setCommentInputs(inputs => ({
      ...inputs,
      [postId]: { name: "", text: "" }
    }));
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
                {/* Comments Section */}
                <div className="w-full mt-6">
                  <h3 className="text-lg font-bold text-[#8C70C4] mb-2">Comments</h3>
                  <form
                    className="flex flex-col md:flex-row gap-2 items-center mb-4"
                    onSubmit={e => handleCommentSubmit(post.id, e)}
                  >
                    <input
                      type="text"
                      placeholder="Your name"
                      value={commentInputs[post.id]?.name || ""}
                      onChange={e => handleCommentChange(post.id, "name", e.target.value)}
                      className="px-3 py-1 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition w-40"
                    />
                    <input
                      type="text"
                      placeholder="Leave a comment..."
                      value={commentInputs[post.id]?.text || ""}
                      onChange={e => handleCommentChange(post.id, "text", e.target.value)}
                      className="px-3 py-1 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition w-64"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1 bg-[#B9A9DE] text-[#5D4197] rounded-full font-semibold text-sm shadow hover:bg-[#C8B8E5] transition"
                    >
                      Comment
                    </button>
                  </form>
                  {post.comments && post.comments.length > 0 ? (
                    <ul className="w-full">
                      {post.comments.map((c, idx) => (
                        <li key={idx} className="mb-2 text-[#4B3F72]">
                          <span className="font-semibold">{c.name}</span>: {c.text}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-sm text-[#A694D6]">No comments yet.</div>
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
