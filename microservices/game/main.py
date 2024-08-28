from typing import List

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

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        """Send message to everyone on active connections"""
        for connection in self.active_connections:
            await connection.send_text(message)


game_connections = {}


@app.websocket("/ws/{game_id}")
async def websocket_endpoint(websocket: WebSocket, game_id: str):
    print(game_id)
    manager = game_connections.setdefault(game_id, ConnectionManager())
    await manager.connect(websocket)

    try:
        print(len(manager.active_connections))
        if len(manager.active_connections) == 2:
            await manager.broadcast(game_id)
        while True:
            data = await websocket.receive_text()
            print(data)
            await manager.broadcast(f"{data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        if len(manager.active_connections) == 0:
            del game_connections[game_id]


@app.get("/")
def read_root():
    return {"Hello": "World"}
