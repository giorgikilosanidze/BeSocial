import { Router } from 'express';
import { postCreation, getPosts, editPost, deletePost } from './feed.controller.js';
import authGuard from '../../middlewares/authGuard/authGuard.js';

const router = Router();

router.get('/posts', authGuard, getPosts);

router.post('/posts', authGuard, postCreation);

router.patch('/posts/:postId', authGuard, editPost);

router.delete('/posts/:postId', authGuard, deletePost);

export default router;
