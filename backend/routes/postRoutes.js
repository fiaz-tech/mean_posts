import {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost

 } from '../controllers/postController.js'

 import express from 'express'
const router = express.Router()


router.route('/').post(createPost).get(getPosts)


router.route('/:id/update').put(updatePost)

router.route('/:id')
.get(getPostById)
.delete(deletePost)




export default router
