import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { useGetContacts } from "@/hooks/useGetContacts";

export default function RecipientSelect() {
  const { data } = useGetContacts();
  return (
    <Select>
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
              className="h-16 text-red-500 "
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
