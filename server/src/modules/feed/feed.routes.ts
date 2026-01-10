import { Router } from 'express';
import { postCreation, getPosts } from './feed.controller.js';
import authGuard from '../../middlewares/authGuard/authGuard.js';

const router = Router();

router.get('/posts', authGuard, getPosts);

router.post('/posts', authGuard, postCreation);

export default router;
