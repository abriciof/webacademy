"use client";
import React, { useEffect, useState } from "react";
import ListagemProdutos from "./components/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho";
import { mockProdutos } from "./mocks/produtos";
import Produto from "./types/produtos";
import Carregando from "./components/Carregando";

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[] | null>(null);
  const [quantidade, setQuantidade] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://ranekapi.origamid.dev/json/api/produto"
      );
      const json = await response.json();
      setProdutos(json);
    }catch(err){
      console.error("Erro ao buscar dados:", err);
    }
  };

  fetchData();
    
  }, []);


  React.useEffect(() => {
    console.log("Executou useEffect");
  });

  const resultado = produtos ? <ListagemProdutos produtos={produtos} /> : <Carregando />;

  return (
    <main>
      <div className="container p-5">
        <ResumoCarrinho 
          quantidade={quantidade}
          total={total}
        />

        <h5 className="mb-3">Produtos disponíveis:</h5>

        {resultado}
        
      </div>
    </main>
  );
}