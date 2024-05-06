"use client";
import React from "react";
import ResumoCarrinho from "../components/ResumoCarrinho";
import { mockItensCarrinho } from "../mocks/itensCarrinho";
import ListaCarrinho from "../components/ListagemCarrinho";

export default function Carrinho() {
  const itensCarrinho = mockItensCarrinho; 

  return (
    <>
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="row card-body">
              <h5 className="card-title mb-4 fw-light">
                Produtos selecionados
              </h5>
              <ListaCarrinho itensCarrinho={itensCarrinho}/>
            </div>
          </div>

          <ResumoCarrinho 
            quantidade={32}
            total={7904.56}
          />
        </div>
      </main>
    </>
  );
}