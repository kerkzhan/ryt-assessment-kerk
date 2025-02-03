import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { View } from "react-native";

const ResetQueryCacheButton = () => {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const handleClose = () => setShowAlertDialog(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    console.log("Resetting query cache...");
    queryClient.resetQueries();
    console.log("Query cache resetted!");
    setShowAlertDialog(false);
  };

  return (
    <View className="flex-1">
      <Button onPress={() => setShowAlertDialog(true)} action="primary" size="xl" className="h-16">
        <ButtonText>Reset Cache</ButtonText>
      </Button>

      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="lg">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              Resetting query cache.
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="lg">
              You might notice a brief loading state on your first visit to new pages. After that,
              you won't see anymore loading states.
            </Text>
            <Text size="lg" className="mt-4">
              Try it out by navigating through the app and viewing transactions!
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button variant="outline" action="secondary" onPress={handleClose} size="lg">
              <ButtonText className="text-white">Cancel</ButtonText>
            </Button>
            <Button size="lg" onPress={handleDelete} action="negative">
              <ButtonText className="text-white">Reset</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
};

export default ResetQueryCacheButton;
