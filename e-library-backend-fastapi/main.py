from model import User, Book

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Depends
from pydantic import BaseModel
from typing import Optional
import mysql.connector
import smtplib
from email.mime.text import MIMEText
from fastapi.responses import JSONResponse



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
    


# Define GET endpoint to search for books by category
@app.get("/books/books_by_category/{category}", response_model=list[Book])
async def search_books(category: str):
    # Create cursor object to execute SQL queries
    db = get_db()
    cursor = db.cursor()

    # Define SQL command to search for books with the given category
    sql = "SELECT * FROM book WHERE category = %s"
    val = (category,)

    # Execute SQL command to search for books in the database
    cursor.execute(sql, val)

    # Get all rows that match the search criteria
    books = cursor.fetchall()

    # Check if any books were found
    if len(books) == 0:
        return JSONResponse(content={"message": "No books found for this category"})
    else:
        # Convert the result to a list of dictionaries
        book_list = []
        for book in books:
            book_list.append({
            "id": book[0],
            "title": book[1],
            "author": book[2],
            "description": book[3],
            "softcopy": book[4],
            "shelf": book[5],
            "total_quantity": book[6],
            "available_quantity": book[7],
            "imageUrl": book[8],
            "softcopyUrl": book[9],
            "category": book[10]
        })

        # close db connection
        cursor.close()
        db.close()
        # Return the list of books as a JSON response
        return book_list
    

# Search by Author Endpoint
@app.get("/books/books_by_author/{author}", response_model=list[Book])
def search_books_by_author(author: str):
    # MySQL Connection
    db = get_db()
    cursor = db.cursor()

    # Query
    query = "SELECT * FROM book WHERE author LIKE %s"
    values = (f"%{author}%",)

    # Execute Query
    cursor.execute(query, values)

    # Get all rows that match the search criteria
    books = cursor.fetchall()

    # Check if any books were found
    if len(books) == 0:
        return JSONResponse(content={"message": "No books found for this author"})
    else:
        # Convert the result to a list of dictionaries
        book_list = []
        for book in books:
            book_list.append({
            "id": book[0],
            "title": book[1],
            "author": book[2],
            "description": book[3],
            "softcopy": book[4],
            "shelf": book[5],
            "total_quantity": book[6],
            "available_quantity": book[7],
            "imageUrl": book[8],
            "softcopyUrl": book[9],
            "category": book[10]
        })

        # close db connection
        cursor.close()
        db.close()
        # Return the list of books as a JSON response
        return book_list
    

# Search by Book Name Endpoint
@app.get("/books/books_by_name/{book_name}", response_model=list[Book])
def search_books_by_name(book_name: str):
    # MySQL Connection
    db = get_db()
    cursor = db.cursor()

    # Query
    query = "SELECT * FROM book WHERE title LIKE %s"
    values = (f"%{book_name}%",)

    # Execute Query
    cursor.execute(query, values)

    # Get all rows that match the search criteria
    books = cursor.fetchall()

    # Check if any books were found
    if len(books) == 0:
        return JSONResponse(content={"message": "No books found for this name"})
    else:
        # Convert the result to a list of dictionaries
        book_list = []
        for book in books:
            book_list.append({
            "id": book[0],
            "title": book[1],
            "author": book[2],
            "description": book[3],
            "softcopy": book[4],
            "shelf": book[5],
            "total_quantity": book[6],
            "available_quantity": book[7],
            "imageUrl": book[8],
            "softcopyUrl": book[9],
            "category": book[10]
        })

        # close db connection
        cursor.close()
        db.close()
        # Return the list of books as a JSON response
        return book_list



# Get all unapproved users
@app.get("/users/not_approved", response_model=list[User])
def get_unapproved_users():
    # MySQL Connection
    db = get_db()
    cursor = db.cursor()

    # Query
    query = "SELECT * FROM user WHERE status = 'false'"
    
    # Execute Query
    cursor.execute(query)

    # Get all rows that match the search criteria
    unapproved_users = cursor.fetchall()
    print(len(unapproved_users))
    # Check if any users were found
    if len(unapproved_users) == 0:
        return JSONResponse(content={"message": "No unapproved users found"})
    else:
        # Convert the result to a list of User objects
        unapproved_user_list = []
        for unapproved_user in unapproved_users:
            unapproved_user_list.append({
                "id": unapproved_user[0],
                "name": unapproved_user[1],
                "roll": unapproved_user[2],
                "batch": unapproved_user[3],
                "session": unapproved_user[4],
                "program_level": unapproved_user[5],
                "mobile_number": unapproved_user[6],
                "address": unapproved_user[7],
                "email": unapproved_user[8],
                "password": unapproved_user[9],
                "status": unapproved_user[10],
                "role": unapproved_user[11]
            })

        # Close the database connection
        cursor.close()
        db.close()

        # Return the list of unapproved users as a JSON response
        return unapproved_user_list
    

