import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { ReferenceShell } from "@/components/reference-shell";
import { MintPillButton, OutlinedPanel } from "@/components/reference-ui";
import { useAppStore } from "@/store/app-store";

export default function ProfileScreen() {
  const currentUserId = useAppStore((state) => state.currentUserId);
  const user = useAppStore((state) =>
    state.users.find((candidate) => candidate.id === currentUserId)
  );

  return (
    <ReferenceShell
      topLeft={{ icon: "person-circle-outline", label: "me", target: "/profile" }}
      topRight={{ icon: "home", label: "Home", target: "/(tabs)/today" }}
      bottomLeft={{ icon: "chevron-back", label: "", target: "/(tabs)/settings" }}
      bottomRight={{ icon: "notifications-outline", label: "Notification", target: "/(tabs)/notifications" }}
    >
      <View style={styles.wrap}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={64} color="#56D7EB" />
        </View>

        <OutlinedPanel style={styles.profileCard}>
          <Text style={styles.name}>{user?.name ?? "Family member"}</Text>
          <Text style={styles.email}>{user?.email ?? "No email set"}</Text>
          <View style={styles.line} />
          <Text style={styles.meta}>Role: Parent</Text>
          <Text style={styles.meta}>Notifications: enabled</Text>
          <Text style={styles.meta}>Language: English</Text>
        </OutlinedPanel>

        <MintPillButton
          label="Edit profile"
          left={<Ionicons name="create-outline" size={20} color="#111111" />}
        />
      </View>
    </ReferenceShell>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 720,
    alignItems: "center",
    paddingTop: 36,
    paddingHorizontal: 18,
    gap: 18,
  },
  avatarCircle: {
    width: 108,
    height: 108,
    borderRadius: 54,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#666666",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.14,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  profileCard: {
    width: "100%",
    padding: 18,
  },
  name: {
    fontSize: 26,
    color: "#111111",
    fontWeight: "700",
  },
  email: {
    fontSize: 15,
    color: "#555555",
    marginTop: 4,
  },
  line: {
    height: 1,
    backgroundColor: "#666666",
    marginVertical: 12,
  },
  meta: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 8,
  },
});
