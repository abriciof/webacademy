import { useQuery } from "@tanstack/react-query";
import { getDetalhesProduto } from "../services/produtos";

export function useDetalhesProduto(id: string) {
    const { data, isPending, isError } = useQuery({
        queryKey: ["detalheProduto"],
        queryFn: () => getDetalhesProduto(id),
    });
    const produto = data; 
    return { produto, isPending, isError };
}