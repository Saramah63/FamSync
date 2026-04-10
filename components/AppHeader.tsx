import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { colors, spacing, typography } from "@/lib/theme";

type Props = {
  title: string;
  showBack?: boolean;
};

export default function AppHeader({ title, showBack = false }: Props) {
  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.mintCard,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.2,
    borderColor: colors.border,
  },
  backText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  title: {
    color: colors.text,
    ...typography.h3,
  },
  placeholder: {
    width: 32,
    height: 32,
  },
});
