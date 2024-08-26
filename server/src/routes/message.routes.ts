import { Router } from 'express';
import message from '../controllers/message.controller';
import { authenticate } from '../controllers/auth.controller';

const router = Router();
export default router;

router.post('/messages/compose', authenticate, ...message.createMessage.validations, message.createMessage.handler);
