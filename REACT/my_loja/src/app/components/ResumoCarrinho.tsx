interface ResumoCarrinhoProps{
    quantidade: number, 
    total: number
}

export default function ResumoCarrinho({quantidade, total}: ResumoCarrinhoProps){
    return (
    <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
          <p className="card-text fw-medium">Quantidade total: {quantidade}</p>
          <p className="card-text fw-medium">
            Valor total: R${(total).toFixed(2)}
          </p>
        </div>
      </div>
    );
}