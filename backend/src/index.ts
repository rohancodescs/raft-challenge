// import express, { NextFunction, Request, Response } from "express";
// import cors from "cors";
// import guestRoutes from "./routes/guests";
// import { ZodError } from 'zod';
// import { ParseError } from 'libphonenumber-js';
// export const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/guests", guestRoutes);

// // app.listen(process.env.PORT || 4000, () =>
// //   console.log(`API ready at http://localhost:${process.env.PORT || 4000}`)
// // );err: any, _req: Request, res: Response, _next: NextFunction

// if (require.main === module) {          // only run when not in tests
//   app.listen(process.env.PORT || 4000, () =>
//     console.log(`API ready at http://localhost:${process.env.PORT || 4000}`));
// }
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import guestRoutes from './routes/guests';
import { ZodError } from 'zod';
import { ParseError } from 'libphonenumber-js';

export const app = express();
app.use(cors());
app.use(express.json());
app.use('/guests', guestRoutes);

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
