import RoutesPub from "./RoutesPub";
import { WebSocketProvider } from "./contexts/WebSocketContext";

const App = () => {
  return (
    <WebSocketProvider>
      <RoutesPub />
    </WebSocketProvider>
  );
};
export default App;
