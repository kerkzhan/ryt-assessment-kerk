import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon, ChevronDownIcon } from "@/components/ui/icon";
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
import colors from "tailwindcss/colors";

const PayoutForm = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [inputValue, setInputValue] = useState("12345");
  const [recipientId, setRecipientId] = useState("");
  const { data } = useGetContacts();
  const { mutate: makeTransfer, isPending } = useMakeTransfer();

  const handleSubmit = () => {
    const recipient = data?.find((el) => el.id === recipientId);

    if (!recipient) {
      console.log("No such contact");
      router.replace("/payout/result?status=failed");
      return;
    }

    makeTransfer(
      {
        amount: parseFloat(inputValue),
        recipient,
      },
      {
        onSuccess: () => {
          router.replace("/payout/result?status=success");
        },
        onError: (err) => {
          router.replace(`/payout/result?status=failed&error=${err.code}&message=${err.message}`);
        },
      }
    );
  };

  return (
    <VStack className="w-full max-w-[300px] rounded-md border border-background-200 p-4">
      <FormControl isInvalid={isInvalid} size="md" isDisabled={false} isReadOnly={false} isRequired>
        <FormControlLabel>
          <FormControlLabelText>Select Recipient</FormControlLabelText>
        </FormControlLabel>
        <Select onValueChange={(val) => setRecipientId(val)}>
          <SelectTrigger variant="outline" size="lg">
            <SelectInput placeholder="Select option" />
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
                  className="h-16 "
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
        <FormControlHelper>
          <FormControlHelperText>Must be at least 6 characters.</FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>At least 6 characters are required.</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl
        isInvalid={isInvalid}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Recipient will get</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="lg">
          <InputField
            inputMode="numeric"
            type="text"
            placeholder="1.00"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
        </Input>
        <FormControlHelper>
          <FormControlHelperText>Must be at least 6 characters.</FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>Atleast 6 characters are required.</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <Button
        className="w-fit self-end mt-4  disabled:opacity-70 "
        size="sm"
        onPress={handleSubmit}
        disabled={isPending}
      >
        <HStack space="sm">
          {isPending && <Spinner size="small" color={colors.gray["500"]} />}
          <ButtonText>Submit</ButtonText>
        </HStack>
      </Button>
    </VStack>
  );
};

export default PayoutForm;
