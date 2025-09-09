# Backend (FastAPI) for Ecommerce + Chatbot Demo

## Setup

1. Create and activate a Python virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate   # macOS / Linux
   venv\Scripts\activate    # Windows
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create `.env` in this folder (copy from `.env.example`) and set:
   - `GEMINI_API_KEY` — your Gemini / Google API key.
   - `GEMINI_URL` (optional) — a custom endpoint if you have one.

4. Run the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

The API endpoints:
- `GET /products` — list products
- `POST /products` — add product (json: { "name": "...", "price": 123.45 })
- `POST /cart/{product_id}` — add product to cart
- `GET /cart` — view cart
- `DELETE /cart` — clear cart
- `POST /chat` — chat with bot (json: { "message": "hi", "session": "default" })
- `GET /chat/history` — get chat history (optional query param `?session=default`)

Notes:
- This backend stores data in local JSON files (products.json, cart.json, chat_history.json) for simplicity.
- The Gemini integration is optional. If you don't set GEMINI_API_KEY / GEMINI_URL you'll receive a demo reply.
