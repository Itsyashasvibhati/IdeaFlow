import React, { useState } from "react";
import API from "../utils/api";
import { motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import { Image as ImageIcon, Smile, Loader } from "lucide-react";

export default function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const addEmoji = (emoji) => {
    setText((prev) => prev + emoji.emoji);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("text", text);
      if (image) formData.append("image", image);

      const res = await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setText("");
      setImage(null);
      setPreview(null);
      setShowEmoji(false);

      if (onPostCreated) onPostCreated(res.data);
    } catch (err) {
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow p-5 border border-gray-100 relative"
    >
      <form onSubmit={submit} className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share something with your network..."
          className="w-full border rounded-xl p-3 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
          rows="3"
        />

        {/* Emoji Picker */}
        {showEmoji && (
          <div className="absolute z-20 top-24 left-4">
            <EmojiPicker onEmojiClick={addEmoji} />
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div className="relative w-full">
            <img src={preview} className="rounded-xl max-h-64 object-cover" />
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setImage(null);
              }}
              className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded shadow text-sm"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Upload button */}
            <label className="flex items-center gap-2 text-blue-600 cursor-pointer">
              <ImageIcon size={22} />
              Upload
              <input type="file" onChange={handleImage} className="hidden" />
            </label>

            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
              className="text-yellow-600"
            >
              <Smile size={24} />
            </button>
          </div>

          <button
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader className="animate-spin" size={18} /> Posting...
              </div>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
