import { Router } from 'express';
import { postCreation, getPosts, editPost, deletePost, handleReaction, getSinglePost } from './feed.controller.js';
import authGuard from '../../middlewares/authGuard/authGuard.js';
import { permissionGuard } from '../../middlewares/permissionGuard/permissionGuard.js';
import { getAuthorIdByParams } from '../post/post.repository.js';

const router = Router();

router.get('/posts', authGuard, getPosts);
router.get('/posts/:postId', authGuard, getSinglePost);

router.post('/posts', authGuard, postCreation);

router.patch('/posts/:postId', authGuard, permissionGuard(getAuthorIdByParams), editPost);

router.delete('/posts/:postId', authGuard, permissionGuard(getAuthorIdByParams), deletePost);

router.post('/reaction', authGuard, handleReaction);

export default router;
