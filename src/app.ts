import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Basic test route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the RentNest API!');
});

// We will add global error handlers and actual routes here later!
app.use(notFound);
app.use(globalErrorHandler);
export default app;
