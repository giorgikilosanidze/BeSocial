import { Router } from 'express';
import { createPost, getFeed } from './feed.controller.js';

const router = Router();

router.get('/posts', getFeed);

router.post('/posts', createPost);

export default router;
