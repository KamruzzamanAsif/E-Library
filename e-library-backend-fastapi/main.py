from model import User, Book, BookLending
import os
from fastapi import Body, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Depends
from pydantic import BaseModel
from typing import Optional
import mysql.connector
import smtplib
from email.mime.text import MIMEText
from fastapi.responses import JSONResponse
from fastapi import FastAPI, File, UploadFile


app = FastAPI()

origins = [
    "http://localhost",
    "https://localhost",
    "http://localhost:8080",
    "http://localhost:4200"
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
        password="123456",
        database="e_library"
    )
    return db


# define a login endpoint [DONE]
@app.post("/login")
async def login(email: str = Body(), password: str = Body()):
    db = get_db()
    cursor = db.cursor()
    print("Working...")
    query = "SELECT * FROM user WHERE email = %s AND password = %s"
    values = (email, password)
    cursor.execute(query, values)

    result = cursor.fetchone()

    if result is None:
        raise HTTPException(
            status_code=401, detail="Invalid username or password")
    elif result[9] == 'false':
        raise HTTPException(
            status_code=401, detail="User is not authorized by admin")
    else:
        return {'name': result[0], 'role': result[10]}


# Route to create a new user [DONE]
@app.post("/signup")
async def signup(user: User, db: mysql.connector.connection.MySQLConnection = Depends(get_db)):
    # Check if the username or email is already in use
    print("RESULT: ", user)
    cursor = db.cursor()
    cursor.execute("SELECT * FROM user WHERE name = %s OR email = %s", (user.name, user.email))
    result = cursor.fetchone()

    if result:
        raise HTTPException(status_code=400, detail="Username or email already in use")

    else:
        # Insert the new user into the database
        cursor.execute("INSERT INTO user (name, roll, batch, session, program_level, mobile_number, address, email, password, status, role) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                       (user.name, user.roll, user.batch, user.session, user.program_level, user.mobile_number, user.address, user.email, user.password, user.status, user.role))
        db.commit()

        return {"User created successfully"}


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
        cursor.execute(
            "UPDATE user SET password = %s WHERE email = %s", (new_password, email))
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


@app.post("/upload-image")
async def upload_image(image: UploadFile = File(...)):

    # Save the image to a local folder named "images"
    file_location = os.path.join(
        "C:/Users/Fahad/Desktop/e-library/src/assets/img", image.filename)
    with open(file_location, "wb") as buffer:
        buffer.write(image.file.read())

    # Return the URL of the saved image
    return {"url": f"assets\img\{image.filename}"}


# [DONE]
@app.post("/add-books")
def add_book(book: Book):
    try:
        db = get_db()
        cursor = db.cursor()
        sql = "INSERT INTO book (id, title, author, description, shelf, total_quantity, available_quantity, imageUrl, softcopyUrl, category) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (book.id, book.title, book.author, book.description, book.shelf, book.total_quantity,
                  book.available_quantity, book.imageUrl, book.softcopyUrl, book.category)
        cursor.execute(sql, values)
        db.commit()
        return {"message": "Book added successfully"}
    # except mysql.connector.Error as error:
    #     print("Error connecting to database: ", error)
    #     raise HTTPException(status_code=500, detail="Internal server error")
    finally:
        cursor.close()
        db.close()


@app.put("/books/{book_id}")
def update_book(book_id: str, book: Book):
    try:
        db = get_db()
        cursor = db.cursor()
        # check if the book exists in the database
        cursor.execute("SELECT * FROM book WHERE id = %s", (book_id,))
        result = cursor.fetchone()
        if result is None:
            raise HTTPException(status_code=404, detail="Book not found")
        # update the book in the database
        sql = "UPDATE book SET id= %s, title = %s, author = %s, description = %s, shelf = %s, total_quantity = %s, available_quantity = %s, imageUrl = %s, softcopyUrl = %s, category = %s WHERE id = %s"
        values = (book.id, book.title, book.author, book.description, book.shelf, book.total_quantity,
                  book.available_quantity, book.imageUrl, book.softcopyUrl, book.category, book_id)
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
async def delete_book(book_id: str):
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


