import ItemCarrinho from "./ItemCarrinho";

export default function ListaCarrinho(){
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

                <ItemCarrinho 
                    nome="Notebook 1"
                    valor={1500.50}
                    quantidade={2}
                />

                <ItemCarrinho 
                    nome="Notebook 2"
                    valor={1999.99}
                    quantidade={4}
                />

                </tbody>
            </table>
        </div>
    );
}