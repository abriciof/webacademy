"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ProdutoInterface from "../../types/produtos";
import { useParams } from "next/navigation";
import { useDetalhesProduto } from "@/app/hooks/useDetalhesProduto";


export default function Produto() {
    
  const {produtoId} = useParams()
  const { produto, isPending, isError } =  useDetalhesProduto(produtoId.toString());

  if (isPending) return <h5>Carregando...</h5>;
  if (isError) return <h5>Ocorreu um erro ao carregar os detalhes do produto.</h5>;
  if (!produto) return <h5>Não há detalhes disponíveis no momento.</h5>;

  return (
    <main>
    <div className="container p-5">
        <div className="card mb-4">
        <div className="card-body">
            <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
            
            <h5 className="card-title mb-4 fw-bold">{produto.nome}</h5>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
                {produto.fotos?.map((foto) => (
                  <div className="card shadow-sm h-100 me-2" key={foto.titulo}>  
                    <Image
                        
                        src={foto.src}
                        className="card-img-top"
                        alt={foto.titulo}
                        width={300}
                        height={320}
                    />
                  </div>
                ))}
            </div>
            

            <p className="card-text fw-medium">
            Valor: R${Number(produto?.preco).toFixed(2)}
            </p>
            <p className="card-text fw-medium">Descrição: {produto.descricao}</p>
            <p className="card-text fw-medium">Anunciado por: {produto.usuario_id}</p>

            
        </div>
        </div>
    </div>
    </main>
  );
}