import React from "react";
import { View } from "react-native";
import { Button, ButtonText } from "./ui/button";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";

interface BalanceCardProps {
  balance: number;
  savedAmount?: number;
}

const BalanceCard = ({ balance, savedAmount }: BalanceCardProps) => {
  return (
    <View className="bg-slate-600 rounded-lg p-4">
      <VStack space="sm">
        <Text size="lg" className="text-gray-100">
          Total Balance (MYR)
        </Text>

        <Text size="4xl" bold className="text-white">
          {new Intl.NumberFormat(undefined, {
            style: "decimal",
          }).format(balance)}
        </Text>

        {savedAmount && (
          <HStack className="items-center space-x-1">
            <Text className="text-gray-400">You save</Text>
            <Text className="text-green-500">$ {savedAmount.toLocaleString()}</Text>
            <Text className="text-gray-400">This month</Text>
          </HStack>
        )}
      </VStack>
    </View>
  );
};

export default BalanceCard;
