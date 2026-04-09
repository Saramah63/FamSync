import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/components/app-screen";
import { Card } from "@/components/card";
import { Pill } from "@/components/pill";
import { ActionButton } from "@/components/action-button";
import { palette, spacing } from "@/constants/theme";
import { useAppStore } from "@/store/app-store";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function SettingsScreen() {
  const users = useAppStore((state) => state.users);
  const children = useAppStore((state) => state.children);
  const familyName = useAppStore((state) => state.familyName);
  const partnerInviteEmail = useAppStore((state) => state.partnerInviteEmail);
  const signOut = useAppStore((state) => state.signOut);

  return (
    <AppScreen
      title="Family settings"
      subtitle="Family members, child profiles, and backend readiness for the Supabase handoff."
    >
      <Card>
        <Text style={styles.heading}>{familyName}</Text>
        <Text style={styles.subtle}>Co-parent invite: {partnerInviteEmail}</Text>
        <View style={styles.row}>
          <Pill
            label={isSupabaseConfigured ? "Supabase connected" : "Mock mode"}
            tint={isSupabaseConfigured ? palette.mint : palette.coralSoft}
            textColor={isSupabaseConfigured ? palette.green : palette.red}
          />
        </View>
      </Card>

      <Card>
        <Text style={styles.heading}>Adults</Text>
        {users.map((user) => (
          <Text key={user.id} style={styles.subtle}>
            • {user.name} — {user.email}
          </Text>
        ))}
        <View style={styles.row}>
          <ActionButton label="Open profile" tone="secondary" onPress={() => router.push("/profile")} />
        </View>
      </Card>

      <Card>
        <Text style={styles.heading}>Children</Text>
        {children.map((child) => (
          <View key={child.id} style={styles.childRow}>
            <View
              style={[
                styles.swatch,
                {
                  backgroundColor: child.colorTag,
                },
              ]}
            />
            <Text style={styles.subtle}>
              {child.name} • born {child.birthYear}
            </Text>
          </View>
        ))}
      </Card>

      <ActionButton label="Sign out" tone="secondary" onPress={signOut} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "800",
    color: palette.ink,
  },
  subtle: {
    color: palette.inkSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  row: {
    marginTop: spacing.xs,
  },
  childRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  swatch: {
    width: 12,
    height: 12,
    borderRadius: 999,
  },
});
