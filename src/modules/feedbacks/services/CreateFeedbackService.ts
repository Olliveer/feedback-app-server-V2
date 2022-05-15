import { MailAdapter } from '../../../adapters/mailAdapter';
import AppError from '../../../shared/errors/AppError';
import { FeedbackRepository } from '../repository';

type FeedbackCreateDataRequest = {
  type: string;
  comment: string;
  screenshot?: string;
};

class CreateFeedbackService {
  constructor(
    private feedbackRepository: FeedbackRepository,
    private mailAdapter: MailAdapter,
  ) {}
  async handle({ type, comment, screenshot }: FeedbackCreateDataRequest) {
    if (!type) {
      throw new AppError('Type is required');
    }

    if (!comment) {
      throw new AppError('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new AppError('Invalid screenshot');
    }

    const feedback = await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Feedback',
      body: [
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot
          ? `<img src=${screenshot} width="200" height="200" />`
          : null,
      ].join(''),
    });

    return feedback;
  }
}

export { CreateFeedbackService };
