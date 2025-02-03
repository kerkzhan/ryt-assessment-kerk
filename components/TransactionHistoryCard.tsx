import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
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
              <Heading size="lg" className="mb-1 text-black">
                {recipient?.name}
              </Heading>
              <Text size="lg" className="text-black">
                {prettifyIsoString(date)}
              </Text>
            </VStack>

            <Heading size="xl" className="text-ryt-primary">
              MYR {amount}
            </Heading>
          </HStack>
        </Card>
      </Pressable>
    </Link>
  );
};

export default TransactionHistoryCard;
