"use client";
import React, { useEffect, useState } from "react";

type Comment = {
  text: string;
  createdAt: number;
};

type Post = {
  id: string;
  text: string;
  image: string;
  createdAt: number;
  likes: number;
  liked: boolean;
  comments: Comment[];
  reposted?: boolean;
};

function getPostsFromStorage(): Post[] {
  const storedPosts = localStorage.getItem("activity_posts");
  return storedPosts ? JSON.parse(storedPosts) : [];
}

function savePostsToStorage(posts: Post[]) {
  localStorage.setItem("activity_posts", JSON.stringify(posts));
}

export default function ActivityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentInputs, setCommentInputs] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    const initialPosts = getPostsFromStorage();
    // Ensure each post has a comments array
    const postsWithComments = initialPosts.map(post => ({
      ...post,
      comments: post.comments || [], // Initialize comments if undefined
    }));
    setPosts(postsWithComments);
  }, []);

  // Like/unlike a post
  const handleLike = (id: string) => {
    const updated = posts.map(post =>
      post.id === id
        ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        : post
    );
    setPosts(updated);
    savePostsToStorage(updated);
  };

  // Add a comment
  const handleComment = (id: string) => {
    const text = commentInputs[id]?.trim();
    if (!text) return;
    const updated = posts.map(post =>
      post.id === id
        ? {
            ...post,
            comments: [
              ...post.comments,
              { text, createdAt: Date.now() }
            ]
          }
        : post
    );
    setPosts(updated);
    savePostsToStorage(updated);
    setCommentInputs({ ...commentInputs, [id]: "" });
  };

  // Repost
  const handleRepost = (post: Post) => {
    const repost: Post = {
      ...post,
      id: `${post.id}-repost-${Date.now()}`,
      createdAt: Date.now(),
      reposted: true,
      comments: [],
      likes: 0,
      liked: false,
    };
    const updated = [repost, ...posts];
    setPosts(updated);
    savePostsToStorage(updated);
  };

  // Delete
  const handleDelete = (id: string) => {
    const updated = posts.filter(post => post.id !== id);
    setPosts(updated);
    savePostsToStorage(updated);
  };

  // Dynamic bottom padding
  const bottomPadding = posts.length === 0 ? "pb-16" : "pb-44";

  return (
    <main className={`font-serif flex flex-col items-center w-full bg-gradient-to-br from-white via-[#b9a9de] to-[#8C70C4] pt-16 ${bottomPadding}`}>
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
            {posts.map((post, idx) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border-4 border-[#D6CBEF] flex flex-col items-center"
              >
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full max-h-80 object-cover"
                />
                <div className="p-6 w-full text-center">
                  {post.reposted && (
                    <div className="mb-2 text-[#B9A9DE] font-semibold">Reposted</div>
                  )}
                  <p className="text-xl text-[#7A5FB3] mb-2 whitespace-pre-line">{post.text}</p>
                  <span className="text-[#A694D6] text-sm block mb-4">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                  <div className="flex justify-center gap-8 mb-4">
                    {/* Like */}
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-[#E0D6F3] transition"
                      aria-label="Like"
                    >
                      <span className={post.liked ? "text-[#8C70C4]" : "text-gray-400"}>
                        {post.liked ? "♥" : "♡"}
                      </span>
                      <span className="text-[#7A5FB3] font-semibold">{post.likes}</span>
                    </button>
                    {/* Comment */}
                    <button
                      onClick={() => {
                        // Focus the comment input (handled below)
                        const input = document.getElementById(`comment-input-${post.id}`);
                        if (input) (input as HTMLInputElement).focus();
                      }}
                      className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-[#E0D6F3] transition"
                      aria-label="Comment"
                    >
                      <span role="img" aria-label="comment" className="text-[#A694D6]">💬</span>
                      <span className="text-[#7A5FB3] font-semibold">{post.comments.length}</span>
                    </button>
                    {/* Repost */}
                    <button
                      onClick={() => handleRepost(post)}
                      className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-[#E0D6F3] transition"
                      aria-label="Repost"
                    >
                      <span role="img" aria-label="repost" className="text-[#A694D6]">🔁</span>
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-red-100 transition"
                      aria-label="Delete"
                    >
                      <span role="img" aria-label="delete" className="text-red-400">🗑️</span>
                    </button>
                  </div>
                  {/* Comment Input */}
                  <div className="flex flex-col items-center gap-2 mb-4">
                    <input
                      id={`comment-input-${post.id}`}
                      type="text"
                      value={commentInputs[post.id] || ""}
                      onChange={e =>
                        setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                      }
                      placeholder="Add a comment..."
                      className="w-full max-w-md px-4 py-2 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition"
                      onKeyDown={e => {
                        if (e.key === "Enter") handleComment(post.id);
                      }}
                    />
                    <button
                      onClick={() => handleComment(post.id)}
                      className="px-4 py-1 bg-[#B9A9DE] text-[#5D4197] rounded-full font-semibold text-sm shadow hover:bg-[#C8B8E5] transition"
                    >
                      Comment
                    </button>
                  </div>
                  {/* Comments List */}
                  {post.comments.length > 0 && (
                    <div className="bg-[#F3F0FA] rounded-xl p-4 mt-2 text-left max-w-2xl mx-auto">
                      <h4 className="text-[#8C70C4] font-bold mb-2 text-sm">Comments</h4>
                      <ul className="space-y-2">
                        {post.comments.map((c, i) => (
                          <li key={i} className="text-[#7A5FB3] text-base">
                            <span className="font-semibold">{new Date(c.createdAt).toLocaleTimeString()}:</span> {c.text}
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
