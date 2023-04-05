import asyncHandler from 'express-async-handler'
import Posts from '../models/postModel.js'




// @desc    Create Post
// @route   POST /api/posts
// @access  Public
const createPost = asyncHandler(async (req, res) => {

  const { title, content } = req.body

  const post = await Posts.create({
    title, content
  })

  if (post) {
    res.status(201).json({
      _id: post._id,
      title: post.title,
      content: post.content,
    })
  } else {
    res.status(400)
    throw new Error('Invalid post data')
  }
})


// @desc    Get Posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Posts.find({});
  res.status(200).json({
      message: "posts fetched successfully",
      posts: posts
  })

})

// @desc    Get Posts ById
// @route   GET /api/posts/:id
// @access  Public

const getPostById = asyncHandler(async (req, res) => {
  const post = await Posts.findById(req.params.id);
  if(post){
    res.json({
      id: post._id,
      title: post.title,
      content: post.content,
    })
  }else {
    res.status(404)
    throw new Error('Post not found')
  }

})

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost= asyncHandler(async (req, res) => {

  await Posts.findByIdAndDelete(req.params.id)

  res.status(200).json({message: 'Post removed'})


})




// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const post = await Posts.findById(req.params.id)

  if (post) {
    post.title = req.body.title || post.title
    post.content = req.body.content || post.content

    const updatedPost = await post.save()

    res.json({
      _id: updatedPost._id,
      title: updatedPost.title,
      content: updatedPost.content,
    })
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})




export {
 createPost,
 getPosts,
 getPostById,
 deletePost,
 updatePost,
}



