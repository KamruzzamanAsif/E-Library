from model import User, Book

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Depends
from pydantic import BaseModel
from typing import Optional
import mysql.connector
import smtplib
from email.mime.text import MIMEText


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


@app.post("/forgot_password")
def forgot_password(email: str):
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM user WHERE email = %s", (email,))
        result = cursor.fetchone()
        if result is None:
            raise HTTPException(status_code=404, detail="User not found")
        # generate a new password and update the database
        new_password = "my_new_password"
        cursor.execute("UPDATE user SET password = %s WHERE email = %s", (new_password, email))
        db.commit()
        # send an email to the user with the new password
        msg = MIMEText(f"Your new password is {new_password}")
        msg['Subject'] = 'New Password Request'
        msg['From'] = 'asif420kamruzzaman@gmail.com'
        msg['To'] = email
        s = smtplib.SMTP('smtp.gmail.com', 587)
        s.starttls()
        s.login('asif420kamruzzaman@gmail.com', 'sauowioxhlinhgmd')
        s.sendmail(msg['From'], [msg['To']], msg.as_string())
        s.quit()
        return {"message": "Password reset successful. Check your email for the new password."}
    except mysql.connector.Error as error:
        print("Error connecting to database: ", error)
        raise HTTPException(status_code=500, detail="Internal server error")
    except smtplib.SMTPException as error:
        print("Error sending email: ", error)
        raise HTTPException(status_code=500, detail="Internal server error")
    finally:
        cursor.close()
        db.close()


@app.post("/books")
def add_book(book: Book):
    try:
        db = get_db()
        cursor = db.cursor()
        sql = "INSERT INTO book (id, title, author, description, softcopy, shelf, total_quantity, available_quantity, imageUrl, softcopyUrl, category) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (book.id, book.title, book.author, book.description, book.softcopy, book.shelf, book.total_quantity, book.available_quantity, book.imageUrl, book.softcopyUrl, book.category)
        cursor.execute(sql, values)
        db.commit()
        return {"message": "Book added successfully"}
    except mysql.connector.Error as error:
        print("Error connecting to database: ", error)
        raise HTTPException(status_code=500, detail="Internal server error")
    finally:
        cursor.close()
        db.close()


@app.put("/books/{book_id}")
def update_book(book_id: int, book: Book):
    try:
        db = get_db()
        cursor = db.cursor()
        # check if the book exists in the database
        cursor.execute("SELECT * FROM book WHERE id = %s", (book_id,))
        result = cursor.fetchone()
        if result is None:
            raise HTTPException(status_code=404, detail="Book not found")
        # update the book in the database
        sql = "UPDATE book SET id= %s, title = %s, author = %s, description = %s, softcopy = %s, shelf = %s, total_quantity = %s, available_quantity = %s, imageUrl = %s, softcopyUrl = %s, category = %s WHERE id = %s"
        values = (book.id, book.title, book.author, book.description, book.softcopy, book.shelf, book.total_quantity, book.available_quantity, book.imageUrl, book.softcopyUrl, book.category, book_id)
        cursor.execute(sql, values)
        db.commit()
        return {"message": "Book updated successfully"}
    except mysql.connector.Error as error:
        print("Error connecting to database: ", error)
        raise HTTPException(status_code=500, detail="Internal server error")
    finally:
        cursor.close()
        db.close()


@app.delete("/books/{book_id}")
async def delete_book(book_id: int):
    # Create cursor object to execute SQL queries
    db = get_db()
    cursor = db.cursor()

    # Define SQL command to delete a book with the given ID
    sql = "DELETE FROM book WHERE id = %s"
    val = (book_id,)

    # Execute SQL command to delete the book from the database
    cursor.execute(sql, val)
    db.commit()

    # Check if the book was deleted successfully
    if cursor.rowcount == 0:
        return {"message": "Book not found"}
    else:
        return {"message": "Book deleted successfully"}