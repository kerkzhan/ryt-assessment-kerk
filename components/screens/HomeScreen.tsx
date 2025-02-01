import React, { useEffect } from "react";
import { StatusBar, Platform } from "react-native";
import { Plus, Home, MessageCircle, User, SlidersHorizontal } from "lucide-react-native";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import MobileBottomTabs from "../MobileBottomTabs";
import BalanceCard from "../BalanceCard";

const bottomTabs = [
  {
    icon: Home,
    label: "Home",
  },
  {
    icon: MessageCircle,
    label: "Inbox",
  },
  {
    icon: User,
    label: "Profile",
  },
];

const HomeScreen = () => {
  useEffect(() => {
    if (Platform.OS === "web") {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    }
  }, []);

  const [activeTab, setActiveTab] = React.useState("Home");

  return (
    <>
      <Box className="flex-1">
        <StatusBar />

        <Box className="flex-1">
          <BalanceCard balance={9000} />
          {/* <MobileProfilePage isActive={activeTab === "Profile"} />

          <Explorepage setActiveTab={setActiveTab} activeTab={activeTab} />

          <MobileModeChangeButton /> */}
        </Box>
        <Box className="h-[72px] items-center w-full flex md:hidden border-t border-outline-50">
          <MobileBottomTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            bottomTabs={bottomTabs}
          />
        </Box>
      </Box>
      {/* )} */}
    </>
  );
};
export default HomeScreen;
