import { Router } from 'express';
import { postCreation, getFeed } from './feed.controller.js';
import authGuard from '../../middlewares/authGuard/authGuard.js';

const router = Router();

router.get('/posts', getFeed);

router.post('/posts', authGuard, postCreation);

export default router;
