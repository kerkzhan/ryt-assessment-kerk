import React from "react";
import { View, Text } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useGetTransactionById } from "@/hooks/useGetTransactionById";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Card } from "@/components/ui/card";
import TransactionDetails from "@/components/TransactionDetails";
import { SkeletonText } from "@/components/ui/skeleton";
import { Button, ButtonText } from "@/components/ui/button";

const TransactionDetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: transaction, isError, isLoading } = useGetTransactionById(id);

  if (isError) {
    return (
      <View>
        <Text>Failed to get transaction.</Text>
        <Link href={"/"}>
          <Text>Back to home</Text>
        </Link>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-ryt-primary px-4">
      <Card className="bg-white rounded-3xl shadow-lg mt-20 overflow-hidden ">
        <VStack className="items-center pt-12 pb-8">
          <Text className="text-2xl font-semibold text-gray-800">Transaction Details</Text>
        </VStack>

        {isLoading || !transaction ? (
          <SkeletonText _lines={5} speed={4} className="h-6 w-full" startColor="bg-gray-100" />
        ) : (
          <TransactionDetails transaction={transaction} />
        )}
      </Card>
    </View>
  );
};

export default TransactionDetailsPage;
