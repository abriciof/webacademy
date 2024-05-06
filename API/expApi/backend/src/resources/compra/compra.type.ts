import { Compra, ItemListaCompra } from "@prisma/client";

export type ItemCarrinhoDto = Pick<ItemListaCompra, "produtoId" | "quantidade">; 
export type CreateCompraDto = Pick<Compra, "usuarioId">;
