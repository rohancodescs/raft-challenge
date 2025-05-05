// import request from 'supertest';
// import { app } from '../index';
// import { pool } from '../db';
// console.log('PGHOST=%s PGUSER=%s  PGDATABASE=%s  DATABASE_URL=%s',
//   process.env.PGHOST, process.env.PGUSER, process.env.PGDATABASE, process.env.DATABASE_URL);


// console.log("SELECT GETDATE()")


// beforeAll(async () => {
//   await pool.query('TRUNCATE TABLE guests RESTART IDENTITY'); 
// });

// afterAll(() => pool.end());

// describe('Guest endpoints', () => {
//   it('rejects an invalid phone number', async () => {
//     const res = await request(app).post('/guests').send({
//       first_name:'John', last_name:'Doe', phone_number:'4438670047', message:'Hi'
//     });
//     expect(res.status).toBe(400);
//   });

//   it('creates then lists a guest', async () => {
//     await request(app).post('/guests').send({
//       first_name:'Ada', last_name:'Lovelace', message:'Hello'
//     }).expect(200);

//     const list = await request(app).get('/guests').expect(200);
//     expect(list.body.length).toBe(1);
//     expect(list.body[0].first_name).toBe('Ada');
//   });
// });
// src/tests/guests.spec.ts

import request from 'supertest';
import { app } from '../index';
import { pool } from '../db';

beforeAll(async () => {
  // ensure the correct database is being used
  console.log(
    'Test DB → PGUSER=%s PGDATABASE=%s DATABASE_URL=%s',
    process.env.PGUSER,
    process.env.PGDATABASE,
    process.env.DATABASE_URL
  );

  // create the table if it doesn't exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS guests (
      id           SERIAL PRIMARY KEY,
      first_name   VARCHAR(50) NOT NULL,
      last_name    VARCHAR(50) NOT NULL,
      phone_number VARCHAR(25),
      message      TEXT,
      created_at   TIMESTAMP DEFAULT NOW()
    );
  `);

  // empty it out for a clean slate
  await pool.query('TRUNCATE TABLE guests RESTART IDENTITY;');
});

afterAll(async () => {
  await pool.end();
});

describe('Guest endpoints', () => {
  it('rejects an invalid phone number', async () => {
    const res = await request(app).post('/guests').send({
      first_name: 'John',
      last_name:  'Doe',
      phone_number: 'abc',
      message: 'Hi',
    });
    expect(res.status).toBe(400);
  });

  it('creates then lists a guest', async () => {
    await request(app)
      .post('/guests')
      .send({ first_name: 'Ada', last_name: 'Lovelace', message: 'Hello' })
      .expect(200);

    const list = await request(app).get('/guests').expect(200);
    expect(list.body.length).toBe(1);
    expect(list.body[0].first_name).toBe('Ada');
  });
});
