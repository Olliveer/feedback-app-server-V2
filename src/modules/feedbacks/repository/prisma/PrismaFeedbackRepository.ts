import { FeedbackCreateData, FeedbackRepository } from '..';
import { prisma } from '../../../../utils/prisma';

class PrismaFeedbackRepository implements FeedbackRepository {
  async create({ comment, type, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}

export { PrismaFeedbackRepository };
