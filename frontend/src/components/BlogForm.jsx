import { useState } from "react";

const BlogForm = ({ onSavePost }) => {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setContent(data.GenText);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSavePost = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      alert(data.message);
      setContent("");
      setPrompt("");

      // Pass the new post back to the parent component
      if (onSavePost) {
        onSavePost(data.post);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Generate a Blog Post
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="prompt"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Prompt:
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Type your prompt here..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Generate Post
        </button>
      </form>

      {content && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md">
          <h3 className="text-xl font-semibold text-gray-700">
            Generated Blog Post
          </h3>
          <textarea
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleSavePost}
            className="my-3 py-2 w-full px-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Save Post
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogForm;
