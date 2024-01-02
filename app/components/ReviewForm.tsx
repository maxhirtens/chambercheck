"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Subtitle from "./Subtitle";

const Review: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push("/reviews");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={submitData}>
          <Subtitle text="New Review" />
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <button
            disabled={!content || !title}
            type="submit"
            className="p-3 px-6 mr-2 text-white bg-darkBlue rounded-full baseline text-xl hover:bg-blue-800"
          >
            Create
          </button>
          <a
            className="p-3 px-6 mr-2 text-white bg-red-400 rounded-full baseline text-xl hover:bg-red-500"
            href="/"
          >
            Cancel
          </a>
        </form>
      </div>

      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.5rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }
      `}</style>
    </>
  );
};

export default Review;
