import { Link } from "expo-router";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import PayoutForm from "../forms/PayoutForm";

const PayoutScreen = () => {
  return (
    <>
      <Box className="flex-1">
        <Link href="/">
          <Text>Home</Text>
        </Link>

        <PayoutForm />
      </Box>
    </>
  );
};
export default PayoutScreen;
