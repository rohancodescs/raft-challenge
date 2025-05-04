"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const libphonenumber_js_1 = require("libphonenumber-js");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const Guest = zod_1.z.object({
    first_name: zod_1.z.string().min(1),
    last_name: zod_1.z.string().min(1),
    phone_number: zod_1.z.string().optional().transform(val => val?.trim() || undefined).refine(val => !val || (0, libphonenumber_js_1.parsePhoneNumberWithError)(val, "US").isValid(), { message: "Invalid phone number" }),
    message: zod_1.z.string().optional()
});
/* POST /guests  */
router.post("/", async (req, res, next) => {
    try {
        const data = Guest.parse(req.body);
        const { rows } = await db_1.pool.query(`INSERT INTO guests (first_name,last_name,phone_number,message)
       VALUES ($1,$2,$3,$4) RETURNING *`, [data.first_name, data.last_name, data.phone_number, data.message]);
        res.json(rows[0]);
    }
    catch (err) {
        next(err);
    }
});
/* GET /guests  */
router.get("/", async (_req, res, next) => {
    try {
        const { rows } = await db_1.pool.query("SELECT * FROM guests ORDER BY id DESC");
        res.json(rows);
    }
    catch (err) {
        next(err);
    }
});
/* GET /guests/:id */
router.get("/:id", async (req, res, next) => {
    try {
        const { rows } = await db_1.pool.query("SELECT * FROM guests WHERE id=$1", [req.params.id]);
        res.json(rows[0] ?? null);
    }
    catch (err) {
        next(err);
    }
});
/* DELETE /guests/:id */
router.delete("/:id", async (req, res, next) => {
    try {
        const { rows } = await db_1.pool.query("DELETE FROM guests WHERE id=$1 RETURNING *", [req.params.id]);
        res.json(rows[0] ?? null);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
