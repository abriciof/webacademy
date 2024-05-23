"use client";
import React, { useState, useReducer } from "react";
import ResumoCarrinho from "../components/ResumoCarrinho";
import { mockItensCarrinho } from "../mocks/itensCarrinho";
import ListaCarrinho from "../components/ListagemCarrinho";
import { ItemCarrinhoInterface } from "../types/carrinho";

export type Action = { type: "aumentar_qtd", id: string} | { type: "diminuir_qtd", id: string } | { type: "remover", id: string }

function reducer(state: ItemCarrinhoInterface[], action: Action){
  switch(action.type){
    case "aumentar_qtd":
      return state.map((itemCarrinho) => {
        if (itemCarrinho.id == action.id){
          return {
            ...itemCarrinho, 
            quantidade: itemCarrinho.quantidade + 1
          }
        } else {
          return itemCarrinho;
        }
      });
    case "diminuir_qtd":
      return state.map((itemCarrinho) => {
        if (itemCarrinho.quantidade > 1 && itemCarrinho.id == action.id){
          return {
            ...itemCarrinho, 
            quantidade: itemCarrinho.quantidade - 1
          }
        } else {
          return itemCarrinho;
        }
      });
    case "remover":
      return state.filter(itemCarrinho => itemCarrinho.id != action.id);
    default:
      throw new Error();
  }
}

export default function Carrinho() {

  const [itensCarrinho, dispatch] = useReducer(reducer, mockItensCarrinho);
  const quantidade = itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const valor = itensCarrinho.reduce((acc, item) => acc + item.preco*item.quantidade, 0);

  return (
    <>
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="row card-body">
              <h5 className="card-title mb-4 fw-light">
                Produtos selecionados
              </h5>
              <ListaCarrinho itensCarrinho={itensCarrinho} dispatch={dispatch}/>
            </div>
          </div>

          <ResumoCarrinho 
            quantidade={quantidade}
            total={valor}
          />
        </div>
      </main>
    </>
  );
}