"use client";
import React, { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [threads, setThreads] = useState<
    { id: number; content: string; createdAt: Date }[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setThreads([
      {
        id: Date.now(),
        content: text,
        createdAt: new Date(),
      },
      ...threads,
    ]);
    setText("");
  };

  return (
    <main className="ml-64 mt-10 w-full max-w-xl text-left">
      <h1 className="text-2xl font-bold mb-6">Home</h1>

      {/* Thread Card for Creating a Post */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring"
            rows={3}
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              disabled={!text.trim()}
            >
              Post
            </button>
          </div>
        </form>
      </div>

      {/* Render Thread Cards */}
      <section className="flex flex-col gap-6">
        {threads.length === 0 ? (
          <p className="text-gray-500">No threads yet. Start the conversation!</p>
        ) : (
          threads.map((thread) => (
            <div
              key={thread.id}
              className="bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              <div className="text-gray-800 mb-2">{thread.content}</div>
              <div className="text-xs text-gray-400">
                {thread.createdAt.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
