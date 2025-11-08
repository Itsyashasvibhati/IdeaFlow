import React, { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { getUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const nav = useNavigate();
  const user = getUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      nav("/login");
      return;
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addPost = (p) => setPosts((prev) => [p, ...prev]);
  const removePost = (id) =>
    setPosts((prev) => prev.filter((x) => x._id !== id));

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-xl font-semibold">Welcome, {user?.name}</h2>
          <p className="text-sm text-gray-500">
            Share an update with your network.
          </p>
        </div>

        <CreatePost onPostCreated={addPost} />

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4">
            {posts.map((p) => (
              <PostCard key={p._id} post={p} onDeleted={removePost} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
