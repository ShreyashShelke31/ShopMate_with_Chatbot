# Ecommerce Chatbot Demo (React + FastAPI)

This archive contains:
- `backend/` - FastAPI backend (local JSON files storage + optional Gemini integration)
- `frontend/` - React (Create React App style) frontend that calls the backend

## Quick start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # macOS / Linux
venv\Scripts\activate    # Windows (PowerShell)
pip install -r requirements.txt
# copy .env.example to .env and set GEMINI_API_KEY / GEMINI_URL if you want real chatbot replies
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Open http://localhost:3000 for the frontend (it calls http://127.0.0.1:8000 by default).

## Gemini / Chatbot
- This project does **not** include your Gemini API key. Place it in `backend/.env`.
- The `main.py` contains a simple flexible wrapper. You may need to adapt the request format in `main.py` to match the Gemini endpoint you have access to.

Enjoy! If you want, I can also:
- Add authentication
- Persist data to a real DB (SQLite/Postgres/Firestore)
- Improve UI (Material UI / Tailwind)
