import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" options={{ headerShown: true , headerTitle: 'Home'}} />
          <Stack.Screen name="index" options={{ headerShown: true , headerTitle: 'Tools for management'}}/>
          <Stack.Screen name="details/[id]" options={{ headerShown: true , headerTitle: 'Tool Details'}}/>
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
