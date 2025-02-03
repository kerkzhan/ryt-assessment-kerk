import { useGetTransactionHistory } from "@/hooks/useGetTransactionHistory";
import TransactionHistoryCard from "./TransactionHistoryCard";
import { VStack } from "./ui/vstack";
import { SkeletonText } from "./ui/skeleton";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { Center } from "./ui/center";
import { ScrollView } from "react-native";

const TransactionHistoryList = ({ limit = 0 }: { limit?: number }) => {
  const { data: transactionHistoryData, isLoading } = useGetTransactionHistory({ limit });

  if (isLoading) {
    return (
      <VStack space="md" className="px-6">
        <Box className="h-20 bg-white gap-2 rounded-lg p-4">
          <Center className="w-full h-full">
            <SkeletonText _lines={3} className="h-1.5 " startColor="bg-gray-100" speed={4} />
          </Center>
        </Box>
        <Box className="h-20 bg-white gap-2 rounded-lg p-4">
          <Center className="w-full h-full">
            <SkeletonText _lines={3} className="h-1.5 " startColor="bg-gray-100" speed={4} />
          </Center>
        </Box>
      </VStack>
    );
  }

  if (!transactionHistoryData?.length) {
    return (
      <Text className="px-6 text-black" size="lg">
        No transactions to show.
      </Text>
    );
  }
  return (
    <ScrollView className="px-6" showsHorizontalScrollIndicator>
      <VStack space="md">
        {transactionHistoryData?.map((trx) => (
          <TransactionHistoryCard
            key={trx.id}
            transactionId={trx.id}
            recipient={trx.recipient}
            amount={trx.amount}
            date={trx.timestamp}
          />
        ))}
      </VStack>
    </ScrollView>
  );
};
export default TransactionHistoryList;
