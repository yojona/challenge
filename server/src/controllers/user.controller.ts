import UserModel from '../entities/user.model';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { check } from 'express-validator';
import { pass, validate } from './validator.controller';
import { ChannelType, MessageCategory } from '../types';

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
        const user = await userRepository.findOne({ id: userId });

        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        const subscriptions = user.subscribed?.split(',') || [];
        user.subscribed = [...subscriptions, category].join(',');

        await userRepository.save(user);
        return res.status(200).json({ message: `subscribed to ${category}` });
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
        const user = await userRepository.findOne({ id: userId });

        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        const subscriptions = user.subscribed?.split(',') || [];

        const filtered = subscriptions.filter((c) => c !== category);
        user.subscribed = [...filtered].join(',');

        await userRepository.save(user);
        return res.status(200).json({ message: `unsubscribed from ${category}` });
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
      check('channel').isIn(Object.values(ChannelType)),
      validate,
    ],
    handler: async (req: Request, res: Response): Promise<Response> => {
      try {
        const userId = Number(req.params.id);
        const channel = req.body.channel;

        const userRepository = getRepository(UserModel);
        const user = await userRepository.findOne({ id: userId });

        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        const channels = user.channels?.split(',') || [];
        user.channels = [...channels, channel].join(',');

        await userRepository.save(user);
        return res.status(200).json({ message: `joined to ${channel}` });
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
      check('channel').isIn(Object.values(ChannelType)),
      validate,
    ],
    handler: async (req: Request, res: Response): Promise<Response> => {
      try {
        const userId = Number(req.params.id);
        const channel = req.body.channel;

        const userRepository = getRepository(UserModel);
        const user = await userRepository.findOne({ id: userId });

        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        const channels = user.channels?.split(',') || [];

        const filtered = channels.filter((c) => c !== channel);
        user.channels = [...filtered].join(',');

        await userRepository.save(user);
        return res.status(200).json({ message: `left ${channel}` });
      } catch (e) {
        console.log(e);
        return res.json({ msg: 'Error unsubscribing user.' });
      }
    }
  }
}
