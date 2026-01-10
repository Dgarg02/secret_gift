from fastapi import APIRouter, HTTPException, Depends, Request
from jose import jwt, JWTError
from db import payments_collection
from auth import SECRET_KEY, ALGORITHM

router = APIRouter(prefix="/api/gifts", tags=["Gifts"])

def get_user_id(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/my")
def my_gifts(request: Request):
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    user_id = get_user_id(token)

    payments = list(
        payments_collection.find(
            {"user_id": user_id, "status": "paid"},
            {"_id": 0}
        )
    )

    return {
        "success": True,
        "gifts": payments
    }
