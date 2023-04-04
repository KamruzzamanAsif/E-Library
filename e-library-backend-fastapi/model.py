from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: int = 0
    name: str = ""
    roll: Optional[str] = None
    batch: Optional[str] = None
    session: Optional[str] = None
    program_level: Optional[str] = None
    mobile_number: str = ""
    address: Optional[str] = None
    email: str = ""
    password: str = ""
    status: str = ""
    role: str = ""


class Book(BaseModel):
    id: int = 0
    title: str = ""
    author: str = ""
    description: str = ""
    softcopy: str = ""
    shelf: str = ""
    total_quantity: str = ""
    available_quantity: str = ""
    imageUrl: str = ""
    softcopyUrl: str = ""
    category: str = ""



class BookLending(BaseModel):
    user_email: str = ""
    book_id: str = ""
    borrow_date: str = ""
    return_date: Optional[str] = None