export interface ItemCarrinhoInterface {
    id: string
    nome: string
    preco: number
    quantidade: number
}

export interface CarrinhoInterface {
    itensCarrinho: ItemCarrinhoInterface[]
}