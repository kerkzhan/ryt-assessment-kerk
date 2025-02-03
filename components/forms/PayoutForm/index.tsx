import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { ChevronDownIcon } from "@/components/ui/icon";
import { useMemo } from "react";
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
} from "@/components/ui/select";
import { useGetContacts } from "@/hooks/useGetContacts";
import { router, useLocalSearchParams } from "expo-router";
import { useMakeTransfer } from "@/hooks/useMakeTransfer";
import { Spinner } from "@/components/ui/spinner";
import { HStack } from "@/components/ui/hstack";
import { ERROR_CODES } from "@/constants/error-codes";
import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import { Alert, Linking } from "react-native";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useGetBalance } from "@/hooks/useGetBalance";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPayoutFormSchema } from "./schema";

const PayoutForm = () => {
  const { data: contactsData } = useGetContacts();
  const { data: balanceData } = useGetBalance();
  const { mutate: makeTransfer, isPending } = useMakeTransfer();
  const { show } = useToast();
  const { recipientId = "" } = useLocalSearchParams<{ recipientId: string }>();

  const payoutFormSchema = useMemo(
    () => createPayoutFormSchema(balanceData?.amount || 0),
    [balanceData]
  );

  const { control, handleSubmit } = useForm<z.infer<typeof payoutFormSchema>>({
    resolver: zodResolver(payoutFormSchema),
    mode: "onBlur",
  });

  const onSubmit = ({ amount, recipientId, note }: z.infer<typeof payoutFormSchema>) => {
    const recipient = contactsData?.find((el) => el.id === recipientId);

    if (!recipient) {
      Alert.alert("No Recipient.", "Please select a recipient, or try selecting another one.");
      return;
    }

    makeTransfer(
      {
        amount,
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
  const initialLabel = contactsData?.find((contact) => contact.id === recipientId)?.name || "";

  return (
    <VStack space={"lg"} className="p-6">
      <Controller
        control={control}
        name="recipientId"
        defaultValue={recipientId}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <FormControl isRequired isInvalid={!!error}>
            <FormControlLabel>
              <FormControlLabelText bold className="text-ryt-primary" size="xl">
                Recipient
              </FormControlLabelText>
            </FormControlLabel>
            <Select selectedValue={value} onValueChange={onChange} initialLabel={initialLabel}>
              <SelectTrigger variant="outline" size="lg" className="bg-white rounded-lg border-0">
                <SelectInput
                  placeholder="Select a recipient"
                  className="text-black"
                  onBlur={onBlur}
                />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {contactsData?.map((contact) => (
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
            <FormControlError>
              <FormControlErrorText>{error?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <FormControl isRequired isInvalid={!!error}>
            <FormControlLabel>
              <FormControlLabelText bold className="text-ryt-primary" size="xl">
                Amount
              </FormControlLabelText>
            </FormControlLabel>
            <Input className="bg-white rounded-lg border-0" size="lg">
              <Text className="text-gray-500 ml-4">$</Text>
              <InputField
                value={value ? String(value) : ""}
                inputMode="numeric"
                placeholder="0.00"
                onChangeText={onChange}
                keyboardType="decimal-pad"
                className="pl-1 color-black"
                onBlur={onBlur}
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Available for transfer MYR {balanceData?.amount}
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorText>{error?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="note"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText bold className="text-ryt-primary" size="xl">
                Note (Optional)
              </FormControlLabelText>
            </FormControlLabel>
            <Textarea className="bg-white rounded-lg border-0 text-black" size="lg">
              <TextareaInput
                placeholder="Add a note..."
                className="color-black"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </Textarea>
          </FormControl>
        )}
      />

      <Button
        className="w-full rounded-lg mt-6 bg-ryt-primary disabled:opacity-40"
        size="lg"
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
      >
        <HStack space="sm" className="justify-center">
          {isPending && <Spinner size="small" color="white" />}
          <ButtonText className=" text-white" size="xl">
            Send
          </ButtonText>
        </HStack>
      </Button>
    </VStack>
  );
};

export default PayoutForm;
