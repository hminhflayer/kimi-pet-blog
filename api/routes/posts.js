'use strict';

import express from "express";
import postController from '../controllers/post.js';
const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);

router.post('/', postController.addPost);
router.patch('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost)

export default router;