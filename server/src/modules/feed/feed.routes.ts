import { Router } from 'express';
import { postCreation, getFeed } from './feed.controller.js';

const router = Router();

router.get('/posts', getFeed);

router.post('/posts', postCreation);

export default router;
