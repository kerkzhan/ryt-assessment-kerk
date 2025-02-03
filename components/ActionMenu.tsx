import { View, Pressable } from "react-native";
import { Link } from "expo-router";
import { Send, ArrowDownLeft, Clock } from "lucide-react-native";
import { Icon } from "./ui/icon";
import { Card } from "./ui/card";
import { Box } from "./ui/box";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";

const ActionMenu = () => (
  <Box>
    <HStack space="lg" className="w-full  justify-evenly">
      <Card
        variant="elevated"
        className="bg-ryt-primary rounded-lg flex-1 justify-center items-center border shadow-md border-ryt-primary"
      >
        <Link href="/payout">
          <Box className="items-center">
            <View className=" size-16 items-center justify-center">
              <Icon as={Send} size="3xl" />
            </View>
            <Text size="xl" className=" text-white">
              Send
            </Text>
          </Box>
        </Link>
      </Card>

      <Card
        variant="elevated"
        aria-disabled={true}
        className="bg-ryt-secondary aria-disabled:bg-gray-300 rounded-lg flex-1 border shadow-md border-ryt-primary"
      >
        <Link href="/payout" disabled className="disabled:opacity-50 " asChild>
          <Pressable>
            <View className="items-center">
              <View className=" size-16 text-ryt-primary items-center justify-center">
                <Icon as={ArrowDownLeft} size="3xl" className="text-ryt-primary" />
              </View>
              <Text size="xl" className=" text-ryt-primary">
                Receive
              </Text>
            </View>
          </Pressable>
        </Link>
      </Card>

      <Card
        variant="filled"
        className="bg-ryt-secondary rounded-lg flex-1 justify-center items-center border shadow-md border-ryt-primary"
      >
        <Link href="/transactions">
          <View className="items-center">
            <View className=" size-16 text-ryt-primary items-center justify-center">
              <Icon as={Clock} size="3xl" className="text-ryt-primary" />
            </View>
            <Text size="xl" className=" text-ryt-primary">
              History
            </Text>
          </View>
        </Link>
      </Card>
    </HStack>
  </Box>
);

export default ActionMenu;
