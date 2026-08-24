import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import { UserRoutes } from './modules/User/user.route';
const app: Application = express();


app.use(express.json());
app.use(cors());


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the RentNest API!');
});


app.use('/api', UserRoutes);


app.use(notFound);
app.use(globalErrorHandler);
export default app;
