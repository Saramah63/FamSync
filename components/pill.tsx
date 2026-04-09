import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { palette, radii, spacing } from "@/constants/theme";

interface PillProps {
  label: string;
  tint?: string;
  textColor?: string;
  left?: ReactNode;
}

export function Pill({
  label,
  tint = palette.mint,
  textColor = palette.ink,
  left,
}: PillProps) {
  return (
    <View style={[styles.pill, { backgroundColor: tint }]}>
      {left}
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
  },
});
