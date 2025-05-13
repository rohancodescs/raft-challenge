import express from 'express';
import cors    from 'cors';
import guestRoutes from './routes/guests';
import { ZodError } from 'zod';
import { ParseError } from 'libphonenumber-js';
import { Request, Response } from 'express';
import { ErrorRequestHandler } from 'express-serve-static-core';
import { NextFunction } from 'express-serve-static-core';
export const app = express();

/* ---------- CORS ---------- */
const allowed = [
  'http://localhost:3000',
  /^https:\/\/raft-challenge.*\.vercel\.app$/
];
app.use(cors({ origin: allowed, credentials: true }));

/* ---------- misc ---------- */
app.use(express.json());

/* health-check for Render */
app.get('/', (_req: Request, res: Response) => {
  res.send('Guestbook API OK');
});

/* ---------- routes ---------- */
app.use('/api/guests', guestRoutes);

/* ---------- error handler ---------- */
const customErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => { // Note: _next is now implicitly NextFunction due to ErrorRequestHandler
  if (err instanceof ZodError || err instanceof ParseError) {
    res.status(400).json({message: err.message});
    return; // Explicitly return void to stop further execution and match the type.
  }
  console.error(err);
  res.status(500).json({message:'Internal Server Error'});
  // No explicit return needed here; the function will implicitly return undefined (void).
};

// Use the explicitly typed error handler
app.use(customErrorHandler);

/* ---------- listener ---------- */
if (require.main === module) {
  app.listen(process.env.PORT || 4000, () =>
    console.log(`API ready at http://localhost:${process.env.PORT || 4000}`)
  );
}

// import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
// import cors from 'cors';
// import guestRoutes from './routes/guests';
// import { ZodError } from 'zod';
// import { ParseError } from 'libphonenumber-js';

// export const app = express();
// // app.use(cors());
// const allowed = [
//   'http://localhost:3000',
//   /^https:\/\/raft-challenge.*\.vercel\.app$/   // production + preview URLs
// ];
// app.use(
//   cors({
//     origin: allowed,
//     credentials: true       
//   })
// );
// app.get('/', (_req: Request, res: Response) => {
//   res.send('Guestbook API OK');
// });
// app.use(express.json());
// app.use("/api/guests", guestRoutes);
// // app.use('/api/guests', guestRoutes);

// /* ---------- error handler ---------- */
// const apiErrorHandler: ErrorRequestHandler = (
//   err: unknown,
//   _req: Request,
//   res: Response,
//   _next: NextFunction
// ) => {
//   if (err instanceof ZodError || err instanceof ParseError) {
//     res.status(400).json({ message: err.message });
//     return ;
//   }
//   console.error(err);
//   res.status(500).json({ message: 'Internal Server Error' });
// };

// app.use(apiErrorHandler);

// /* ---------- listener (skip in tests) ---------- */
// if (require.main === module) {
//   app.listen(process.env.PORT || 4000, () =>
//     console.log(`API ready at http://localhost:${process.env.PORT || 4000}`)
//   );
// }
