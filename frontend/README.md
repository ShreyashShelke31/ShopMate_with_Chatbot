# Frontend (React) for Ecommerce + Chatbot Demo

## Setup

1. From the `frontend` folder:
   ```bash
   npm install
   npm start
   ```

2. The React app expects the backend at `http://127.0.0.1:8000`.
   Make sure the backend FastAPI server is running (`uvicorn main:app --reload --port 8000`).

Features:
- Fetch products from backend
- Add product
- Add to cart / view cart
- Simple chatbot UI which posts to `/chat` on backend and shows history
