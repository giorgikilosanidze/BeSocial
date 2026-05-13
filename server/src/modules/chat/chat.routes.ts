import { Router } from 'express';
import authGuard from '../../middlewares/authGuard/authGuard.js';
import { getChat, getChatPresence, getChats, postChat } from './chat.controller.js';

const router = Router();

router.get('/', authGuard, getChats);
router.get('/presence/:receiverId', authGuard, getChatPresence);
router.get('/:receiverId', authGuard, getChat);

router.post('/send', authGuard, postChat);

export default router;
