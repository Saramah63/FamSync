import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { palette, radii, spacing } from "@/constants/theme";

export function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: [string, string];
}) {
  return (
    <LinearGradient colors={accent} style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    minHeight: 108,
    borderRadius: radii.lg,
    padding: spacing.md,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 13,
    color: palette.inkSoft,
    fontWeight: "700",
  },
  value: {
    fontSize: 24,
    fontWeight: "800",
    color: palette.ink,
  },
});
