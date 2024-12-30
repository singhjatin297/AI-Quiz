import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { User } from "./components/User";
import { Admin } from "./components/Admin";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="admin" element={<Admin />} />
        <Route path="user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
