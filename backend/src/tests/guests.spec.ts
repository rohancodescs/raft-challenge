import request from 'supertest';
import { app } from '../index';
import { pool } from '../db';

beforeAll(async () => {
  await pool.query('TRUNCATE TABLE guests RESTART IDENTITY');
});

afterAll(() => pool.end());

describe('Guest endpoints', () => {
  it('rejects an invalid phone number', async () => {
    const res = await request(app).post('/guests').send({
      first_name:'John', last_name:'Doe', phone_number:'abc', message:'Hi'
    });
    expect(res.status).toBe(400);
  });

  it('creates then lists a guest', async () => {
    await request(app).post('/guests').send({
      first_name:'Ada', last_name:'Lovelace', message:'Hello'
    }).expect(200);

    const list = await request(app).get('/guests').expect(200);
    expect(list.body.length).toBe(1);
    expect(list.body[0].first_name).toBe('Ada');
  });
});
