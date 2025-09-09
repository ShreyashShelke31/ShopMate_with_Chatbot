from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os, json, time
from dotenv import load_dotenv
import requests

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = os.getenv("GEMINI_URL")  # Optional: user can set a custom Gemini-compatible endpoint

BASE_DIR = os.path.dirname(__file__)
PRODUCTS_FILE = os.path.join(BASE_DIR, "products.json")
CART_FILE = os.path.join(BASE_DIR, "cart.json")
CHAT_FILE = os.path.join(BASE_DIR, "chat_history.json")

def load_json(path, default):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default

def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# initialize simple files if not present
if not os.path.exists(PRODUCTS_FILE):
    save_json(PRODUCTS_FILE, [
        {"id": 1, "name": "Laptop", "price": 55000},
        {"id": 2, "name": "Phone", "price": 30000}
    ])

if not os.path.exists(CART_FILE):
    save_json(CART_FILE, [])

if not os.path.exists(CHAT_FILE):
    save_json(CHAT_FILE, [])

app = FastAPI(title="Ecommerce + Chatbot (Demo) Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProductIn(BaseModel):
    name: str
    price: float

class Product(ProductIn):
    id: int

class ChatRequest(BaseModel):
    message: str
    session: Optional[str] = "default"

@app.get("/products", response_model=List[Product])
def get_products():
    return load_json(PRODUCTS_FILE, [])

@app.post("/products", response_model=Product)
def add_product(p: ProductIn):
    products = load_json(PRODUCTS_FILE, [])
    next_id = max([prod["id"] for prod in products], default=0) + 1
    new = {"id": next_id, "name": p.name, "price": p.price}
    products.append(new)
    save_json(PRODUCTS_FILE, products)
    return new

@app.post("/cart/{product_id}")
def add_to_cart(product_id: int):
    products = load_json(PRODUCTS_FILE, [])
    prod = next((x for x in products if x["id"] == product_id), None)
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    cart = load_json(CART_FILE, [])
    cart.append(prod)
    save_json(CART_FILE, cart)
    return {"message": "added", "cart": cart}

@app.get("/cart")
def view_cart():
    return load_json(CART_FILE, [])

@app.delete("/cart")
def clear_cart():
    save_json(CART_FILE, [])
    return {"message": "cart cleared"}

@app.post("/chat")
def chat(req: ChatRequest):
    # append user message to history
    history = load_json(CHAT_FILE, [])
    ts = int(time.time())
    user_entry = {"role": "user", "message": req.message, "session": req.session, "ts": ts}
    history.append(user_entry)

    # Prepare reply
    reply_text = None

    # If user configured GEMINI_URL and GEMINI_API_KEY, try to call it.
    # Please set backend/.env with GEMINI_API_KEY and GEMINI_URL (or only GEMINI_API_KEY and update code).
    if GEMINI_API_KEY and GEMINI_URL:
        try:
            headers = {"Authorization": f"Bearer {GEMINI_API_KEY}", "Content-Type": "application/json"}
            payload = {"input": req.message}
            r = requests.post(GEMINI_URL, headers=headers, json=payload, timeout=30)
            r.raise_for_status()
            data = r.json()
            # Try a few common fields for reply text
            reply_text = data.get("reply") or data.get("output") or data.get("text") or str(data)
        except Exception as e:
            reply_text = f"[Error calling configured GEMINI_URL]: {str(e)}"
    # elif GEMINI_API_KEY:
    #     # Try a generic Google Generative Language endpoint (user may need to update to the correct modern endpoint)
    #     try:
    #         google_url = "https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5:generateText"
    #         headers = {"Content-Type": "application/json"}
    #         params = {"key": GEMINI_API_KEY}
    #         body = {"prompt": {"text": req.message}}
    #         r = requests.post(google_url, headers=headers, params=params, json=body, timeout=30)
    #         r.raise_for_status()
    #         data = r.json()
    #         # extract text if present
    #         if "candidates" in data and isinstance(data["candidates"], list) and len(data["candidates"]) > 0:
    #             reply_text = data["candidates"][0].get("output") or data["candidates"][0].get("content") or str(data["candidates"][0])
    #         else:
    #             reply_text = str(data)
    #     except Exception as e:
    #         reply_text = f"[Error calling Google GL API]: {str(e)}"
    elif GEMINI_API_KEY:
        try:
              google_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
              headers = {"Content-Type": "application/json"}
              body = {
                  "contents": [
                      {
                          "parts": [{"text": req.message}]
                      }
                  ]
              }
              r = requests.post(google_url, headers=headers, json=body, timeout=30)
              r.raise_for_status()
              data = r.json()
              # Extract reply
              if "candidates" in data and len(data["candidates"]) > 0:
                  reply_text = data["candidates"][0]["content"]["parts"][0].get("text", "")
              else:
                  reply_text = str(data)
        except Exception as e:
            reply_text = f"[Error calling Google Gemini API]: {str(e)}"
    else:
        # no API configured -> demo reply
        reply_text = "Demo reply: set GEMINI_API_KEY and GEMINI_URL in backend/.env to enable live chatbot."

    bot_entry = {"role": "bot", "message": reply_text, "session": req.session, "ts": int(time.time())}
    history.append(bot_entry)
    save_json(CHAT_FILE, history)
    return {"reply": reply_text, "history": history}

@app.get("/chat/history")
def get_history(session: Optional[str] = None):
    history = load_json(CHAT_FILE, [])
    if session:
        history = [h for h in history if h.get("session") == session]
    return history
