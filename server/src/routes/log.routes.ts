import { Router } from 'express';
import log from '../controllers/log.controller';
import { authenticate } from '../controllers/auth.controller';

const router = Router();
export default router;

router.get('/logs', authenticate, ...log.getLogs.validations, log.getLogs.handler);
