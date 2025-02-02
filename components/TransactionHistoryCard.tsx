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
        pathname: "/payout/[id]",
        params: { id: transactionId },
      }}
      asChild
    >
      <Pressable className="w-full">
        <Card size="md" variant="elevated">
          <HStack className="justify-between">
            <VStack>
              <Heading size="md" className="mb-1 text-white">
                {recipient?.name}
              </Heading>
              <Text size="sm">{prettifyIsoString(date)}</Text>
            </VStack>

            <Text bold>MYR {amount}</Text>
          </HStack>
        </Card>
      </Pressable>
    </Link>
  );
};

export default TransactionHistoryCard;
