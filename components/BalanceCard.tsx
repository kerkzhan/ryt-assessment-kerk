import { View } from "react-native";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { useGetBalance } from "@/hooks/useGetBalance";
import { SkeletonText } from "./ui/skeleton";

const BalanceCard = () => {
  const { data, isLoading } = useGetBalance();
  return (
    <View>
      <VStack space="sm">
        <Text size="lg" className="text-white">
          Total Balance (MYR)
        </Text>

        {isLoading || !data?.amount ? (
          <SkeletonText _lines={2} speed={4} className="h-4 w-1/2" startColor="bg-gray-100" />
        ) : (
          <Text size="4xl" bold className="text-white">
            {new Intl.NumberFormat(undefined, {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(data.amount)}
          </Text>
        )}
      </VStack>
    </View>
  );
};

export default BalanceCard;
