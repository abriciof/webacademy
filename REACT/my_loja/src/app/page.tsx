"use client";

import React, { useState } from "react";
import ListagemProdutos from "./components/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho";
import Produto from "./types/produtos";


export default function Produtos() {
  const [quantidade, setQuantidade] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const adicionarAoCarrinho = (produto: Produto) => {
    setQuantidade(quantidade + 1);
    setTotal(total + parseFloat(produto.preco));
  }

  React.useEffect(() => {
    console.log("Executou useEffect");
  });

  return (
    <main>
      <div className="container p-5">
        <ResumoCarrinho 
          quantidade={quantidade}
          total={total}
        />

        <h5 className="mb-3">Produtos disponíveis:</h5>

        <ListagemProdutos adicionarAoCarrinho={adicionarAoCarrinho}/>
      </div>
    </main>
  );
}