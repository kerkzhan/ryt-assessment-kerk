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

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <>
      <SafeAreaView className="bg-slate-800" />
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider mode={"dark"}>
          <SafeAreaView className="bg-slate-800 flex-1 overflow-hidden p-2">
            <Slot />
          </SafeAreaView>
        </GluestackUIProvider>
      </QueryClientProvider>
    </>
  );
}
