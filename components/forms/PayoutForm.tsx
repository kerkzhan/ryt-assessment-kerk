import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { ChevronDownIcon } from "@/components/ui/icon";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "../ui/select";
import { useGetContacts } from "@/hooks/useGetContacts";
import { router } from "expo-router";
import { useMakeTransfer } from "@/hooks/useMakeTransfer";
import { Spinner } from "../ui/spinner";
import { HStack } from "../ui/hstack";
import { ERROR_CODES } from "@/constants/error-codes";
import { Toast, ToastDescription, ToastTitle, useToast } from "../ui/toast";
import { Alert, Linking, View } from "react-native";
import { Text } from "../ui/text";
import { Textarea, TextareaInput } from "../ui/textarea";
import { useGetBalance } from "@/hooks/useGetBalance";

const PayoutForm = () => {
  const { data } = useGetContacts();
  const { data: balanceData } = useGetBalance();
  const { mutate: makeTransfer, isPending } = useMakeTransfer();
  const { show } = useToast();

  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    const recipient = data?.find((el) => el.id === recipientId);

    if (!recipient) {
      Alert.alert("No Recipient.", "Please select a recipient, or try selecting another one.");
      return;
    }

    makeTransfer(
      {
        amount: parseFloat(amount),
        recipient,
        note,
      },
      {
        onSuccess: ({ transactionId }) => {
          router.replace(`/payout/result?status=success&transactionId=${transactionId}`);
        },
        onError: (err) => {
          if (err.code === ERROR_CODES.UNAUTHORIZED) {
            show({
              placement: "bottom",
              render: () => (
                <Toast action="error" variant="solid">
                  <ToastTitle>{err.code}</ToastTitle>
                  <ToastDescription>{err.message}</ToastDescription>
                </Toast>
              ),
            });
          } else if (err.code === ERROR_CODES.NO_SECURITY_ENABLED) {
            Alert.alert(
              "No Security Enabled",
              "Please set up PIN, pattern, or biometrics in your device settings before making a transfer.",
              [
                { text: "Go to Settings", onPress: () => Linking.openSettings() },
                { text: "Cancel", style: "cancel" },
              ]
            );
          } else {
            router.replace(`/payout/result?status=failed&error=${err.code}&message=${err.message}`);
          }
        },
      }
    );
  };

  return (
    <View className="flex-1  px-4">
      <VStack space="lg" className="w-full mt-4">
        <VStack space="sm">
          <Text bold className="text-ryt-primary" size="xl">
            Recipient
          </Text>
          <Select onValueChange={setRecipientId}>
            <SelectTrigger variant="outline" size="lg" className="bg-white rounded-lg border-0">
              <SelectInput placeholder="Select a recipient" className="text-black" />
              <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {data?.map((contact) => (
                  <SelectItem
                    label={contact.name}
                    key={`${contact.name}-${contact.id}`}
                    value={contact.id}
                    className="h-16"
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </VStack>

        {/* Amount Input */}
        <VStack space="sm">
          <Text bold className="text-ryt-primary" size="xl">
            Amount
          </Text>
          <Text className="text-gray-500" size="md">
            Available for transfer MYR {balanceData?.amount}
          </Text>
          <Input className="bg-white rounded-lg border-0" size="lg">
            <Text className="text-gray-500 ml-4">$</Text>
            <InputField
              inputMode="numeric"
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              className="pl-1 color-black"
            />
          </Input>
        </VStack>

        {/* Note Input */}
        <VStack space="sm">
          <Text bold className="text-ryt-primary" size="xl">
            Note (Optional)
          </Text>
          <Textarea className="bg-white rounded-lg border-0 text-black" size="lg">
            <TextareaInput
              placeholder="Add a note..."
              className="color-black"
              value={note}
              onChangeText={setNote}
            />
          </Textarea>
        </VStack>

        {/* Submit Button */}
        <Button
          className="w-full rounded-lg mt-6 bg-[#0000E6]"
          size="lg"
          onPress={handleSubmit}
          disabled={isPending}
        >
          <HStack space="sm" className="justify-center">
            {isPending && <Spinner size="small" color="white" />}
            <ButtonText className="text-lg">Send Money</ButtonText>
          </HStack>
        </Button>
      </VStack>
    </View>
  );
};

export default PayoutForm;
