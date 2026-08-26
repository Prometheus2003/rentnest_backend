import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import { UserRoutes } from './modules/User/user.route';
import { PropertyRoutes } from './modules/Property/property.route';
import { CategoryRoutes } from './modules/Category/category.route';
import { RentalRequestRoutes } from './modules/RentalRequest/rentalRequest.route';

const app: Application = express();


app.use(express.json());
app.use(cors());


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the RentNest API!');
});


app.use('/api', UserRoutes);
app.use('/api/properties', PropertyRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/rental-requests', RentalRequestRoutes);
app.use(notFound);
app.use(globalErrorHandler);
export default app;
