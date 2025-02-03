import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { Box } from "../ui/box";
import BalanceCard from "../BalanceCard";
import { Text } from "../ui/text";

import ActionMenu from "../ActionMenu";
import TransactionHistoryList from "../TransactionHistoryList";
import NukeButton from "../NukeButton";
import ResetQueryCacheButton from "../ResetQueryCacheButton";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";

const HomeScreen = () => {
  useEffect(() => {
    if (Platform.OS === "web") {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    }
  }, []);

  return (
    <>
      <Box className="flex-1">
        <VStack space="md" className="flex-1 ">
          <Box className="bg-ryt-primary rounded-b-3xl p-6 gap-4">
            <Text size="4xl" role="heading" className={"font-fraunces"}>
              Ryt Bank
            </Text>
            <BalanceCard />
          </Box>

          <View className="p-6">
            <ActionMenu />
          </View>

          <View className="flex-1 gap-4">
            <Text bold size="3xl" className=" text-ryt-primary px-6">
              Recent Transactions
            </Text>
            <TransactionHistoryList limit={5} />
          </View>
        </VStack>

        <HStack className="justify-evenly bg-ryt-primary p-4 " space="lg">
          <ResetQueryCacheButton />
          <NukeButton />
        </HStack>
      </Box>
    </>
  );
};
export default HomeScreen;
