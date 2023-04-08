import {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
  storage,

 } from '../controllers/postController.js'
 import multer from 'multer'

 import express from 'express'
const router = express.Router()



router.route('/')
.post(multer({storage: storage}).single('image'), createPost)
.get(getPosts)


router.route('/:id/update').put(multer({storage: storage}).single('image'), updatePost)

router.route('/:id')
.get(getPostById)
.delete(deletePost)




export default router
