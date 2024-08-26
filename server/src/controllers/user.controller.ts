import UserModel, { MessageCategory } from '../entities/user.model';
import LogModel, { LogType } from '../entities/log.model';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { check } from 'express-validator';
import { buildMessage, MessageTemplates } from '../util/logs';
import { pass, validate } from './validator.controller';

export default {
  getUsers: {
    validations: [pass],
    handler: async (req: Request, res: Response): Promise<Response> => {
      const model = getRepository(UserModel);
      const users = await model.find();

      return res.json(users.map((user) => user.toAPI()));
    }
  },

  getUserById: {
    validations: [
      check('id').isInt({ min: 0 }).withMessage('Expected positive integer value'),
      validate
    ],
    handler: async (req: Request, res: Response): Promise<Response> => {
      const id = Number(req.params.id);
      const model = getRepository(UserModel);

      const user = await model.findOne({ id });
      const notFound = 'user not found';

      return res.json(user?.toAPI() || { msg: notFound });
    }
  },
  subscribe: {
    validations: [
      check('id').isInt({ min: 0 }).withMessage('Expected positive integer value'),
      check('category').notEmpty().withMessage('category cannot be empty.'),
      check('category').isIn(Object.values(MessageCategory)),
      validate,
    ],
    handler: async (req: Request, res: Response): Promise<Response> => {
      try {
        const userId = req.body.id;

        const category = req.body.category;

        const userRepository = getRepository(UserModel);
        const logRespository = getRepository(UserModel);
        const user = await userRepository.findOne({ id: userId });

        const log = new LogModel();
        log.user = userId,
        log.type = LogType.CATEGORY_LOG

        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }
        if (user.subscribed.includes(category)) {
          const message = buildMessage(
            MessageTemplates.categories.USER_ALREADY_SUBSCRIBED,
            user.id,
            category,
          );

          log.message = message;
          await logRespository.save(log);
          return res.status(400).json({ message });
        }
        
        user.subscribed = [...user.subscribed, category];
        const message = buildMessage(
          MessageTemplates.categories.USER_SUBSCRIBED,
          user.id,
          category,
        );

        await logRespository.save(log);
        await userRepository.save(user);
        return res.status(200).json({ message });
      } catch (e) {
        console.log(e);
        return res.json({ msg: 'Error subscribing user.' });
      }
    }
  },
  unsubscribe: {
    validations: [
      check('userId').isInt({ min: 0 }).withMessage('Expected positive integer value'),
      check('category').notEmpty().withMessage('category cannot be empty.'),
      check('category').isIn(Object.values(MessageCategory)),
      validate,
    ],
    handler: async (req: Request, res: Response): Promise<Response> => {
      try {
        const userId = req.body.id;

        const category = req.body.category;
        const model = getRepository(UserModel);

        const userRepository = getRepository(UserModel);
        const logRespository = getRepository(UserModel);
        const user = await userRepository.findOne({ id: userId });

        const log = new LogModel();
        log.user = userId,
        log.type = LogType.CATEGORY_LOG

        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.subscribed.includes(category)) {
          const message = buildMessage(
            MessageTemplates.categories.USER_NOT_SUSCRIBED,
            user.id,
            category,
          )


          log.message = message;
          await logRespository.save(log);
          return res.status(400).json({ message });
        }
        
        const filtered = user.subscribed.filter((c) => c !== category);
        user.subscribed = [...filtered];

        const message = buildMessage(
          MessageTemplates.categories.USER_UNSUSCRIBED,
          user.id,
          category,
        )

        log.message = message;
        await logRespository.save(log);
        await model.save(user);
        return res.status(200).json({ message });
      } catch (e) {
        console.log(e);
        return res.json({ msg: 'Error unsubscribing user.' });
      }
    }
  }
}
