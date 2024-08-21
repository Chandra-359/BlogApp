import BlogForm from "./components/BlogForm";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data.message);

      setPosts((prevPosts) => prevPosts.filter(post => post._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8">
        <h1 className="text-5xl font-extrabold text-white text-center mb-12 shadow-lg">
          Write Your Blog
        </h1>
        <div className="w-full max-w-xl mb-16">
          <BlogForm onSavePost={handleNewPost} />
        </div>
      </div>
      <div className="bg-gray-100 py-10">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Blog Posts
        </h2>
        <ul className="max-w-4xl mx-auto space-y-6">
          {posts &&
            posts.map((post) => (
              <li key={post._id} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                  <textarea
                    className="block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
                    rows="8"
                    value={post.content}
                    readOnly
                  />
                </div>
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Delete Post
                </button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
