"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the Profile type
type Profile = {
  name: string;
  image: string;
  instruments: string[];
  genres: string[];
  bio: string;
};

export default function CreatePostPage() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("No file selected");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);

  // Load profile from localStorage on component mount
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      // Redirect to profile page if no profile is found
      router.push("/profile");
    }
  }, [router]);

  // Convert image to base64 for localStorage and store file name
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImage(null);
      setFileName("No file selected");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please enter some text for your post.");
      return;
    }
    if (!image) {
      setError("Please upload an image.");
      return;
    }
    setError("");

    // Check if profile is available
    if (!profile) {
      setError("Please create a profile before creating a post.");
      return;
    }

    // Save post to localStorage
    const postId = Date.now().toString(); // Unique ID for the post
    const post = {
      id: postId,
      text,
      image,
      createdAt: Date.now(),
      likes: 0,
      liked: false,
      comments: [],
      userName: profile.name,
      userImage: profile.image,
    };

    // Get existing posts, add the new post, and save
    const existingPosts = JSON.parse(localStorage.getItem("activity_posts") || "[]");
    localStorage.setItem("activity_posts", JSON.stringify([post, ...existingPosts]));

    // Redirect to activity page
    router.push("/activity");
  };

  return (
    <main className="font-serif flex flex-col items-center w-full bg-gradient-to-br from-white via-[#b9a9de] to-[#8C70C4] pt-16 pb-44">
      <section className="w-full max-w-3xl mt-12 mb-12 px-4 mx-auto">
        <h1 className="text-5xl font-extrabold text-[#8C70C4] mb-10 text-center">
          <span className="text-[#5D4197]">Create</span> a Post
        </h1>
        {profile ? (
          <form
            className="bg-white rounded-3xl shadow-lg border-4 border-[#D6CBEF] p-8 flex flex-col gap-8 items-center"
            onSubmit={handleSubmit}
          >
            <textarea
              className="w-full min-h-[120px] resize-none rounded-xl px-4 py-3 font-serif text-lg border-2 border-[#B9A9DE] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition"
              placeholder="Start the conversation here!"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
            />
            <div className="w-full flex flex-col items-center gap-2">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-[#B9A9DE] text-[#5D4197] rounded-full font-semibold text-lg shadow hover:bg-[#C8B8E5] transition"
              >
                {image ? "Change Image" : "Upload Image"}
              </button>
              <p className="text-center text-[#4B3F72] font-serif mt-1 max-w-xs truncate">
                {fileName}
              </p>
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="max-h-48 rounded-xl border-2 border-[#B9A9DE] object-cover mt-4"
                />
              )}
            </div>
            {error && (
              <div className="w-full text-center text-red-500 font-semibold">{error}</div>
            )}
            <button
              type="submit"
              className="px-8 py-3 bg-[#B9A9DE] text-[#5D4197] rounded-full font-semibold text-lg shadow hover:bg-[#C8B8E5] transition"
            >
              Post
            </button>
          </form>
        ) : (
          <div className="text-center text-[#4B3F72] text-2xl font-serif mt-16">
            Loading profile... Please create a profile first.
          </div>
        )}
      </section>
    </main>
  );
}
