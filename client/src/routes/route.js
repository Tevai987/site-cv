import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "../components/form/register.js";

export const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
