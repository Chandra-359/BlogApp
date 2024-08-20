import BlogForm from "./components/BlogForm";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 p-4">
        <h1 className="text-4xl font-bold text-slate-600 text-center mb-8 shadow-sm">
          Lets Write a Blog
        </h1>
        <div className="w-full max-w-md">
          <BlogForm />
        </div>
      </div>
    </>
  );
}

export default App;
