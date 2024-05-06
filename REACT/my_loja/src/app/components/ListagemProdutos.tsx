import CardProduto from "./CardProduto";
import Image from "next/image";
import Produto from "../types/produtos";

interface ListagemProdutosProps {
    produtos: Produto[];
}

export default function ListagemProdutos({produtos}: ListagemProdutosProps){
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
            {produtos.map((produto) => (
                <CardProduto 
                    key={produto.id }
                    produto={produto}
                />
            ))}
        </div>
    );
}