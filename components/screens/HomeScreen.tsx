import React, { useEffect } from "react";
import { StatusBar, Platform, View } from "react-native";
import { Box } from "../ui/box";
import BalanceCard from "../BalanceCard";

import { Heading } from "../ui/heading";

import ActionMenu from "../ActionMenu";
import TransactionHistoryList from "../TransactionHistoryList";
import NukeAlert from "../NukeAlert";
import { Divider } from "../ui/divider";

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
        <View className="flex-1 p-2 gap-4">
          <StatusBar />
          <Heading bold size="3xl">
            Ryt Bank
          </Heading>

          <BalanceCard />

          <View>
            <Heading bold size="2xl" className="mb-4">
              Actions
            </Heading>
            <ActionMenu />
          </View>

          <View className="flex-1">
            <Heading bold size="2xl" className="mb-4">
              Recent Transactions
            </Heading>
            <TransactionHistoryList limit={5} />
          </View>
        </View>

        <Divider className="my-4 bg-white" />

        <View className="px-2 pb-2">
          <NukeAlert />
        </View>
      </Box>
    </>
  );
};
export default HomeScreen;
