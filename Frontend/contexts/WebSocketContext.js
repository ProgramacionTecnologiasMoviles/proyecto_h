import { createContext, useContext, useState } from "react";

const WebSocketContext = createContext();
const AuthContext = createContext();

const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const initializeWebSocket = (gameId, user) => {
    if (ws) {
      ws.close();
    }

    const newWs = new WebSocket(
      `ws://192.168.1.21:3000/ws/${gameId}/${user.id}`
    );

    newWs.onopen = () => {
      console.log("WebSocket connected with gameId:", gameId, user.id);
    };

    newWs.onclose = () => {
      console.log("WebSocket closed");
    };

    setWs(newWs);
  };

  return (
    <WebSocketContext.Provider value={{ ws, initializeWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocketContext must be used within an WebSocketProvider"
    );
  }
  return context;
};

export { useWebSocket, WebSocketProvider, AuthContext };
