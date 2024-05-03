import CardProduto from "./CardProduto";
import Image from "next/image";

export default function ListagemProdutos(){
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
            <CardProduto 
                nome="Notebook 1"
                preco={1500}
                imagem="/placeholder.png"
            />

            <CardProduto 
                nome="Notebook 2"
                preco={5400}
                imagem="/placeholder.png"
            />

            <CardProduto 
                nome="Notebook 3"
                preco={3500}
                imagem="/placeholder.png"
            />
          </div>
    );
}