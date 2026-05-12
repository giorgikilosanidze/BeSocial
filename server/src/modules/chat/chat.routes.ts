import { Router } from 'express';
import authGuard from '../../middlewares/authGuard/authGuard.js';
import { getChat, getChats, postChat } from './chat.controller.js';

const router = Router();

router.get('/', authGuard, getChats);
router.get('/:receiverId', authGuard, getChat);

router.post('/send', authGuard, postChat);

export default router;
