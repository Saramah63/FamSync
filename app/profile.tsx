import { AppScreen } from "@/components/app-screen";
import { Card } from "@/components/card";
import { useAppStore } from "@/store/app-store";
import { Text } from "react-native";
import { palette } from "@/constants/theme";

export default function ProfileScreen() {
  const currentUserId = useAppStore((state) => state.currentUserId);
  const user = useAppStore((state) =>
    state.users.find((candidate) => candidate.id === currentUserId)
  );

  return (
    <AppScreen
      title="Profile"
      subtitle="The signed-in adult profile that owns invites, assignments, and notification preferences."
    >
      <Card>
        <Text style={{ fontSize: 22, fontWeight: "800", color: palette.ink }}>
          {user?.name ?? "Family member"}
        </Text>
        <Text style={{ fontSize: 15, color: palette.inkSoft }}>{user?.email}</Text>
      </Card>
    </AppScreen>
  );
}
