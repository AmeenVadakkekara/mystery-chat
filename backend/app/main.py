from fastapi import FastAPI, WebSocket, Depends, HTTPException
from sqlalchemy.orm import Session
from .db import SessionLocal, engine, Base
from . import models, schemas
from .websocket import ConnectionManager
import asyncio

Base.metadata.create_all(bind=engine)

app = FastAPI()
manager = ConnectionManager()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/rooms/", response_model=schemas.RoomOut)
def create_room(db: Session = Depends(get_db)):
    db_room = models.Room()
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room

@app.get("/rooms/{room_id}/messages", response_model=list[schemas.MessageOut])
def get_messages(room_id: int, db: Session = Depends(get_db)):
    messages = db.query(models.Message).filter(models.Message.room_id == room_id).order_by(models.Message.timestamp).all()
    return messages

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await manager.connect(room_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(data, room_id)
    except Exception:
        manager.disconnect(room_id)
