import { makeTransfer } from "@/api";
import { ERROR_CODES } from "@/constants/error-codes";
import { InsertTransaction, Transaction } from "@/types/data";
import { ApiError } from "@/types/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as LocalAuthentication from "expo-local-authentication";

export const useMakeTransfer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertTransaction) => {
      if (
        (await LocalAuthentication.getEnrolledLevelAsync()) ===
        LocalAuthentication.SecurityLevel.NONE
      ) {
        throw {
          code: ERROR_CODES.NO_SECURITY_ENABLED,
          message: "No device security enabled",
          shouldOpenSettings: true,
        } as ApiError;
      }

      const isAuthenticated = await LocalAuthentication.authenticateAsync({
        promptMessage: "Please authenticate to make a payment.",
      });

      if (!isAuthenticated.success) {
        throw {
          code: ERROR_CODES.UNAUTHORIZED,
          message: "Unauthorized transfer. Please authenticate with fingerprint or FaceId",
        } as ApiError;
      }
      return makeTransfer(data);
    },
    onSuccess: ({ transactionId, timestamp }, data) => {
      queryClient.invalidateQueries({ queryKey: ["history"] });

      const transaction = {
        ...data,
        id: transactionId,
        timestamp: timestamp,
      };

      queryClient.setQueryData<Transaction>(
        ["verified-transfer", transactionId],
        () => transaction
      );
      queryClient.setQueryData<Transaction>(["transaction", transactionId], transaction);
    },
  });
};
