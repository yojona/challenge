import UserModel, { MessageCategory, NotificationChannel } from '../entities/user.model';
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
        const userId = Number(req.params.id);
        const category = req.body.category;

        const userRepository = getRepository(UserModel);
        const logRespository = getRepository(LogModel);
        const user = await userRepository.findOne({ id: userId });

        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        const log = new LogModel();
        log.user = user;
        log.type = LogType.CATEGORY_LOG;

        const subscriptions = user.subscribed?.split(',') || [];

        if (subscriptions.includes(category)) {
          const message = buildMessage(
            MessageTemplates.categories.USER_ALREADY_SUBSCRIBED,
            user.id,
            category,
          );

          log.message = message;
          await logRespository.save(log);
          return res.status(400).json({ message });
        }

        user.subscribed = [...subscriptions, category].join(',');
        const message = buildMessage(
          MessageTemplates.categories.USER_SUBSCRIBED,
          user.id,
          category,
        );

        log.message = message;
        await userRepository.save(user);
        await logRespository.save(log);
        return res.status(200).json({ message });
      } catch (e) {
        console.log(e);
        return res.json({ msg: 'Error subscribing user.' });
      }
    }
  },
  unsubscribe: {
    validations: [
      check('id').isInt({ min: 0 }).withMessage('Expected positive integer value'),
      check('category').notEmpty().withMessage('category cannot be empty.'),
      check('category').isIn(Object.values(MessageCategory)),
      validate,
    ],
    handler: async (req: Request, res: Response): Promise<Response> => {
      try {
        const userId = Number(req.params.id);
        const category = req.body.category;

        const userRepository = getRepository(UserModel);
        const logRespository = getRepository(LogModel);
        const user = await userRepository.findOne({ id: userId });

        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        const log = new LogModel();
        log.user = user;
        log.type = LogType.CATEGORY_LOG;

        const subscriptions = user.subscribed?.split(',') || [];

        if (!subscriptions.includes(category)) {
          const message = buildMessage(
            MessageTemplates.categories.USER_NOT_SUBSCRIBED,
            user.id,
            category,
          )

          log.message = message;
          await logRespository.save(log);
          return res.status(400).json({ message });
        }

        const filtered = subscriptions.filter((c) => c !== category);
        user.subscribed = [...filtered].join(',');

        const message = buildMessage(
          MessageTemplates.categories.USER_UNSUBSCRIBED,
          user.id,
          category,
        )

        log.message = message;
        await userRepository.save(user);
        await logRespository.save(log);
        return res.status(200).json({ message });
      } catch (e) {
        console.log(e);
        return res.json({ msg: 'Error unsubscribing user.' });
      }
    }
  },
  join: {
    validations: [
      check('id').isInt({ min: 0 }).withMessage('Expected positive integer value'),
      check('channel').notEmpty().withMessage('channel cannot be empty.'),
      check('channel').isIn(Object.values(NotificationChannel)),
      validate,
    ],
    handler: async (req: Request, res: Response): Promise<Response> => {
      try {
        const userId = Number(req.params.id);
        const channel = req.body.channel;

        const userRepository = getRepository(UserModel);
        const logRespository = getRepository(LogModel);
        const user = await userRepository.findOne({ id: userId });

        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        const log = new LogModel();
        log.user = user;
        log.type = LogType.CATEGORY_LOG;

        const channels = user.channels?.split(',') || [];

        if (channels.includes(channel)) {
          const message = buildMessage(
            MessageTemplates.channels.USER_ALREADY_JOINED,
            user.id,
            channel,
          );

          log.message = message;
          await logRespository.save(log);
          return res.status(400).json({ message });
        }

        user.channels = [...channels, channel].join(',');
        const message = buildMessage(
          MessageTemplates.channels.USER_JOINED,
          user.id,
          channel,
        );

        log.message = message;
        await userRepository.save(user);
        await logRespository.save(log);
        return res.status(200).json({ message });
      } catch (e) {
        console.log(e);
        return res.json({ msg: 'Error joining to channel.' });
      }
    }
  },
  leave: {
    validations: [
      check('id').isInt({ min: 0 }).withMessage('Expected positive integer value'),
      check('channel').notEmpty().withMessage('channel cannot be empty.'),
      check('channel').isIn(Object.values(NotificationChannel)),
      validate,
    ],
    handler: async (req: Request, res: Response): Promise<Response> => {
      try {
        const userId = Number(req.params.id);
        const channel = req.body.channel;

        const userRepository = getRepository(UserModel);
        const logRespository = getRepository(LogModel);
        const user = await userRepository.findOne({ id: userId });

        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        const log = new LogModel();
        log.user = user;
        log.type = LogType.CATEGORY_LOG;

        const channels = user.channels?.split(',') || [];

        if (!channels.includes(channel)) {
          const message = buildMessage(
            MessageTemplates.channels.USER_NOT_JOINED,
            user.id,
            channel,
          )

          log.message = message;
          await logRespository.save(log);
          return res.status(400).json({ message });
        }

        const filtered = channels.filter((c) => c !== channel);
        user.channels = [...filtered].join(',');

        const message = buildMessage(
          MessageTemplates.categories.USER_UNSUBSCRIBED,
          user.id,
          channel,
        )

        log.message = message;
        await userRepository.save(user);
        await logRespository.save(log);
        return res.status(200).json({ message });
      } catch (e) {
        console.log(e);
        return res.json({ msg: 'Error unsubscribing user.' });
      }
    }
  }
}
