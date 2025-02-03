import { getTransactionHistory } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionHistory = ({ limit }: { limit: number }) => {
  return useQuery({
    queryKey: ["history", limit],
    queryFn: () => getTransactionHistory({ limit }),
    select: (data) => {
      const sortedByLatestHistory = [...data].sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
      return sortedByLatestHistory;
    },
  });
};
