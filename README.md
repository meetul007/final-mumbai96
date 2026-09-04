# Mumbai 96

Mumbai 96 is a listing portal with a Next.js frontend and a Flask backend.

## Repo layout

- `frontend/` — Next.js app (port 4000)
- `backend/` — Flask API (port 5002)
- `dashboard/` — additional UI assets (if used)

## Prerequisites

- Node.js 18+ (for Next.js)
- Python 3.10+ (for Flask)
- PostgreSQL 13+

## Backend setup (Flask)

From the repo root:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Configure environment

The backend loads environment values from `backend/env.yml` and also supports
standard environment variables defined in `backend/app/config.py`.

Update `backend/env.yml` with your own secrets and local settings before running.

### Database

Create the database and user (optional helper script):

```bash
psql -f create_db.sql
```

If you use a different database/user, update `backend/env.yml` or set
`DATABASE_URL` accordingly.

### Run the backend

```bash
python app/run.py
```

The API starts on `http://localhost:5002`.

## Frontend setup (Next.js)

```bash
cd frontend
npm install
```

### Run the frontend

```bash
npm run dev
```

The app starts on `http://localhost:4000`.

## Notes

- The backend expects the frontend at `http://localhost:4000` for CORS.
- Replace all example secrets in `backend/env.yml` before deploying.
