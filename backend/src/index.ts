import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import guestRoutes from './routes/guests';
import { ZodError } from 'zod';
import { ParseError } from 'libphonenumber-js';

export const app = express();
// app.use(cors());
app.use(
  cors({
    origin: 'https://raft-challenge-xi.vercel.app',
  })
);
app.use(express.json());
app.use("/guests", guestRoutes);
// app.use('/api/guests', guestRoutes);

/* ---------- error handler ---------- */
const apiErrorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError || err instanceof ParseError) {
    res.status(400).json({ message: err.message });
    return ;
  }
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
};

app.use(apiErrorHandler);

/* ---------- listener (skip in tests) ---------- */
if (require.main === module) {
  app.listen(process.env.PORT || 4000, () =>
    console.log(`API ready at http://localhost:${process.env.PORT || 4000}`)
  );
}
