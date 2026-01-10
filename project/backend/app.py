from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from Routes.payment import router as payment_router
from Routes.access import router as access_router
from Routes.gifts import router as gifts_router


from Routes.auth_api import (
    login,
    register,
    logout,
    get_user_from_token,
    AuthData
)

app = FastAPI(title="Destiny & Love API 💖")

# ---------------- CONFIG ----------------
templates = Jinja2Templates(directory="./templates")
app.mount("/static", StaticFiles(directory="./static"), name="static")
app.include_router(payment_router)
app.include_router(access_router)
app.include_router(gifts_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# ---------------- PAGES ----------------
@app.get("/")
def landing(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request, "title": "Destiny & Love 💖"}
    )



@app.get("/create")
def create_page(request: Request):
    return templates.TemplateResponse(
        "create.html",
        {"request": request, "title": "Create Gift"}
    )

@app.get("/select-plan")
def select_plan(request: Request):
    return templates.TemplateResponse(
        "plan_select.html",
        {"request": request, "title": "Select Plan"}
    )

@app.get("/select-theme")
def select_experience(request: Request):
    return templates.TemplateResponse(
        "select-experience.html",
        {"request": request, "title": "Select Experience"}
    )

@app.get("/payment")
def payment_page(request: Request):
    return templates.TemplateResponse(
        "payment.html",
        {"request": request, "title": "Payment"}
    )

@app.get("/login")
def login_page(request: Request):
    return templates.TemplateResponse(
        "login.html",
        {"request": request, "title": "Login"}
    )

# ---------------- AUTH APIs ----------------
@app.post("/auth/register")
async def auth_register(data: AuthData):
    return await register(data)

@app.post("/auth/login")
async def auth_login(data: AuthData):
    return await login(data)

@app.post("/auth/logout")
async def auth_logout():
    return await logout()

# ---------------- AUTH GUARD ----------------
def get_current_user(token: str = Depends(oauth2_scheme)):
    return get_user_from_token(token)

# ---------------- PROTECTED TEST ----------------
@app.get("/auth/me")
async def auth_me(user_id: str = Depends(get_current_user)):
    return {"user_id": user_id}
