import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ArrowLeft, Copy } from "lucide-react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useGetTransactionById } from "@/hooks/useGetTransactionById";
import { prettifyIsoString } from "@/utils";

const TransactionDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isFetching } = useGetTransactionById(id);

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
          <ArrowLeft size={24} color="#6B7280" />
          <Text className="ml-2 text-gray-600">Back</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold mt-4">Transaction Details</Text>
      </View>

      <View className="p-4 space-y-4">
        <View className="space-y-1">
          <Text className="text-sm text-gray-500">Transaction ID</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-medium text-gray-900" numberOfLines={1}>
              {data?.id}
            </Text>
          </View>
        </View>

        <View className="space-y-1">
          <Text className="text-sm text-gray-500">Amount</Text>
          <Text className="text-base font-medium text-gray-900">{data?.amount}</Text>
        </View>

        <View className="space-y-1">
          <Text className="text-sm text-gray-500">Recipient</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-medium text-gray-900" numberOfLines={1}>
              {data?.recipient.name}
            </Text>
          </View>
        </View>

        <View className="space-y-1">
          <Text className="text-sm text-gray-500">Date and Time</Text>
          <Text className="text-base font-medium text-gray-900">
            {data?.timestamp ? prettifyIsoString(data?.timestamp) : "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionDetails;
