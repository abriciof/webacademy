import { Action } from "../carrinho/page";
import { ItemCarrinhoInterface } from "../types/carrinho";
import ItemCarrinho from "./ItemCarrinho";

interface ListaCarrinhoProps{
    itensCarrinho: ItemCarrinhoInterface[];
    dispatch: React.Dispatch<Action>;
}

export default function ListaCarrinho({itensCarrinho, dispatch}: ListaCarrinhoProps){
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
                        dispatch={dispatch}
                    />
                ))}

                </tbody>
            </table>
        </div>
    );
}