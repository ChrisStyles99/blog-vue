const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/all-blogs', async(req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

router.get('/profile-blogs/:id', async(req, res) => {
  const id = req.params.id;
  const profileBlogs = await Blog.find({userId: id});
  res.json(profileBlogs);
});

router.get('/post/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.json(blog);
  } catch (error) {
    res.json(error);
  }
});

router.post('/add-blog', (req, res) => {
  const newBlog = new Blog({
    title: req.body.title,
    body: req.body.body,
    userId: req.body.userId,
    userName: req.body.userName
  });

  newBlog.save().then(result => {
    res.json({msg: 'Added blog', newBlog})
  }).catch(err => {
    res.json(err);
  });
});

router.put('/edit-blog/:id', (req, res) => {
  const id = req.params.id;

  const data = {
    title: req.body.title,
    body: req.body.body
  };

  Blog.findByIdAndUpdate(id, {$set: data})
    .then(result => {
      res.json({msg: 'Blog edited successfully'})
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete('/delete-blog/:id', async(req, res) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    res.json({msg: 'Blog deleted successfully'})
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;