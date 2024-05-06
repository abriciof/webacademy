"use client";
import React from "react";
import ListagemProdutos from "./components/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho";
import { mockProdutos } from "./mocks/produtos";

export default function Produtos() {
  
  const produtos = mockProdutos;

  return (
    <main>
      <div className="container p-5">
        <ResumoCarrinho 
          quantidade={10}
          total={4000.45}
        />

        <h5 className="mb-3">Produtos disponíveis:</h5>

        <ListagemProdutos produtos={produtos}/>
        
      </div>
    </main>
  );
}