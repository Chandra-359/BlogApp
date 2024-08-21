import { useState } from "react";
import PropTypes from 'prop-types';

const BlogForm = ({ onSavePost }) => {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePost = async () => {
    setIsLoading(true);
    setSuccessMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      setContent("");
      setPrompt("");
      setSuccessMessage("Post created successfully!");

      if (onSavePost) {
        onSavePost(data.post);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Generate a Blog Post
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Type your prompt here..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Generating...
            </>
          ) : (
            "Generate Post"
          )}
        </button>
      </form>

      {content && (
        <div className="mt-8 p-6 bg-gray-50 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Generated Blog Post
          </h3>
          <textarea
            className="block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleSavePost}
            className="mt-4 w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Post"
            )}
          </button>
        </div>
      )}

      {successMessage && (
        <p className="mt-4 text-center text-green-600 font-semibold">
          {successMessage}
        </p>
      )}
    </div>
  );
};

BlogForm.propTypes = {
  onSavePost: PropTypes.func.isRequired,
};

export default BlogForm;
