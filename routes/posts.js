const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

// router.get("/", (req, res) => {
//   res.send("Posts");
// });

//POST (Create Data)
router.post("/", async (req, res) => {
  // console.log(req.body); //needs body-parser when POST from postman
  // ALWAYS CREATE NEW MODEL
  // EXTRACT EVERYTHING FROM DATA THEN SAVE TO MONGODB
  const postData = new Post({
    user: req.body.user,
    title: req.body.title,
    text: req.body.text,
    hashtag: req.body.hashtag,
    location: req.body.location,
    url: req.body.url,
  });
  try {
    const postToSave = await postData.save();
    req.send(postToSave);
  } catch (err) {
    res.send({ message: err });
  }
});

// GET 1 (Read ALL)
// can set limit
router.get("/", async (req, res) => {
  try {
    const getPosts = await Post.find().limit(10);
    res.send(getPosts);
  } catch (err) {
    req.send({ message: err });
  }
});

// GET 2 (Read ONE)
router.get("/:postId", async (req, res) => {
  try {
    const getPostById = await Post.findById(req.params.postId);
    res.send(getPostById);
    console.log("getPostById", getPostById);
  } catch (err) {
    res.send({ message: err });
  }
});

// PATCH (Update)
router.patch("/:postId", async (req, res) => {
  try {
    const updatePostById = await Post.updateOne(
      { _id: req.params.postId }, //match id in database
      {
        $set: {
          user: req.body.user,
          title: req.body.title,
          text: req.body.text,
          hashtag: req.body.hashtag,
          location: req.body.location,
          url: req.body.url,
        },
        //set data to the new post data
      }
    );
    res.send(updatePostById);
  } catch (err) {
    res.send({ message: err });
  }
});

// Delete (Delete)
router.delete("/:postId", async (req, res) => {
  try {
    const deletePostbyId = await Post.deleteOne({
      _id: req.params.postId,
    });
    res.send(deletePostbyId);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
