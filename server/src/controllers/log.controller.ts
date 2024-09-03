import LogModel from '../entities/log.model';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { pass } from './validator.controller';

export default {
  getLogs: {
    validations: [pass],
    handler: async (req: Request, res: Response): Promise<Response> => {
      try {
        const model = getRepository(LogModel);
        const logs = await model.find();
  
        return res.status(200).json(logs.map((log) => log.toAPI()));
      } catch {
        return res.status(500).json({
          message: 'Something went wrong. Try again.'
        })
      }
    },
  },
}
