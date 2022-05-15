import { Request, Response } from 'express';
import { NodemailerMailAdapter } from '../../../adapters/nodemailer/nodemailerMailAdapter';
import { PrismaFeedbackRepository } from '../repository/prisma/PrismaFeedbackRepository';
import { CreateFeedbackService } from '../services/CreateFeedbackService';

class FeedbacksController {
  async create(request: Request, response: Response) {
    const { type, comment, screenshot } = request.body;
    const prismaFeedbackRepository = new PrismaFeedbackRepository();
    const nodemailerMailAdatper = new NodemailerMailAdapter();
    const createFeedbackService = new CreateFeedbackService(
      prismaFeedbackRepository,
      nodemailerMailAdatper,
    );

    await createFeedbackService.handle({
      type,
      comment,
      screenshot,
    });

    response.status(201).json({ message: 'Feedback created' });
  }
}

export { FeedbacksController };
