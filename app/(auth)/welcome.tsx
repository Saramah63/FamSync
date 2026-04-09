import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppScreen } from "@/components/app-screen";
import { ActionButton } from "@/components/action-button";
import { Card } from "@/components/card";
import { FormField } from "@/components/form-field";
import { palette, radii, spacing } from "@/constants/theme";
import { useState } from "react";
import { useAppStore } from "@/store/app-store";

export default function WelcomeScreen() {
  const signIn = useAppStore((state) => state.signIn);
  const [email, setEmail] = useState("sara@famsync.app");
  const [password, setPassword] = useState("password123");

  return (
    <AppScreen
      title="FamSync"
      subtitle="A calm, shared family schedule for pickups, hobbies, appointments, and the last-minute changes in between."
      scroll={false}
    >
      <LinearGradient
        colors={[palette.mintStrong, palette.sky]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Today</Text>
        </View>
        <Text style={styles.heroTitle}>One timeline for the whole family.</Text>
        <Text style={styles.heroCopy}>
          Clear owners, fast event entry, and strong reminders when plans change.
        </Text>
      </LinearGradient>

      <Card>
        <Text style={styles.cardTitle}>Sign in to continue</Text>
        <FormField label="Email" value={email} onChangeText={setEmail} />
        <FormField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
        />
        <View style={styles.actions}>
          <ActionButton
            label="Sign in"
            onPress={() => signIn(email)}
          />
          <ActionButton
            label="Create family"
            tone="secondary"
            onPress={() => router.push("/(auth)/create-family")}
          />
        </View>
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: palette.white,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  heroBadgeText: {
    color: palette.ink,
    fontWeight: "800",
    fontSize: 12,
  },
  heroTitle: {
    fontSize: 30,
    lineHeight: 34,
    color: palette.ink,
    fontWeight: "900",
  },
  heroCopy: {
    fontSize: 15,
    lineHeight: 22,
    color: palette.inkSoft,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: palette.ink,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
});
