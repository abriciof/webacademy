import { Action } from "../carrinho/page";
import { ItemCarrinhoInterface } from "../types/carrinho";

interface ItemCarrinhoProps {
  itemCarrinho: ItemCarrinhoInterface;
  dispatch: React.Dispatch<Action>;
}
const valorTotalProduto = (
    precoUnitario: number,
    quantidade: number
  ): number => precoUnitario * quantidade;

export default function ItemCarrinho( {itemCarrinho, dispatch}: ItemCarrinhoProps ){
    return (
      <tr key={itemCarrinho.id}>
        <td>{itemCarrinho.nome}</td>
        <td>R$ {(itemCarrinho.preco).toFixed(2)}</td>
        <td>
          <button className="btn btn-secondary btn-sm me-2" 
            onClick={() => dispatch({type: "diminuir_qtd", id: itemCarrinho.id})}>-</button>

            {itemCarrinho.quantidade}

          <button className="btn btn-secondary btn-sm ms-2"
          onClick={() => dispatch({type: "aumentar_qtd", id: itemCarrinho.id})}>+</button>
        </td>
        <td>R$ {valorTotalProduto(itemCarrinho.preco, itemCarrinho.quantidade).toFixed(2)}</td>
        <td>
          <button className="btn btn-danger btn-sm"
           onClick={() => dispatch({type: "remover", id: itemCarrinho.id})}>Remover</button>
        </td>
      </tr>
    );
}