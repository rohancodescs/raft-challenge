import express from "express";
import cors from "cors";
import guestRoutes from "./routes/guests";

export const app = express();
app.use(cors());
app.use(express.json());
app.use("/guests", guestRoutes);

// app.listen(process.env.PORT || 4000, () =>
//   console.log(`API ready at http://localhost:${process.env.PORT || 4000}`)
// );
if (require.main === module) {          // only run when not in tests
  app.listen(process.env.PORT || 4000, () =>
    console.log(`API ready at http://localhost:${process.env.PORT || 4000}`));
}