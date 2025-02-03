import React, { useEffect } from "react";
import { StatusBar, Platform, View, ScrollView, ScrollViewBase } from "react-native";
import { Box } from "../ui/box";
import BalanceCard from "../BalanceCard";

import { Heading } from "../ui/heading";

import ActionMenu from "../ActionMenu";
import TransactionHistoryList from "../TransactionHistoryList";
import NukeButton from "../NukeButton";
import ResetQueryCacheButton from "../ResetQueryCacheButton";
import { Divider } from "../ui/divider";
import { VStack } from "../ui/vstack";
import { Button, ButtonText } from "../ui/button";
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
            <Heading bold size="3xl">
              Ryt Bank
            </Heading>
            <BalanceCard />
          </Box>

          <View className="p-6">
            <ActionMenu />
          </View>

          <View className="flex-1 gap-4">
            <Heading bold size="2xl" className=" text-ryt-primary px-6">
              Recent Transactions
            </Heading>
            <TransactionHistoryList limit={5} />
          </View>
        </VStack>

        <HStack className="justify-evenly bg-ryt-primary p-4" space="lg">
          <ResetQueryCacheButton />
          <NukeButton />
        </HStack>
      </Box>
    </>
  );
};
export default HomeScreen;
