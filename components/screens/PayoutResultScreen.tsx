import React from "react";
import { View, Text } from "react-native";
import { CheckCircle, XCircle } from "lucide-react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { VStack } from "../ui/vstack";

const PayoutResultScreen = () => {
  const {
    status,
    error = "",
    message = "",
  } = useLocalSearchParams<{
    status: "success" | "failed";
    message: string;
    error: string;
  }>();
  const isSuccessful = status === "success";
  console.log(error);
  console.log(message);
  return (
    <View className="flex-1 bg-white justify-center items-center p-6 gap-4">
      {isSuccessful ? (
        <CheckCircle size={80} color="#22C55E" />
      ) : (
        <XCircle size={80} color="#EF4444" />
      )}

      <Text className="text-xl  font-semibold my-2">
        {isSuccessful ? "Transaction Success" : "Transaction Failed"}
      </Text>
      {!isSuccessful && <Text className="text-center">{message}</Text>}

      <Link className="bg-blue-500 px-8 py-3 rounded-lg" href={"/"}>
        <Text className="text-white font-medium">Back to Home</Text>
      </Link>
    </View>
  );
};

export default PayoutResultScreen;
