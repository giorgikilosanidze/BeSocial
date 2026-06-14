import { Router } from 'express';
import authGuard from '../../middlewares/authGuard/authGuard.js';
import upload from '../../middlewares/upload.js';
import {
	followOrUnfollow,
	getUserProfile,
	uploadCoverPhoto,
	uploadProfilePicture,
	getFollowers,
	getFollowing,
	deleteProfilePicture,
	deleteCoverPhoto,
} from './profile.controller.js';

const router = Router();

router.get('/user/:userId', authGuard, getUserProfile);

router.post('/profilePicture/:userId', authGuard, upload.array('image', 1), uploadProfilePicture);
router.delete('/profilePicture/:userId', authGuard, deleteProfilePicture);

router.post('/coverPhoto/:userId', authGuard, upload.array('image', 1), uploadCoverPhoto);
router.delete('/coverPhoto/:userId', authGuard, deleteCoverPhoto);

router.post('/follow', authGuard, followOrUnfollow);

router.get('/user/:userId/followers', authGuard, getFollowers);
router.get('/user/:userId/following', authGuard, getFollowing);

export default router;
