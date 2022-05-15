import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import AppError from '../errors/AppError';
import cors from 'cors';
import { routes } from './routes';
import { errors } from 'celebrate';

const port = process.env.PORT || 3333;

const app = express();

app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(routes);
app.use(errors());

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(port, () => console.log(`Server started on port ${port}  🚀`));
