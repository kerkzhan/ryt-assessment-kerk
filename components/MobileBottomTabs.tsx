import React from "react";

import { Pressable } from "./ui/pressable";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Icon } from "./ui/icon";
import { Text } from "./ui/text";

const MobileBottomTabs = ({ bottomTabs, activeTab, setActiveTab }: any) => {
  return (
    <>
      <HStack className="content-center absolute bottom-0 justify-between w-full py-3 px-6 md:hidden">
        {bottomTabs.map((tab: any) => {
          return (
            <Pressable
              key={tab.label}
              disabled={tab.disabled}
              onPress={() => {
                setActiveTab(tab.label);
              }}
              //@ts-ignore
              opacity={tab.disabled ? 0.5 : 1}
            >
              <VStack className="items-center">
                <Icon
                  as={tab.icon}
                  className={`${
                    activeTab === tab.label ? "text-typography-900" : "text-typography-400"
                  }`}
                />
                <Text
                  size="xs"
                  className={`${
                    activeTab === tab.label ? "text-typography-900" : "text-typography-400"
                  }`}
                >
                  {tab.label}
                </Text>
              </VStack>
            </Pressable>
          );
        })}
      </HStack>
    </>
  );
};

export default MobileBottomTabs;
