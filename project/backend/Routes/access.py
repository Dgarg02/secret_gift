from fastapi import APIRouter, HTTPException, Depends
from jose import jwt, JWTError
from db import payments_collection
from auth import SECRET_KEY, ALGORITHM

router = APIRouter(prefix="/api/access", tags=["Access"])

def get_user_id(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/check")
def check_access(plan: str, experience: str, token: str):
    user_id = get_user_id(token)

    payment = payments_collection.find_one({
        "user_id": user_id,
        "status": "paid"
    })

    if not payment:
        return {"allowed": False}

    if payment["plan"] == "combo":
        return {"allowed": True}

    if payment["plan"] == "individual" and payment["experience"] == experience:
        return {"allowed": True}

    return {"allowed": False}
