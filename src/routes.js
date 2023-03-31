import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroScreen from "./pages/cadastro";
import MainScreen from "./pages/main";

const Rotas = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/cadastro" element={<CadastroScreen />} />
    </Routes>
  </BrowserRouter>
);

export default Rotas;
