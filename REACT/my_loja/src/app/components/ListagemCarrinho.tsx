import { ItemCarrinhoInterface } from "../types/carrinho";
import ItemCarrinho from "./ItemCarrinho";

interface ListaCarrinhoProps{
    itensCarrinho: ItemCarrinhoInterface[]
}

export default function ListaCarrinho({itensCarrinho}: ListaCarrinhoProps){
    return (
        <div className="table-responsive">
            <table className="table ">
                <thead>
                <tr>
                    <th>Produto</th>
                    <th>Valor Unitário</th>
                    <th>Quantidade</th>
                    <th>Valor Total</th>
                    <th>Opções</th>
                </tr>
                </thead>
                <tbody>

                {itensCarrinho.map((itemCarrinho) => (
                    <ItemCarrinho 
                        key={itemCarrinho.id}
                        itemCarrinho={itemCarrinho}
                    />
                ))}

                


                </tbody>
            </table>
        </div>
    );
}