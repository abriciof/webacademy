"use client";
import React from "react";
import ResumoCarrinho from "../components/ResumoCarrinho";
import ItemCarrinho from "../components/ItemCarrinho";
import ListaCarrinho from "../components/ListaCarrinho";

export default function Carrinho() {


  return (
    <>
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="row card-body">
              <h5 className="card-title mb-4 fw-light">
                Produtos selecionados
              </h5>
              <ListaCarrinho />
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