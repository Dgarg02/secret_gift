# backend/payment_client.py

import razorpay
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")


if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
    raise RuntimeError("Razorpay keys not found in environment")


client = razorpay.Client(
    auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
)

class CreatePaymentRequest(BaseModel):
    amount: int
    currency: str = "INR"


def create_order(amount: int):
    try:        
        print(client)
        print(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
        return client.order.create({
            "amount": amount * 100,
            "currency": "INR",
            "payment_capture": 1
        })
    except Exception as e:
        print("Error creating order:", e)
        raise

def verify_signature(data: dict):
    client.utility.verify_payment_signature(data)
