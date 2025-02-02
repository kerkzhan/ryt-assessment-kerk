import { makeTransfer } from "@/api";
import { ERROR_CODES } from "@/constants/error-codes";
import { InsertTransaction } from "@/types/data";
import { ApiError } from "@/types/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as LocalAuthentication from "expo-local-authentication";

export const useMakeTransfer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertTransaction) => {
      const res = await LocalAuthentication.authenticateAsync();
      console.log("LOCALAUTH", res);

      if (!res.success) {
        throw {
          code: ERROR_CODES.UNAUTHORIZED,
          message: "Unauthorized transfer. Please authenticate with fingerprint or FaceId",
        } as ApiError;
      }
      return makeTransfer(data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["history"] }),
  });
};
