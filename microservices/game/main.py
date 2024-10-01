from typing import List
import json

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ConnectionManager:

    def __init__(self) -> None:
        self.active_connections: List[WebSocket] = []
        self.player_ids = {} 

    async def connect(self, websocket: WebSocket,player:str):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.player_ids[websocket] = player

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        """Send message to everyone on active connections"""
        for connection in self.active_connections:
            await connection.send_text(message)


game_connections = {}
@app.websocket("/ws/{game_id}/{player_id}")
async def websocket_endpoint(websocket: WebSocket, game_id: str, player_id: str):
    manager = game_connections.setdefault(game_id, ConnectionManager())
    await manager.connect(websocket,player_id)
    try:
        if len(manager.active_connections) == 2:
            print((list(manager.player_ids.values())))
            await manager.broadcast(game_id)
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"{data}")
        
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        if len(manager.active_connections) > 0:
            for connection in manager.active_connections:
                print("Se Envia ID a la sesion ")
                await connection.send_json({"players":list(manager.player_ids.values())})
        if len(manager.active_connections) == 0:
            del game_connections[game_id]
