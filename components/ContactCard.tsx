import { View } from "react-native";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { SkeletonText } from "./ui/skeleton";
import { useGetContacts } from "@/hooks/useGetContacts";

const ContactCard = () => {
  const { data, isLoading } = useGetContacts();
  return (
    <View className="bg-slate-600 rounded-lg p-4">
      <Text size="2xl" bold className="text-gray-100">
        Contacts
      </Text>
      <VStack space="sm">
        {isLoading ? (
          <SkeletonText _lines={2} speed={4} className="h-4 w-1/2" startColor="bg-gray-100" />
        ) : (
          data?.map((contact) => (
            <View key={contact.id}>
              <Text>{contact.name}</Text>
            </View>
          ))
        )}
      </VStack>
    </View>
  );
};

export default ContactCard;