# Define GET endpoint to get all books
@app.get("/books/all_books", response_model=list[Book])
async def search_books():
    # Create cursor object to execute SQL queries
    db = get_db()
    cursor = db.cursor()

    # Define SQL command to search for books with the given category
    sql = "SELECT * FROM book"

    # Execute SQL command to search for books in the database
    cursor.execute(sql)

    # Get all rows that match the search criteria
    books = cursor.fetchall()

    # Check if any books were found
    if len(books) == 0:
        return JSONResponse(content={"message": "No books found"})
    else:
        # Convert the result to a list of dictionaries
        book_list = []
        for book in books:
            book_list.append({
                "id": book[0],
                "title": book[1],
                "author": book[2],
                "description": book[3],
                "shelf": book[4],
                "total_quantity": book[5],
                "available_quantity": book[6],
                "imageUrl": book[7],
                "softcopyUrl": book[8],
                "category": book[9]
            })

        # close db connection
        cursor.close()
        db.close()
        # Return the list of books as a JSON response
        return book_list


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


# Get all unapproved users [DONE]
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

    # Check if any users were found
    if len(unapproved_users) == 0:
        return JSONResponse(content={"message": "No unapproved users found"})
    else:
        # Convert the result to a list of User objects
        unapproved_user_list = []
        for unapproved_user in unapproved_users:
            unapproved_user_list.append({
                "name": unapproved_user[0],
                "roll": unapproved_user[1],
                "batch": unapproved_user[2],
                "session": unapproved_user[3],
                "program_level": unapproved_user[4],
                "mobile_number": unapproved_user[5],
                "address": unapproved_user[6],
                "email": unapproved_user[7],
                "password": unapproved_user[8],
                "status": unapproved_user[9],
                "role": unapproved_user[10]
            })

        # Close the database connection
        cursor.close()
        db.close()

        # Return the list of unapproved users as a JSON response
        return unapproved_user_list


# Get all approved users
@app.get("/users/approved", response_model=list[User])
def get_approved_users():
    # MySQL Connection
    db = get_db()
    cursor = db.cursor()

    # Query
    query = "SELECT * FROM user WHERE status = 'true'"

    # Execute Query
    cursor.execute(query)

    # Get all rows that match the search criteria
    approved_users = cursor.fetchall()

    # Check if any users were found
    if len(approved_users) == 0:
        return JSONResponse(content={"message": "No approved users found"})
    else:
        # Convert the result to a list of User objects
        approved_user_list = []
        for approved_user in approved_users:
            approved_user_list.append({
                "id": approved_user[0],
                "name": approved_user[1],
                "roll": approved_user[2],
                "batch": approved_user[3],
                "session": approved_user[4],
                "program_level": approved_user[5],
                "mobile_number": approved_user[6],
                "address": approved_user[7],
                "email": approved_user[8],
                "password": approved_user[9],
                "status": approved_user[10],
                "role": approved_user[11]
            })

        # Close the database connection
        cursor.close()
        db.close()

        # Return the list of unapproved users as a JSON response
        return approved_user_list


# Get all users
@app.get("/users/all_users", response_model=list[User])
def get_all_users():
    # MySQL Connection
    db = get_db()
    cursor = db.cursor()

    # Query
    query = "SELECT * FROM user where role not in ('admin')"

    # Execute Query
    cursor.execute(query)

    # Get all rows that match the search criteria
    users = cursor.fetchall()

    # Check if any users were found
    if len(users) == 0:
        return JSONResponse(content={"message": "No unapproved users found"})
    else:
        # Convert the result to a list of User objects
        user_list = []
        for user in users:
            user_list.append({
                "name": user[0],
                "roll": user[1],
                "batch": user[2],
                "session": user[3],
                "program_level": user[4],
                "mobile_number": user[5],
                "address": user[6],
                "email": user[7],
                "password": user[8],
                "status": user[9],
                "role": user[10]
            })

        # Close the database connection
        cursor.close()
        db.close()

        print(user_list)

        # Return the list of unapproved users as a JSON response
        return user_list


# Approve a user [DONE]
@app.post("/users/verify_user")
def verify_user(user_email: str = Body(), status: str = Body()):

    print(user_email, status)
    # MySQL Connection
    db = get_db()
    cursor = db.cursor()

    # Query to find user with specified email and false status
    query = "SELECT * FROM user WHERE email = %s AND status = 'false'"

    # Execute query with user email parameter
    cursor.execute(query, (user_email,))

    # Get the first row that matches the search criteria
    user = cursor.fetchone()

    # If no user found with the specified email and false status, raise an exception
    if user is None:
        raise HTTPException(
            status_code=404, detail="User not found or already approved")

    if status == "true":

        # If user found, update the status to true
        query = "UPDATE user SET status = %s WHERE email = %s"
        print(cursor.execute(query, (status, user_email)))
        db.commit()

        # Close the database connection
        cursor.close()
        db.close()

        # Return  as a JSON response
        return {"message": f"User with email {user_email} has been approved."}

    else:

        # If user found, update the status to true
        query = "DELETE from user WHERE email = %s"
        print(cursor.execute(query, (user_email,)))
        db.commit()

        # Close the database connection
        cursor.close()
        db.close()

        return {"message": f"User with email {user_email} has been rejected."}


