from user import User

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Depends
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



# define a login endpoint
@app.post("/login")
async def login(username: str, password: str):
    db = get_db()
    cursor = db.cursor()
    query = "SELECT * FROM user WHERE name = %s AND password = %s"
    values = (username, password)
    cursor.execute(query, values)
    result = cursor.fetchone()
    if result is None:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    elif result[10] == 'false':
        raise HTTPException(status_code=401, detail="User is not authorized by admin")
    else:
        return {"yes"}



# Route to create a new user
@app.post("/signup", response_model= User)
async def signup(user: User, db: mysql.connector.connection.MySQLConnection = Depends(get_db)):
    # Check if the username or email is already in use
    cursor = db.cursor()
    cursor.execute("SELECT * FROM user WHERE name = %s OR email = %s", (user.name, user.email))
    result = cursor.fetchone()
    if result:
        raise HTTPException(status_code=400, detail="Username or email already in use")

    # Insert the new user into the database
    cursor.execute("INSERT INTO user (id, name, roll, batch, session, program_level, mobile_number, address, email, password, status, role) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (user.id, user.name, user.roll, user.batch, user.session, user.program_level, user.mobile_number, user.address, user.email, user.password, user.status, user.role))
    db.commit()

    return {"message": "User created successfully"}
