import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { resetDb } from "@/db/db";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { View } from "react-native";

const NukeButton = () => {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const handleClose = () => setShowAlertDialog(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    console.log("Resetting database...");
    await resetDb();
    console.log("Database resetted!");
    queryClient.resetQueries();
    setShowAlertDialog(false);
  };

  return (
    <View className="flex flex-shrink">
      <Button
        onPress={() => setShowAlertDialog(true)}
        action="negative"
        size="xl"
        className="h-16 min-w-fit"
      >
        <ButtonText>NUKE!</ButtonText>
      </Button>

      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="lg">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text bold size="2xl">
              Are you sure?
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="lg">This button will restore the app to initial state. </Text>
            <Text size="lg" className="mt-4">
              Transaction history will be cleared. Balance will be reset to MYR 9999.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button variant="outline" action="secondary" onPress={handleClose} size="lg">
              <ButtonText className="text-white">Cancel</ButtonText>
            </Button>
            <Button size="lg" onPress={handleDelete} action="negative">
              <ButtonText className="text-white">Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
};

export default NukeButton;
