import { ItemCarrinhoInterface } from "../types/carrinho";

interface ItemCarrinhoProps {
  itemCarrinho: ItemCarrinhoInterface
}
const valorTotalProduto = (
    precoUnitario: number,
    quantidade: number
  ): number => precoUnitario * quantidade;

export default function ItemCarrinho( {itemCarrinho}: ItemCarrinhoProps ){
    return (
        <tr key={itemCarrinho.id}>
        <td>{itemCarrinho.nome}</td>
        <td>R$ {(itemCarrinho.preco).toFixed(2)}</td>
        <td>{itemCarrinho.quantidade}</td>

        <td>R$ {valorTotalProduto(itemCarrinho.preco, itemCarrinho.quantidade).toFixed(2)}</td>
        <td>
          <button className="btn btn-danger btn-sm">
            Remover
          </button>
        </td>
      </tr>
    );
}