import { prettifyIsoString } from "@/utils";
import { View } from "react-native";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { Transaction } from "@/types/data";
import { Button, ButtonText } from "./ui/button";
import { Link, router } from "expo-router";

const TransactionDetails = ({ transaction }: { transaction: Transaction }) => {
  return (
    <VStack className="px-6 py-8 bg-gray-100 rounded-lg">
      {/* Transaction ID section */}
      <VStack className="items-center mb-8">
        <Text className="text-gray-500 font-medium mb-2">Transaction ID</Text>
        <Text className="text-gray-800 font-semibold">{transaction.id}</Text>
      </VStack>

      <VStack className="bg-white p-4 rounded-xl" space="lg">
        <VStack className="items-center border-b border-gray-100 pb-4">
          <Text className="text-gray-500 font-medium mb-1">Amount</Text>
          <Text className="text-2xl text-gray-800 font-semibold">{transaction.amount}</Text>
        </VStack>

        <VStack className="space-y-4">
          <HStack>
            <View className="w-20">
              <Text className="text-gray-500 font-medium">To</Text>
            </View>
            <Text className="text-gray-800 font-semibold flex-1">{transaction.recipient.name}</Text>
          </HStack>

          <HStack>
            <View className="w-20">
              <Text className="text-gray-500 font-medium">Time</Text>
            </View>
            <Text className="text-gray-800 font-semibold flex-1">
              {prettifyIsoString(transaction.timestamp)}
            </Text>
          </HStack>

          <HStack className="items-start">
            <View className="w-20">
              <Text className="text-gray-500 font-medium">Note</Text>
            </View>
            <Text className="text-gray-800 font-semibold flex-1">{transaction.note || "-"}</Text>
          </HStack>
        </VStack>
      </VStack>

      <VStack space="lg" className="p-4">
        <Button
          size="xl"
          variant="link"
          action="secondary"
          className="rounded-lg items-center"
          onPress={() => router.back()}
        >
          <ButtonText className="text-ryt-primary font-semibold text-lg">Back</ButtonText>
        </Button>
        <Link
          href={{
            pathname: "/payout",
            params: {
              recipientId: transaction?.recipient.id,
            },
          }}
          asChild
        >
          <Button
            action="default"
            size="xl"
            className="bg-ryt-primary rounded-lg items-center"
            onPress={() => router.back()}
          >
            <Text className="text-white font-semibold text-lg">Transfer again</Text>
          </Button>
        </Link>
      </VStack>
    </VStack>
  );
};
export default TransactionDetails;
