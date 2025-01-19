/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from 'express';
import cors from 'cors';
<<<<<<< HEAD
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { logger } from './middlewares/logger';
import { notFound } from './middlewares/notFound';
import router from './routes';
import cookieParser from 'cookie-parser';
=======
// import { globalErrorHandler } from './middlewares/globalErrorHandler';
// import { logger } from './middlewares/logger';
// import { notFound } from './middlewares/notFound';
// import router from './routes';
>>>>>>> 2e5d2b06e69d012a04b7fc55ea3a607012bd2581

const app = express();

//parser
app.use(express.json());
<<<<<<< HEAD
app.use(
  cors({
    origin: ['http://localhost:5173/'],
    credentials : true
  }),
);
app.use(cookieParser());

/*---------------- MIDDLEWARES -----------------------*/

app.use(logger)
=======
app.use(cors());

/*---------------- MIDDLEWARES -----------------------*/

// app.use(logger)
>>>>>>> 2e5d2b06e69d012a04b7fc55ea3a607012bd2581

/*------------ APPLICATION ROUTES -------------------*/
// app.use('/api/v1', router);

/*------------ Test route -------------------*/
const test = (req: Request, res: Response) => {
  res.send('PH Unviersity server is RUNNIG !!! 😎😎😎');
};
app.get('/', test);

/**------------ GLOBAL ERROR HANDLER -------------------*/
<<<<<<< HEAD
app.use(globalErrorHandler);

/** ------------ NOT FOUND URL ------------------- */
app.use(notFound as never);
=======
// app.use(globalErrorHandler);

/** ------------ NOT FOUND URL ------------------- */
// app.use(notFound);
>>>>>>> 2e5d2b06e69d012a04b7fc55ea3a607012bd2581
export default app;
