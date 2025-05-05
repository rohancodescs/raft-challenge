# Guestbook – Raft Associate Full‑Stack Challenge

A full‑stack demo app where visitors sign a **guest book** 📝, leave a short note, and instantly see it appear in a public list.

DEMO (running locally) : https://www.youtube.com/watch?v=7XwO7IOkh54&ab_channel=ItsJugu
---

## ✨ Features

| Layer        | Highlights                                                                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | Next 15 (app router) · Tailwind 4 + Shadcn/UI · Hero **image carousel** · Glass‑blur check‑in card · Responsive table · Phone validation client‑side |
| **Backend**  | Node 23 · Express 5 · Zod validation · Libphonenumber validation · CRUD routes                                                                       |
| **Database** | PostgreSQL 16 · Init script creates `guests` table                                                                                                   |
| **Tests**    | Jest + Supertest integration suite · Playwright E2E (form → table)                                                                                   |
| **CI**       | GitHub Actions – build containers, boot Postgres service, run all tests                                                                              |
| **Dev DX**   | `tsx watch` hot‑reload backend · Next dev for frontend                                                                                               |
|              |                                                                                                                                                      |

---

## 🖼️ UI Preview:

---

## 🔧 Stack

* **Next.js 15** (React 18, TypeScript)
* **Express 5** API (TypeScript)
* **PostgreSQL 16**
* **Tailwind CSS 4** + **Shadcn/UI** components + **Keen‑slider**
* **Docker Compose** – single command dev environment

---

## 🚀 Quick start (local)

```bash
# clone & cd
 git clone https://github.com/<your-user>/raft-challenge.git
 cd raft-challenge

# one‑liner spin‑up
 docker compose up --build
# view postgres entries after adding to guestbook
docker exec -it raft-challenge-db-1 psql -U guestbook -d guestbook -c "SELECT * FROM guests ORDER BY id;"
# ▶  http://localhost:3000  (frontend)
```

> **Tip:** `docker compose down -v` drops volumes if you want a fresh Postgres.

### Environment variables

| Service      | Variable               | Default                                           |
| ------------ | ---------------------- | ------------------------------------------------- |
| **backend**  | `DATABASE_URL`         | `postgres://guestbook:password@db:5432/guestbook` |
| **frontend** | `NEXT_PUBLIC_API_BASE` | `http://backend:4000`                             |

(Local dev outside Docker: create `frontend/.env.local` with `NEXT_PUBLIC_API_BASE=http://localhost:4000`.)

---

## 🧪 Testing

```bash
# API integration tests
cd backend && npm test
```

---

## ⚙️ Project Structure

```
backend/            # Express API + tests
frontend/           # Next app (app router)
db/init.sql         # creates guests table
Dockerfile*         # multi‑stage images for each service
docker-compose.yml  # all containers + volumes
```

---

## 🌐 Live demo

* **Frontend:** [https://raft-challenge-xi.vercel.app](https://raft-challenge-xi.vercel.app)

---

## Experience / Struggles + AI Experience

Given most of my intern-engineering experience is at bigger companies primarily within data science, my biggest struggle was the DevOps component of this which GPT-O3 helped me a lot with. It helped me quickly get my file structures setup, I did run into issues with Shadcn and Tailwind 3 / 4 version mismatches with the globals file which I resolved. 

All code reviewed and committed manually.
