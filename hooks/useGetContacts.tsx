import { getContacts } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetContacts = () => {
  return useQuery({ queryKey: ["contacts"], queryFn: () => getContacts() });
};
