import { Pressable, StyleSheet, Text, View } from "react-native";
import { palette, radii, spacing } from "@/constants/theme";

interface SelectChipGroupProps<T extends string> {
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}

export function SelectChipGroup<T extends string>({
  value,
  options,
  onChange,
}: SelectChipGroupProps<T>) {
  return (
    <View style={styles.wrap}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.chip, active ? styles.active : styles.inactive]}
          >
            <Text style={[styles.label, active ? styles.activeLabel : undefined]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  chip: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 4,
    borderWidth: 1,
  },
  active: {
    backgroundColor: palette.ink,
    borderColor: palette.ink,
  },
  inactive: {
    backgroundColor: palette.white,
    borderColor: palette.border,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: palette.ink,
  },
  activeLabel: {
    color: palette.white,
  },
});
