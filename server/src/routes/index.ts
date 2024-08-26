import { Router } from 'express';
import users from './user.routes';
import logs from './log.routes';

const router = Router();
export default router;

router.use(users);
router.use(logs);
