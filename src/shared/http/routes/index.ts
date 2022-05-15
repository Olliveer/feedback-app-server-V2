import { Router } from 'express';
import { feedbackRouter } from '../../../modules/feedbacks/routes/feedbacks.routes';

const routes = Router();

routes.use('/feedbacks', feedbackRouter);

export { routes };
