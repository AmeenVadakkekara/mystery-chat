from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    name: Optional[str] = None

class UserOut(BaseModel):
    id: int
    name: Optional[str]
    revealed: bool
    class Config:
        orm_mode = True

class MessageCreate(BaseModel):
    content: str

class MessageOut(BaseModel):
    id: int
    room_id: int
    user_id: int
    content: str
    timestamp: datetime
    user: UserOut
    class Config:
        orm_mode = True

class RoomOut(BaseModel):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True
