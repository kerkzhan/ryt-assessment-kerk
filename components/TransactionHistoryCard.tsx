import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Contact } from "@/types/data";
import { prettifyIsoString } from "@/utils";
import { Link } from "expo-router";
import { Pressable } from "./ui/pressable";

type Props = {
  transactionId: string;
  recipient: Contact;
  amount: number;
  date: string;
};

const TransactionHistoryCard = ({ amount, date, recipient, transactionId }: Props) => {
  return (
    <Link
      href={{
        pathname: "/transactions/[id]",
        params: { id: transactionId },
      }}
      asChild
    >
      <Pressable className="w-full">
        <Card size="md" variant="elevated" className="bg-white shadow-lg">
          <HStack className="justify-between">
            <VStack>
              <Text bold size="xl" className="mb-1 text-black">
                {recipient?.name}
              </Text>
              <Text size="lg" className="text-black">
                {prettifyIsoString(date)}
              </Text>
            </VStack>

            <Text bold size="xl" className="text-ryt-primary">
              MYR {amount}
            </Text>
          </HStack>
        </Card>
      </Pressable>
    </Link>
  );
};

export default TransactionHistoryCard;
