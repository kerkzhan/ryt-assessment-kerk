import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { Send, ArrowDownLeft, Clock } from "lucide-react-native";
import { Icon } from "./ui/icon";
import { Card } from "./ui/card";
import { Box } from "./ui/box";

const ActionMenu = () => (
  <Card variant="elevated" className="bg-slate-600 rounded-lg">
    <View className="flex-row justify-between items-center w-full px-4">
      <Link href="/payout">
        <Box className="items-center">
          <View className="bg-blue-500 rounded-full p-4 mb-2 size-16 items-center justify-center">
            <Icon as={Send} />
          </View>
          <Text className="text-lg font-medium text-white">Send</Text>
        </Box>
      </Link>

      <Link href="/payout" disabled className="disabled:opacity-50" asChild>
        <Pressable>
          <View className="items-center">
            <View className="bg-green-500 rounded-full p-4 mb-2 size-16 items-center justify-center">
              <Icon as={ArrowDownLeft} />
            </View>
            <Text className="text-lg font-medium text-white">Receive</Text>
          </View>
        </Pressable>
      </Link>

      <Link href="/payout">
        <View className="items-center">
          <View className="bg-purple-500 rounded-full p-4 mb-2 size-16 items-center justify-center">
            <Icon as={Clock} />
          </View>
          <Text className="text-lg font-medium text-white">History</Text>
        </View>
      </Link>
    </View>
  </Card>
);

export default ActionMenu;
