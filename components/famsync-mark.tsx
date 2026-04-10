import { StyleSheet, Text, View } from "react-native";

export function FamSyncMark({ compact = false }: { compact?: boolean }) {
  return (
    <View style={[styles.wrap, compact ? styles.wrapCompact : undefined]}>
      <View style={[styles.row, compact ? styles.rowCompact : undefined]}>
        <View style={[styles.body, styles.pink, compact ? styles.bodyCompact : undefined]}>
          <View style={[styles.head, styles.pink, compact ? styles.headCompact : undefined]} />
        </View>
        <View style={[styles.body, styles.yellowTall, compact ? styles.bodyCompactTall : undefined]}>
          <View style={[styles.head, styles.yellow, compact ? styles.headCompact : undefined]} />
        </View>
        <View style={[styles.bodySmall, styles.blue, compact ? styles.bodySmallCompact : undefined]}>
          <View style={[styles.headSmall, styles.blue, compact ? styles.headSmallCompact : undefined]} />
        </View>
        <View style={[styles.body, styles.green, compact ? styles.bodyCompact : undefined]}>
          <View style={[styles.head, styles.green, compact ? styles.headCompact : undefined]} />
        </View>
      </View>
      <Text style={[styles.title, compact ? styles.titleCompact : undefined]}>FamSync</Text>
      {!compact ? (
        <Text style={styles.subtitle}>Family Schedule Management App</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", gap: 3 },
  wrapCompact: { gap: 1 },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    height: 112,
  },
  rowCompact: {
    gap: 3,
    height: 24,
  },
  body: {
    width: 44,
    height: 72,
    borderRadius: 18,
    alignItems: "center",
  },
  bodyCompact: {
    width: 10,
    height: 16,
    borderRadius: 4,
  },
  bodyCompactTall: {
    width: 12,
    height: 20,
    borderRadius: 5,
  },
  bodySmall: {
    width: 30,
    height: 46,
    borderRadius: 15,
    alignItems: "center",
  },
  bodySmallCompact: {
    width: 7,
    height: 10,
    borderRadius: 3,
  },
  yellowTall: {
    height: 88,
    width: 52,
  },
  head: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginTop: -14,
  },
  headCompact: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: -3,
  },
  headSmall: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: -12,
  },
  headSmallCompact: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: -3,
  },
  pink: { backgroundColor: "#FF5F8B" },
  yellow: { backgroundColor: "#F6BF19" },
  blue: { backgroundColor: "#56D7EB" },
  green: { backgroundColor: "#37C99E" },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#111111",
  },
  titleCompact: {
    fontSize: 10,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 12,
    color: "#3B3B3B",
  },
});
