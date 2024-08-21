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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 p-4">
        <h1 className="text-4xl font-bold text-slate-600 text-center mb-8 shadow-sm">
          Lets Write a Blog
        </h1>
        <div className="w-full max-w-md">
          <BlogForm onSavePost={handleNewPost} />
        </div>
      </div>
      <div>
        <h1>Blog Posts</h1>
        <ul>
          {posts &&
            posts.map((post) => (
              <li key={post._id}>
                <div className="mt-8 p-4 bg-gray-100 rounded-md">
                  <textarea
                    className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows="10"
                    value={post.content}
                    readOnly
                  />
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="my-3 py-2 w-full px-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    Delete Post
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
