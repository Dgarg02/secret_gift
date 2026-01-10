from fastapi import HTTPException
from jose import jwt, JWTError
from pydantic import BaseModel
from datetime import datetime
from db import users_collection
import uuid

from auth import (
    hash_password,
    verify_password,
    create_token,
    SECRET_KEY,
    ALGORITHM
)

class AuthData(BaseModel):
    email: str
    password: str


async def register(data: AuthData):

    if users_collection.find_one({"email": data.email}):
        raise HTTPException(status_code=400, detail="Email already registered")


    user_id = str(uuid.uuid4())

    users_collection.insert_one({
        "id": user_id,
        "email": data.email,
        "password": hash_password(data.password),
        "created_at": datetime.utcnow()
    })

    token = create_token({"sub": user_id})

    return {
        "success": True,
        "token": token
    }


async def login(data):

    user = users_collection.find_one({"email": data.email})

    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token({"sub": str(user["_id"])})
    return {
        "success": True,
        "token": token
    }

async def logout():
    # JWT logout is frontend-handled
    return {"success": True, "message": "Logged out"}


def get_user_from_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = users_collection.find_one({"id": user_id})
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        return user
    
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
