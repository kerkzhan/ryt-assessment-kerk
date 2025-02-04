import "../global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Slot } from "expo-router";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initializeDb } from "@/db/db";
import { ScrollView, StatusBar } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Fraunces: require("../assets/fonts/Fraunces-Variable.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    initializeDb();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SafeAreaView className="bg-ryt-primary flex-1 ">
      <StatusBar className="bg-ryt-primary" barStyle={"light-content"} />
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider mode={"dark"}>
          <SafeAreaView className="bg-ryt-secondary flex-1 overflow-hidden">
            <ScrollView
              contentContainerClassName="flex-1"
              showsVerticalScrollIndicator={false}
              className="flex-1"
            >
              <Slot />
            </ScrollView>
          </SafeAreaView>
        </GluestackUIProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
}
