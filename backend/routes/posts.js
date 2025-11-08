const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const Post = require("../models/Post");


router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const text = req.body.text;
    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const post = new Post({
      user: req.user._id,
      text,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await post.save();
    await post.populate("user", "name avatar");

    res.json(post);
  } catch (err) {
    console.error("Post creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error("Get posts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/user/:id", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error("User posts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

   
    const currentUserId = req.user.id || req.user._id;

    if (post.user.toString() !== currentUserId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post removed" });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
