import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function MintPanel({
  children,
  style,
}: {
  children: ReactNode;
  style?: object;
}) {
  return <View style={[styles.mintPanel, style]}>{children}</View>;
}

export function OutlinedPanel({
  children,
  style,
}: {
  children: ReactNode;
  style?: object;
}) {
  return <View style={[styles.outlinedPanel, style]}>{children}</View>;
}

export function MintPillButton({
  label,
  left,
  right,
  onPress,
  style,
}: {
  label: string;
  left?: ReactNode;
  right?: ReactNode;
  onPress?: () => void;
  style?: object;
}) {
  return (
    <Pressable style={[styles.mintPill, style]} onPress={onPress}>
      <View style={styles.side}>{left}</View>
      <Text style={styles.mintPillLabel}>{label}</Text>
      <View style={styles.side}>{right}</View>
    </Pressable>
  );
}

export function SmallPill({ label }: { label: string }) {
  return (
    <View style={styles.smallPill}>
      <Text style={styles.smallPillLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mintPanel: {
    backgroundColor: "#DDF6EC",
    borderWidth: 1,
    borderColor: "#666666",
    borderRadius: 14,
    padding: 16,
  },
  outlinedPanel: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#666666",
    borderRadius: 12,
    padding: 12,
  },
  mintPill: {
    minHeight: 52,
    backgroundColor: "#DDF6EC",
    borderWidth: 1,
    borderColor: "#666666",
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  mintPillLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#111111",
  },
  side: {
    width: 24,
    alignItems: "center",
  },
  smallPill: {
    minWidth: 76,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#666666",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.14,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  smallPillLabel: {
    fontSize: 14,
    color: "#333333",
  },
});
