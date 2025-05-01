"use client";
import React, { useEffect, useState } from "react";

type InterestedUser = {
  name: string;
  contact: string;
  createdAt: number;
};

type Post = {
  id: string;
  instruments: string[];
  songName: string;
  genre: string;
  createdAt: number;
  interested?: InterestedUser[];
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
  const [interestInputs, setInterestInputs] = useState<Record<string, { name: string; contact: string }>>({});

  useEffect(() => {
    const initialPosts = getPostsFromStorage().map(post => ({
      ...post,
      interested: Array.isArray(post.interested) ? post.interested : []
    }));
    setPosts(initialPosts);
  }, []);

  // Validate name: exactly two words (first and last)
  const isValidName = (name: string) => {
    const parts = name.trim().split(/\s+/);
    return parts.length === 2 && parts.every(part => part.length > 0);
  };

  // Validate UTD email ending with @utdallas.edu (case-insensitive)
  const isValidUtdEmail = (email: string) => {
    const utdEmailRegex = /^[a-zA-Z0-9._%+-]+@utdallas\.edu$/i;
    return utdEmailRegex.test(email.trim());
  };

  const handleInterestChange = (postId: string, field: "name" | "contact", value: string) => {
    setInterestInputs(inputs => ({
      ...inputs,
      [postId]: {
        ...inputs[postId],
        [field]: value,
      },
    }));
  };

  const handleInterestSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const interest = interestInputs[postId];
    if (!interest) {
      alert("Please enter your name and UTD email.");
      return;
    }
    const name = interest.name.trim();
    const contact = interest.contact.trim();

    if (!name || !contact) {
      alert("Please enter your name and UTD email.");
      return;
    }
    if (!isValidName(name)) {
      alert("Please enter your first and last name only.");
      return;
    }
    if (!isValidUtdEmail(contact)) {
      alert("Please enter a valid UTD email ending with @utdallas.edu.");
      return;
    }

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          interested: [
            ...(Array.isArray(post.interested) ? post.interested : []),
            { name, contact, createdAt: Date.now() }
          ]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    savePostsToStorage(updatedPosts);

    setInterestInputs(inputs => ({
      ...inputs,
      [postId]: { name: "", contact: "" }
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
            {posts.map(post => {
              // Ensure each post has its own input state
              const inputState = interestInputs[post.id] || { name: "", contact: "" };
              return (
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

                  {/* Interest Form */}
                  <div className="w-full mt-6">
                    <h3 className="text-lg font-bold text-[#8C70C4] mb-4">Express Interest</h3>
                    <form
                      className="flex flex-col md:flex-row gap-3 items-center mb-6"
                      onSubmit={e => handleInterestSubmit(post.id, e)}
                    >
                      <input
                        type="text"
                        placeholder="First Last Name"
                        value={inputState.name}
                        onChange={e => handleInterestChange(post.id, "name", e.target.value)}
                        className="px-3 py-2 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition w-full md:w-48"
                        maxLength={50}
                      />
                      <input
                        type="email"
                        placeholder="Your UTD email (e.g. jsmith@utdallas.edu)"
                        value={inputState.contact}
                        onChange={e => handleInterestChange(post.id, "contact", e.target.value)}
                        className="px-3 py-2 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition w-full md:w-64"
                        maxLength={100}
                      />
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#B9A9DE] text-[#5D4197] rounded-full font-semibold text-base shadow hover:bg-[#C8B8E5] transition whitespace-nowrap"
                      >
                        I'm Interested
                      </button>
                    </form>

                    {/* Interested Users List */}
                    <div className="border-t border-[#D6CBEF] pt-4">
                      <h4 className="text-md font-semibold text-[#7A5FB3] mb-2">Who is Interested</h4>
                      {post.interested && post.interested.length > 0 ? (
                        <ul className="list-disc list-inside text-[#4B3F72] space-y-1">
                          {post.interested.map((i, idx) => (
                            <li key={idx}>
                              {i.name} <span className="text-[#A694D6]">({i.contact.toLowerCase()})</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-[#A694D6]">No one has expressed interest yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
