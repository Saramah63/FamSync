import { StyleSheet, Text, View } from "react-native";
import { palette, spacing } from "@/constants/theme";

export function SectionTitle({
  title,
  caption,
}: {
  title: string;
  caption?: string;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: palette.ink,
  },
  caption: {
    fontSize: 13,
    color: palette.inkSoft,
    marginTop: spacing.xs / 2,
  },
});
