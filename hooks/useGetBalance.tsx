import { getBalance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetBalance = () => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance(),
    refetchOnMount: "always",
  });
};
