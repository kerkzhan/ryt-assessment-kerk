import { useGetTransactionHistory } from "@/hooks/useGetTransactionHistory";
import TransactionHistoryCard from "./TransactionHistoryCard";
import { VStack } from "./ui/vstack";
import { SkeletonText } from "./ui/skeleton";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { Center } from "./ui/center";
import { ScrollView } from "react-native";

const TransactionHistoryList = ({ limit }: { limit: number }) => {
  const { data: transactionHistoryData, isFetching } = useGetTransactionHistory({ limit });

  if (isFetching) {
    return (
      <VStack space="md">
        <Box className="h-20 bg-slate-700 gap-2 rounded-lg p-4">
          <Center className="w-full h-full">
            <SkeletonText
              _lines={3}
              className="h-3 rounded-md"
              startColor="bg-slate-400"
              speed={4}
            />
          </Center>
        </Box>
        <Box className="h-20 bg-slate-700 gap-2 rounded-lg p-4">
          <Center className="w-full h-full">
            <SkeletonText
              _lines={3}
              className="h-3 rounded-md"
              startColor="bg-slate-400"
              speed={4}
            />
          </Center>
        </Box>
      </VStack>
    );
  }

  if (!transactionHistoryData?.length) {
    return <Text>No transactions to show.</Text>;
  }
  return (
    <ScrollView>
      <VStack space="md">
        {transactionHistoryData?.reverse().map((trx) => (
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
