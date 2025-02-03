import TransactionHistoryList from "@/components/TransactionHistoryList";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

const TransactionHistoryPage = () => {
  return (
    <Box className="flex-1 ">
      <VStack space="lg">
        <HStack space="sm" className="items-center bg-ryt-primary p-6 rounded-b-3xl">
          <Link href={"/"}>
            <Icon as={ArrowLeft} size="3xl" className="text-white" />
          </Link>
          <Heading size="2xl" className="text-white">
            Transaction History
          </Heading>
        </HStack>
        <TransactionHistoryList limit={0} />
      </VStack>
    </Box>
  );
};
export default TransactionHistoryPage;
