import { AuthGuardRequest } from '../authGuard/authGuard.types.js';

export type PermissonGuardRequest = AuthGuardRequest;

export type GetAuthorIdFn = (req: PermissonGuardRequest) => Promise<string>;
