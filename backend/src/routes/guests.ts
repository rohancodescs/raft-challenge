import { Router } from "express";
import { pool } from "../db";
import { parsePhoneNumberWithError, ParseError } from 'libphonenumber-js';
import { z, ZodError } from "zod";

const router = Router();
const Guest = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: 
    z.string().optional().transform(val => val?.trim() || undefined).refine(
      val => !val || parsePhoneNumberWithError(val, "US").isValid(),{message: "Invalid phone number"}).transform(val => val ? parsePhoneNumberWithError(val, "US")!.format("E.164") : undefined),
  message: z.string().optional()
});

/* POST /guests  */
router.post("/", async (req, res, next) => {
  try {
    const data = Guest.parse(req.body);
    const { rows } = await pool.query(
      `INSERT INTO guests (first_name,last_name,phone_number,message)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [data.first_name, data.last_name, data.phone_number, data.message]
    );
    res.json(rows[0]);
  } catch (err) { next(err); }
});

/* GET /guests  */
router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM guests ORDER BY id DESC");
    res.json(rows);
  } catch (err) { next(err); }
});

/* GET /guests/:id */
router.get("/:id", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM guests WHERE id=$1", [req.params.id]);
    res.json(rows[0] ?? null);
  } catch (err) { next(err); }
});

/* DELETE /guests/:id */
router.delete("/:id", async (req, res, next) => {
  try {
    const { rows } = await pool.query("DELETE FROM guests WHERE id=$1 RETURNING *", [req.params.id]);
    res.json(rows[0] ?? null);
  } catch (err) { next(err); }
});

export default router;
