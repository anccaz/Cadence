"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("No file selected");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

    // Save post to localStorage
    const post = { text, image, createdAt: Date.now() };
    const existing = JSON.parse(localStorage.getItem("activity_posts") || "[]");
    localStorage.setItem("activity_posts", JSON.stringify([post, ...existing]));

    // Redirect to activity page
    router.push("/activity");
  };

  return (
    <main className="font-serif flex flex-col items-center w-full bg-gradient-to-br from-white via-[#b9a9de] to-[#8C70C4] pt-16 pb-44">
      <section className="w-full max-w-3xl mt-12 mb-12 px-4 mx-auto">
        <h1 className="text-5xl font-extrabold text-[#8C70C4] mb-10 text-center">
          <span className="text-[#5D4197]">Create</span> a Post
        </h1>
        <form
          className="bg-white rounded-3xl shadow-lg border-4 border-[#D6CBEF] p-8 flex flex-col gap-8 items-center"
          onSubmit={handleSubmit}
        >
          <textarea
            className="w-full min-h-[120px] resize-none rounded-xl px-4 py-3 font-serif text-lg border-2 border-[#B9A9DE] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition"
            placeholder="What's on your mind?"
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
      </section>
    </main>
  );
}
