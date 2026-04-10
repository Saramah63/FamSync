import { PropsWithChildren, ReactNode } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FamSyncMark } from "@/components/famsync-mark";

type Target =
  | "/profile"
  | "/(tabs)/today"
  | "/(tabs)/calendar"
  | "/(tabs)/tasks"
  | "/(tabs)/notifications"
  | "/(tabs)/settings";

function NavItem({
  icon,
  label,
  target,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  target?: Target;
}) {
  return (
    <Pressable style={styles.navItem} onPress={target ? () => router.push(target) : undefined}>
      <Ionicons name={icon} size={24} color="#111111" />
      <Text style={styles.navText}>{label}</Text>
    </Pressable>
  );
}

export function ReferenceShell({
  children,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  bottomCenter,
  scroll = true,
}: PropsWithChildren<{
  topLeft?: { icon: keyof typeof Ionicons.glyphMap; label: string; target?: Target };
  topRight?: { icon: keyof typeof Ionicons.glyphMap; label: string; target?: Target };
  bottomLeft?: { icon: keyof typeof Ionicons.glyphMap; label: string; target?: Target };
  bottomRight?: { icon: keyof typeof Ionicons.glyphMap; label: string; target?: Target };
  bottomCenter?: ReactNode;
  scroll?: boolean;
}>) {
  const content = (
    <View style={styles.main}>
      <View style={styles.topRow}>
        <View style={styles.sideCol}>{topLeft ? <NavItem {...topLeft} /> : null}</View>
        <View style={styles.centerCol}>
          <FamSyncMark compact />
        </View>
        <View style={styles.sideCol}>{topRight ? <NavItem {...topRight} /> : null}</View>
      </View>
      <View style={styles.divider} />
      <View style={styles.body}>{children}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {scroll ? <ScrollView contentContainerStyle={styles.scroll}>{content}</ScrollView> : content}
      <View style={styles.divider} />
      <View style={styles.bottomRow}>
        <View style={styles.sideCol}>{bottomLeft ? <NavItem {...bottomLeft} /> : null}</View>
        <View style={styles.bottomCenter}>{bottomCenter}</View>
        <View style={styles.sideCol}>{bottomRight ? <NavItem {...bottomRight} /> : null}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    paddingBottom: 8,
  },
  main: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topRow: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  bottomRow: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  sideCol: {
    width: 76,
    alignItems: "center",
  },
  centerCol: {
    flex: 1,
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 10,
    color: "#111111",
  },
  divider: {
    height: 1,
    backgroundColor: "#111111",
  },
  body: {
    flex: 1,
  },
  bottomCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
