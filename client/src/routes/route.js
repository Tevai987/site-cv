import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "../components/form/register.js";
import { Login } from "../components/form/logIn.js";
import { Home } from "../components/home/home.js";

export const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
