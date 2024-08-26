import { Router } from 'express';
import user from '../controllers/user.controller';
import { authenticate } from '../controllers/auth.controller';

const router = Router();
export default router;

router.get('/users', authenticate, ...user.getUsers.validations, user.getUsers.handler);
router.get('/users/:id', authenticate, ...user.getUserById.validations, user.getUserById.handler);
router.patch('/users/:id/subscribe', authenticate, ...user.subscribe.validations, user.subscribe.handler);
router.patch('/users/:id/unsubscribe', authenticate, ...user.unsubscribe.validations, user.unsubscribe.handler);
router.patch('/users/:id/join', authenticate, ...user.join.validations, user.join.handler);
router.patch('/users/:id/leave', authenticate, ...user.leave.validations, user.leave.handler);
