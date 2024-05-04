"use client";
import React from "react";
import Navbar from "./components/Navbar";
import ListagemProdutos from "./components/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho";

export default function Produtos() {
  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho 
            quantidade={10}
            total={4000.45}
          />

          <h5 className="mb-3">Produtos disponíveis:</h5>

          <ListagemProdutos />
          
        </div>
      </main>
    </>
  );
}