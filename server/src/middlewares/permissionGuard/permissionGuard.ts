import { NextFunction, Response } from 'express';
import { GetAuthorIdFn, PermissonGuardRequest } from './permissionGuard.types.js';

export function permissionGuard(getResourceAuthorId: GetAuthorIdFn) {
	return async (req: PermissonGuardRequest, res: Response, next: NextFunction) => {
		try {
			if (!req.userId) {
				// Safety check, should not happen but let it be anyways
				return res.status(401).json({ message: 'Unauthorized' });
			}

			const resourceAuthorId = await getResourceAuthorId(req);

			if (resourceAuthorId !== req.userId) {
				return res.status(403).json({ message: 'Forbidden: You do not own this resource' });
			}

			next();
		} catch (error: any) {
			if (error.message === 'Resource not found') {
				return res.status(404).json({ message: 'Resource not found!' });
			}
			next(error);
		}
	};
}
