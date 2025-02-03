import { getTransactionHistory } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionHistory = ({ limit = 0 }: { limit?: number }) => {
  return useQuery({
    queryKey: ["history", limit],
    queryFn: () => getTransactionHistory({ limit }),
  });
};
