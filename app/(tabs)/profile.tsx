import { StyleSheet, Text, View } from "react-native";
import { colors, components, radius, shadows, spacing, typography } from "@/lib/theme";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.heroSpacer} />
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.text}>
          Family settings, members, and preferences will appear here.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Family</Text>
          <Text style={styles.infoText}>Parents, co-parents, and caregivers can stay aligned here.</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Preferences</Text>
          <Text style={styles.infoText}>Notifications, reminders, and shared schedule defaults will live here.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  heroSpacer: {
    height: 40,
  },
  card: {
    ...components.outlinedCard,
    padding: spacing.md,
    paddingTop: 54,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.cyan,
    alignSelf: "center",
    marginTop: -94,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.strong,
  },
  avatarText: {
    fontSize: 34,
  },
  title: {
    color: colors.text,
    ...typography.h2,
    marginBottom: 8,
    textAlign: "center",
  },
  text: {
    ...typography.body,
    lineHeight: 20,
    color: colors.textSoft,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1.2,
    borderColor: colors.borderSoft,
    padding: spacing.lg,
    marginTop: spacing.sm,
    ...shadows.soft,
  },
  infoTitle: {
    color: colors.text,
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  infoText: {
    color: colors.textSoft,
    ...typography.body,
  },
});
