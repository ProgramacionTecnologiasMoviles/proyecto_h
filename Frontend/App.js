import Routes from "./Routes";
import { WebSocketProvider } from "./contexts/WebSocketContext";

const App = () => {
  return (
    <WebSocketProvider>
      <Routes />
    </WebSocketProvider>
  );
};
export default App;
