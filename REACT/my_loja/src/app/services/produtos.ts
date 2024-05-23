import Produto from "../types/produtos";
import api from "./api";

export async function getListaProduto(): Promise<Produto[]> {
    return api.get("/produto").then((response) => response.data);
}

export async function getDetalhesProduto(id: string): Promise<Produto> {
    return api.get(`/produto/${id}`).then((response) => response.data);
}