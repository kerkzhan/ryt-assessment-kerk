import { Link } from "expo-router";
import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Icon } from "../ui/icon";
import { ArrowLeft } from "lucide-react-native";
import { Text } from "../ui/text";
import PayoutForm from "../forms/PayoutForm";

const PayoutScreen = () => {
  return (
    <>
      <Box className="flex-1 ">
        <VStack space="lg">
          <HStack space="sm" className="items-center bg-ryt-primary p-6 rounded-b-3xl">
            <Link href={"/"}>
              <Icon as={ArrowLeft} size="3xl" className="text-white" />
            </Link>
            <Text size="3xl" bold className="text-white">
              Send money
            </Text>
          </HStack>
        </VStack>
        <PayoutForm />
      </Box>
    </>
  );
};
export default PayoutScreen;
