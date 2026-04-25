import { Router } from 'express';
import authGuard from '../../middlewares/authGuard/authGuard.js';
import { getChat, postChat } from './chat.controller.js';

const router = Router();

router.get('/:userId', authGuard, getChat);

router.post('/send', authGuard, postChat);

export default router;
