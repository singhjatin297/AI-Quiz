import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { User } from "./components/User";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:4000");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
