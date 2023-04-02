from pydantic import BaseModel

class User(BaseModel):
    id = 0
    name = ""
    roll = ""
    batch = ""
    session = ""
    program_level = ""
    mobile_number = ""
    address = ""
    email = ""
    password = ""
    status = ""
    role = ""


class Book(BaseModel):
    id = 0
    title = ""
    author = ""
    description = ""
    softcopy = ""
    shelf = ""
    total_quantity = ""
    available_quantity = ""
    imageUrl = ""
    softcopyUrl = ""
    category = ""