import { MessageCategory } from '../entities/user.model';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { check } from 'express-validator';
import { validate } from './validator.controller';
import Message from '../entities/message.model';

export default {
  createMessage: {
    validations: [
      check('content').notEmpty().withMessage('Message content cannot be empty'),
      check('category').notEmpty().withMessage('category cannot be empty.'),
      check('category').isIn(Object.values(MessageCategory)),
      validate,
    ],
    handler: async (req: Request, res: Response): Promise<Response> => {
      try {
        const model = getRepository(Message);
        const category = req.body.category;
        const content = req.body.content;
        const newMessage = new Message();

        newMessage.category = category;
        newMessage.message = content;

        await model.save(newMessage);
        return res.status(200).json({ message: 'Message sent.' });
      } catch (e) {
        console.log(e);
        return res.json({ msg: 'Error sending message.' });
      }
    }
  },
}
