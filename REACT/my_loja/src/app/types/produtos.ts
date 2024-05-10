export interface Foto {
    titulo: string
    src: string
}

export default interface ProdutoInterface {
    id: string
    fotos: Foto[]
    nome: string
    preco: string
    descricao: string
    vendido: string
    usuario_id: string
}