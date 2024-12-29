import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { User } from "./components/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
