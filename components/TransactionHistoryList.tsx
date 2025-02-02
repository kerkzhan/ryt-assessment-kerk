import { useGetTransactionHistory } from "@/hooks/useGetTransactionHistory";
import TransactionHistoryCard from "./TransactionHistoryCard";

import { VStack } from "./ui/vstack";
import { Skeleton, SkeletonText } from "./ui/skeleton";
import { View } from "./ui/view";
import { Box } from "./ui/box";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { Center } from "./ui/center";

const TransactionHistoryList = () => {
  const { data: transactionHistoryData, isFetching } = useGetTransactionHistory({ limit: 5 });

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
  );
};
export default TransactionHistoryList;
