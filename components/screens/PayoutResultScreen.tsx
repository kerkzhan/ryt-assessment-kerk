import React from "react";
import { View, Text } from "react-native";
import { CheckCircle, XCircle } from "lucide-react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { VStack } from "../ui/vstack";
import { useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@/types/data";
import { Card } from "../ui/card";
import { prettifyIsoString } from "@/utils";
import { Button, ButtonText } from "../ui/button";
import { Pressable } from "../ui/pressable";

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

  if (!verifiedTransfer) {
    router.replace("/");
    return null;
  }

  return (
    <View className="flex-1 bg-[#0000E6] px-4">
      <Card className="bg-white rounded-3xl shadow-lg mt-20  overflow-hidden">
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

        {isSuccessful && (
          <View className="px-6 py-8 bg-gray-100">
            <View className="items-center mb-8">
              <Text className="text-gray-500 font-medium mb-2">Transaction ID</Text>
              <Text className="text-gray-800 font-semibold">{verifiedTransfer.id}</Text>
            </View>

            <View className="bg-white p-4 rounded-xl space-y-5">
              {/* Amount with bigger emphasis */}
              <View className="items-center border-b border-gray-100 pb-4">
                <Text className="text-gray-500 font-medium mb-1">Amount</Text>
                <Text className="text-2xl text-gray-800 font-semibold">
                  MYR {verifiedTransfer.amount}
                </Text>
              </View>

              <View className="space-y-4 p-2">
                <View className="flex-row items-center">
                  <View className="w-20">
                    <Text className="text-gray-500 font-medium">To</Text>
                  </View>
                  <Text className="text-gray-800 font-semibold flex-1">
                    {verifiedTransfer.recipient.name}
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <View className="w-20">
                    <Text className="text-gray-500 font-medium">Time</Text>
                  </View>
                  <Text className="text-gray-800 font-semibold">
                    {prettifyIsoString(verifiedTransfer.timestamp)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {!isSuccessful && (
          <View className="px-6 py-8">
            <Text className="text-center text-gray-600 text-lg">{message}</Text>
          </View>
        )}

        <View className="p-6">
          <Link href="/" className="bg-[#0000E6] py-4 rounded-2xl items-center" asChild>
            <Pressable>
              <Text className="text-white font-semibold text-lg">Back to Home</Text>
            </Pressable>
          </Link>
        </View>
      </Card>
    </View>
  );
};

export default PayoutResultScreen;
