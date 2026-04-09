import { Redirect } from "expo-router";
import { useAppStore } from "@/store/app-store";

export default function Index() {
  const { hasCompletedOnboarding, isAuthenticated } = useAppStore();

  if (!hasCompletedOnboarding || !isAuthenticated) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return <Redirect href="/(tabs)/today" />;
}
