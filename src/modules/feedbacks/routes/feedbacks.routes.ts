import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { FeedbacksController } from '../controllers/FeedbacksController';

const feedbacksController = new FeedbacksController();

const feedbackRouter = Router();

feedbackRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      type: Joi.string().required(),
      comment: Joi.string().required(),
      screenshot: Joi.string(),
    },
  }),
  feedbacksController.create,
);

export { feedbackRouter };
