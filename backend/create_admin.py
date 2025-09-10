import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.hash import bcrypt
import os
from dotenv import load_dotenv

# Load env
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

if not MONGO_URI or not DB_NAME:
    raise ValueError("❌ Missing MONGO_URI or DB_NAME in .env file")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

async def create_admin():
    username = "admin"
    password = bcrypt.hash("admin123")  # default password
    existing = await db["users"].find_one({"username": username})
    if existing:
        print("⚠️ Admin already exists")
    else:
        await db["users"].insert_one({
            "username": username,
            "password": password,
            "preferences": {}
        })
        print("✅ Admin user created -> username: admin, password: admin123")

if __name__ == "__main__":
    asyncio.run(create_admin())
