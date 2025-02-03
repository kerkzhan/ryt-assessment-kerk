import React from "react";
import { View, Text } from "react-native";
import { CheckCircle, XCircle } from "lucide-react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@/types/data";
import { Card } from "../ui/card";
import { Pressable } from "../ui/pressable";
import TransactionDetails from "../TransactionDetails";
import { VStack } from "../ui/vstack";

const PayoutResultScreen = () => {
  const {
    status,
    message = "",
    transactionId = "",
  } = useLocalSearchParams<{
    status: "success" | "failed";
    message?: string;
    transactionId: string;
  }>();

  const isSuccessful = status === "success";
  const queryClient = useQueryClient();
  const verifiedTransfer = queryClient.getQueryData<Transaction>([
    "verified-transfer",
    transactionId,
  ]);

  if (!verifiedTransfer && isSuccessful) {
    router.replace("/");
    return null;
  }

  return (
    <View className="flex-1 bg-ryt-primary px-4">
      <Card className="bg-white rounded-3xl shadow-lg mt-20 overflow-hidden">
        <View className="items-center pt-12 pb-8">
          {isSuccessful ? (
            <CheckCircle size={88} color="#22C55E" />
          ) : (
            <XCircle size={88} color="#EF4444" />
          )}
          <Text className="text-2xl font-semibold mt-4 text-gray-800">
            {isSuccessful ? "Transaction Success" : "Transaction Failed"}
          </Text>
        </View>

        {isSuccessful && verifiedTransfer ? (
          <TransactionDetails transaction={verifiedTransfer} />
        ) : (
          <View className="px-6 py-8">
            <Text className="text-center text-gray-600 text-lg">
              {message || "Transaction details not found"}
            </Text>
          </View>
        )}
      </Card>
    </View>
  );
};

export default PayoutResultScreen;
