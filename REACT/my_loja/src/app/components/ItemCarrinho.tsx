interface ItemCarrinhoProps {
    nome: string,
    valor: number,
    quantidade: number
}

const valorTotalProduto = (
    precoUnitario: number,
    quantidade: number
  ): number => precoUnitario * quantidade;

export default function ItemCarrinho( props: ItemCarrinhoProps ){
    return (
        <tr key="1">
        <td>{props.nome}</td>
        <td>R$ {(props.valor).toFixed(2)}</td>
        <td>{props.quantidade}</td>

        <td>R$ {valorTotalProduto(props.valor, props.quantidade).toFixed(2)}</td>
        <td>
          <button className="btn btn-danger btn-sm">
            Remover
          </button>
        </td>
      </tr>
    );
}