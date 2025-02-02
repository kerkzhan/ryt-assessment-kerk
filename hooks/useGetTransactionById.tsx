import { getTransactionById } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionById = (id: string) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransactionById(id),
  });
};
