"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const db_1 = require("../db");
beforeAll(async () => {
    await db_1.pool.query('TRUNCATE TABLE guests RESTART IDENTITY');
});
afterAll(() => db_1.pool.end());
describe('Guest endpoints', () => {
    it('rejects an invalid phone number', async () => {
        const res = await (0, supertest_1.default)(index_1.app).post('/guests').send({
            first_name: 'John', last_name: 'Doe', phone_number: 'abc', message: 'Hi'
        });
        expect(res.status).toBe(400);
    });
    it('creates then lists a guest', async () => {
        await (0, supertest_1.default)(index_1.app).post('/guests').send({
            first_name: 'Ada', last_name: 'Lovelace', message: 'Hello'
        }).expect(200);
        const list = await (0, supertest_1.default)(index_1.app).get('/guests').expect(200);
        expect(list.body.length).toBe(1);
        expect(list.body[0].first_name).toBe('Ada');
    });
});
