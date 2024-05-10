"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ProdutoInterface from "../../types/produtos";
import { useParams } from "next/navigation";


export default function Produto() {
    const [produto, setProduto] = useState<ProdutoInterface | null>(null);
    const {produtoId} = useParams()

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://ranekapi.origamid.dev/json/api/produto/"+produtoId
          );
          const json = await response.json();
          setProduto(json);
        }catch(err){
          console.error("Erro ao buscar dados:", err);
        }
      };
    
      fetchData();
        
    }, []);

    if (produto){
      return (
        <main>
        <div className="container p-5">
            <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
                
                <h5 className="card-title mb-4 fw-bold">{produto.nome}</h5>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
                  <div className="card shadow-sm h-100">
                    {produto.fotos?.map((foto) => (
                      <Image
                          key={foto.titulo}
                          src={foto.src}
                          className="card-img-top"
                          alt={foto.titulo}
                          width={300}
                          height={320}
                      />
                    ))}
                    {/* <Image
                      src={produto.fotos[0].src}
                      className="card-img-top"
                      alt={produto.fotos[0].titulo}
                      width={300}
                      height={320}
                    /> */}
                  </div>
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
    }else{

      return (
        <main>
          <div className="container p-5">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>

                  <h5 className="card-title mb-4 fw-bold">Carregando...</h5>
                </div>
              </div>
          </div>
        </main>);
    }
}