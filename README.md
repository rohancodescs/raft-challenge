# Guestbook – Raft Associate Full‑Stack Challenge

![CI](https://github.com/<your‑user>/raft-challenge/actions/workflows/ci.yml/badge.svg)

A full‑stack demo app where visitors sign a **guest book** 📝, leave a short note, and instantly see it appear in a public list. 100 % Docker‑ized; one‑liner spin‑up.

---

## ✨ Features

| Layer          | Highlights                                                                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**   | Next 15 (app router) · Tailwind 4 + Shadcn/UI · Hero **image carousel** · Glass‑blur check‑in card · Responsive table · Phone validation client‑side |
| **Backend**    | Node 23 · Express 5 · Zod validation · Libphonenumber validation · CRUD routes                                                                       |
| **Database**   | PostgreSQL 16 · Init script creates `guests` table                                                                                                   |
| **Tests**      | Jest + Supertest integration suite · Playwright E2E (form → table)                                                                                   |
| **CI**         | GitHub Actions – build containers, boot Postgres service, run all tests                                                                              |
| **Dev DX**     | `tsx watch` hot‑reload backend · Next dev for frontend                                                                                               |
| **Deployment** | Supabase Postgres · Render backend · Vercel frontend                                                                                                 |

---

## 🖼️ UI Preview

<img src="docs/ui.gif" width="700" alt="carousel, form, and guest list" />

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

# ▶  http://localhost:3000  (frontend)
# ▶  http://localhost:4000/guests  (API)
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

# End‑to‑end UI flow
npx playwright test          # requires Playwright browsers (first run)
```

GitHub Actions runs both suites on every push.

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

* **Frontend:** [https://guestbook.vercel.app](https://guestbook.vercel.app)
* **Backend API:** [https://guestbook-api.onrender.com/guests](https://guestbook-api.onrender.com/guests)
* **Database:** Supabase free tier (ephemeral demo data)

---

## 🤖 AI Assistance

ChatGPT‑4o was used for:

* generating initial project scaffolding commands (Next, Tailwind, Dockerfiles)
* drafting TypeScript Zod schemas
* iterative debugging & test writing (prompts saved in `docs/prompts.md`)

All code reviewed and committed manually.

---

## 👥 Acknowledgements

* Prompt & spec © Raft.
* Keen‑slider, Shadcn/UI, libphonenumber‑js.

---

> Made with ❤️ for the Raft Associate Full‑Stack interview.
