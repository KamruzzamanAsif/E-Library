from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import mysql.connector


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# define a database connection function
def get_db():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Asif1217*",
        database="e_library"
    )
    return db


# define a temporary user model for login
# just for username and password
class User(BaseModel):
    username: str
    password: str


# define a login endpoint
@app.post("/login")
async def login(user: User):
    db = get_db()
    cursor = db.cursor()
    query = "SELECT * FROM user WHERE name = %s AND password = %s"
    values = (user.username, user.password)
    cursor.execute(query, values)
    result = cursor.fetchone()
    if result is None:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    else:
        print(result)
        return {"yes"}


