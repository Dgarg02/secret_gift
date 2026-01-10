# backend/Routes/payment.py

from fastapi import APIRouter, HTTPException
from payment_client import create_order, verify_signature
import os
from dotenv import load_dotenv
router = APIRouter(prefix="/api/payment", tags=["Payment"])

load_dotenv()

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")



def get_user_id(token: str):
    try:
        
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/create-order")
async def create_payment_order(payload: dict):

    try:

        amount = int(payload.get("amount", 0))

        if amount not in [99, 499]:
            raise HTTPException(status_code=400, detail="Invalid payment amount")

        order = create_order(amount)

        return {
            "key_id": RAZORPAY_KEY_ID,
            "success": True,
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error creating payment order")
    
@router.post("/verify")
async def verify_payment(payload: dict):
    try:
        verify_signature({
            "razorpay_order_id": payload["razorpay_order_id"],
            "razorpay_payment_id": payload["razorpay_payment_id"],
            "razorpay_signature": payload["razorpay_signature"],
        })
        return {"success": True}
    except Exception:
        raise HTTPException(status_code=400, detail="Payment verification failed")
