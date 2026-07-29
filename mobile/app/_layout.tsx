import { Stack } from "expo-router";

import { AdventProvider } from "../state/AdventContext";

export default function RootLayout() {
  return (
    <AdventProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </AdventProvider>
  );
}
