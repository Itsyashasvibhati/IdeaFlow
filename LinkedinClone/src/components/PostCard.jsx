import React from "react";
import API from "../utils/api";
import { getUser } from "../utils/auth";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function PostCard({ post, onDeleted }) {
  const current = getUser();
  const ownerId = current?.id?.toString();
  const postOwnerId = post.user?._id?.toString();

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;

    try {
      await API.delete(`/api/posts/${post._id}`);
      if (onDeleted) onDeleted(post._id);
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl rounded-2xl shadow p-5 border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-gray-900">
            {post.user?.name || "Unknown User"}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>

        {ownerId === postOwnerId && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Text */}
      <div className="mt-3 text-gray-800 leading-relaxed">{post.text}</div>

      {/* Image */}
      {post.image && (
        <div className="mt-4">
          <img
            src={post.image}
            alt="post"
            className="rounded-xl max-h-96 object-cover shadow-sm"
          />
        </div>
      )}
    </motion.div>
  );
}
