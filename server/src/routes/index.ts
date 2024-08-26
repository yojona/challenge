import { Router } from 'express';
import users from './user.routes';

const router = Router();
export default router;

router.use(users);
