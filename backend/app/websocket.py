import json
import aioredis
from fastapi import WebSocket
from typing import Dict

REDIS_URL = "redis://redis:6379"

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, room_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[room_id] = websocket

    def disconnect(self, room_id: str):
        self.active_connections.pop(room_id, None)

    async def send_personal_message(self, message: str, room_id: str):
        websocket = self.active_connections.get(room_id)
        if websocket:
            await websocket.send_text(message)

    async def broadcast(self, message: str, room_id: str):
        await self.send_personal_message(message, room_id)

async def get_redis():
    redis = await aioredis.create_redis_pool(REDIS_URL)
    return redis
