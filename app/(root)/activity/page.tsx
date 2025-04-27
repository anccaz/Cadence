"use client";
import React, { useEffect, useState } from "react";

type Comment = {
  id: string;
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
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  useEffect(() => {
    const initialPosts = getPostsFromStorage();
    setPosts(initialPosts);
  }, []);

  const handleCommentChange = (postId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInputs({
      ...commentInputs,
      [postId]: event.target.value,
    });
  };

  const handleCommentSubmit = (postId: string) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    const newComment = {
      id: Date.now().toString(),
      text: commentText,
      createdAt: Date.now(),
    };

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), newComment],
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    savePostsToStorage(updatedPosts);
    setCommentInputs({ ...commentInputs, [postId]: "" });
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
                {/* Comment Input */}
                <div className="flex flex-col items-center w-full mt-4">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full max-w-md px-4 py-2 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition"
                    value={commentInputs[post.id] || ""}
                    onChange={(event) => handleCommentChange(post.id, event)}
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="mt-2 px-4 py-1 bg-[#B9A9DE] text-[#5D4197] rounded-full font-semibold text-sm shadow hover:bg-[#C8B8E5] transition"
                  >
                    Post Comment
                  </button>
                </div>
                {/* Display Comments */}
                {post.comments && post.comments.length > 0 && (
                  <div className="w-full mt-4">
                    <h4 className="text-[#8C70C4] font-bold mb-2 text-sm">Comments:</h4>
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="mb-2 p-2 rounded-md bg-[#F3F0FA]">
                        <p className="text-sm text-[#4B3F72]">{comment.text}</p>
                        <p className="text-xs text-[#A694D6]">
                          Posted on {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
