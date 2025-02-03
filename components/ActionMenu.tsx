import { View, Pressable } from "react-native";
import { Link } from "expo-router";
import { Send, ArrowDownLeft, Clock } from "lucide-react-native";
import { Icon } from "./ui/icon";
import { Card } from "./ui/card";
import { Box } from "./ui/box";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { Center } from "./ui/center";

const ActionMenu = () => (
  <Box>
    <HStack space="lg" className="w-full justify-evenly">
      <Card
        variant="elevated"
        className="bg-ryt-primary px-2 rounded-lg flex-1 justify-center items-center border shadow-md border-ryt-primary"
      >
        <Link href="/payout">
          <Center className="gap-2">
            <Icon as={Send} size="3xl" />
            <Text size="lg" className=" text-white">
              Send
            </Text>
          </Center>
        </Link>
      </Card>

      <Card
        variant="elevated"
        aria-disabled={true}
        className="bg-ryt-secondary px-2 aria-disabled:bg-gray-300 justify-center items-center rounded-lg flex-1 border shadow-md border-ryt-primary"
      >
        <Link href="/" disabled className="disabled:opacity-50 " asChild>
          <Center className=" gap-2">
            <Icon as={ArrowDownLeft} size="3xl" className="text-ryt-primary" />
            <Text size="lg" className=" text-ryt-primary">
              Receive
            </Text>
          </Center>
        </Link>
      </Card>

      <Card
        variant="filled"
        className="bg-ryt-secondary px-2 rounded-lg flex-1 justify-center items-center border shadow-md border-ryt-primary"
      >
        <Link href="/transactions">
          <Center className=" gap-2">
            <Icon as={Clock} size="3xl" className="text-ryt-primary" />
            <Text size="lg" className=" text-ryt-primary">
              History
            </Text>
          </Center>
        </Link>
      </Card>
    </HStack>
  </Box>
);

export default ActionMenu;
