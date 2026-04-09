import { Pressable, StyleSheet, Text } from "react-native";
import { palette, radii, spacing } from "@/constants/theme";

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  tone?: "primary" | "secondary";
}

export function ActionButton({
  label,
  onPress,
  tone = "primary",
}: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        tone === "primary" ? styles.primary : styles.secondary,
      ]}
    >
      <Text
        style={[
          styles.label,
          tone === "primary" ? styles.primaryLabel : styles.secondaryLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: palette.ink,
  },
  secondary: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
  },
  label: {
    fontSize: 15,
    fontWeight: "800",
  },
  primaryLabel: {
    color: palette.white,
  },
  secondaryLabel: {
    color: palette.ink,
  },
});
