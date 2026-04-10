import { Pressable, StyleSheet, Text } from "react-native";
import { colors, components, spacing, typography } from "@/lib/theme";

type Props = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton({ title, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    ...components.pillButton,
    gap: 8,
    marginTop: spacing.sm,
  },
  text: {
    color: colors.text,
    ...typography.bodyMedium,
    fontSize: 16,
    fontWeight: "600",
  },
});