######################    BOOK LENDING SECTION STARTS #################


# Get all book lendings
@app.get("/books/get_book_lendings", response_model=list[BookLending])
def get_book_lendings():
    # MySQL Connection
    db = get_db()
    cursor = db.cursor()

    # Query
    query = "SELECT * FROM book_lending"

    # Execute Query
    cursor.execute(query)

    # Get all rows that match the search criteria
    book_lendings = cursor.fetchall()

    # Check if any book lendings were found
    if len(book_lendings) == 0:
        return JSONResponse(content={"message": "No book lendings found"})
    else:
        # Convert the result to a list of BookLending objects
        book_lendings_list = []
        for book_lending in book_lendings:
            # book_lending_obj = BookLending(
            #     user_email=book_lending[1],
            #     book_id=book_lending[2],
            #     borrow_date=str(book_lending[3]),
            #     return_date=str(book_lending[4])
            # )
            book_lending_obj = {
                'user_email' : book_lending[1],
                'book_id' : book_lending[2],
                'borrow_date' : str(book_lending[3]),
                'return_date' : str(book_lending[4])
            }
            book_lendings_list.append(book_lending_obj)

        # Close the database connection
        cursor.close()
        db.close()

        print(book_lendings_list)

        # Return the list of book lendings as a JSON response
        return book_lendings_list


# Request a book for lending
@app.post("/books/request_a_book")
def request_a_book(user_email: str = Body(), book_id: str = Body()):
    # MySQL Connection
    db = get_db()
    cursor = db.cursor()

    # Query
    query = "INSERT INTO book_lending (user_email, book_id) VALUES (%s, %s)"

    # Data
    data = (user_email, book_id)

    # Execute Query
    cursor.execute(query, data)

    # Commit the transaction
    db.commit()

    # Close the database connection
    cursor.close()
    db.close()

    # Return a success message
    return JSONResponse(content={"message": "Book request successful. Wait for admin approval"})


# Add a new book lending record
@app.post("/books/lend_a_book")
def lend_a_book(user_email: str = Body(), book_id: str = Body(), borrow_date: str = Body()):
    
    print(user_email, book_id, borrow_date, type(borrow_date))
    # MySQL Connection
    db = get_db()
    cursor = db.cursor()

    # Query
    # query = "INSERT INTO book_lending (user_email, book_id, borrow_date) VALUES (%s, %s, %s)"
    query = "UPDATE book_lending SET user_email = %s, borrow_date = %s WHERE book_id = %s"
    data = (user_email, borrow_date, book_id)

    # Execute Query
    cursor.execute(query, data)

    # Get the current available quantity of the book
    cursor.execute(
        "SELECT available_quantity FROM book WHERE id = %s", (book_id,))
    result = cursor.fetchone()

    # Commit the transaction
    # update the book availability
    if result and result[0] > 0:
        # Update the available quantity if it's greater than 0
        cursor.execute(
            "UPDATE book SET available_quantity = available_quantity - 1 WHERE id = %s", (book_id,))

    db.commit()

    # Close the database connection
    cursor.close()
    db.close()

    # Return a success message
    return {"message": "Book lending added successfully"}


# Add a new book return record
@app.post("/books/return_a_book")
def return_a_book(user_email: str = Body(), book_id: str = Body(), return_date: str = Body()):
    
    print(user_email, book_id, type(return_date), return_date)
    # MySQL Connection
    db = get_db()
    cursor = db.cursor()
    
    query = "UPDATE book_lending SET return_date = %s WHERE book_id = %s AND user_email = %s"
    data = (return_date, book_id, user_email)

    # Execute Query
    cursor.execute(query, data)

    # Query
    # cursor.execute("UPDATE book_lending SET return_date = %s WHERE book_id = %s AND user_email = %s",
    #                (return_date, book_id, user_email))

    # Commit the transaction
    # update the book availability
    cursor.execute(
        "UPDATE book SET available_quantity = available_quantity + 1 WHERE id = %s", (book_id,))
    db.commit()

    # Close the database connection
    cursor.close()
    db.close()

    # Return a success message
    return {"message": "Book returned successfully"}


######################### BOOK LENDING SECTION ENDS #########################
