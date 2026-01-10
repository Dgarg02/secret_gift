from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os

from db import users_collection

# ================= SECURITY CONFIG =================
SECRET_KEY = os.getenv("SECRET_KEY", "SUPER_SECRET_KEY_CHANGE_THIS")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# ================= PASSWORD HASHING =================
# Argon2 is safe for Python 3.13 (bcrypt is NOT)
pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto"
)

# ================= PASSWORD HELPERS =================
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)

# ================= JWT =================
def create_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ================= USER HELPERS (MONGO) =================
def get_user_by_email(email: str):
    return users_collection.find_one({"email": email})

def get_user_by_id(user_id: str):
    return users_collection.find_one({"_id": user_id})
