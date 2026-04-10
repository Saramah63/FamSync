import React, { useEffect } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { colors, radius, shadows, spacing, typography } from "@/lib/theme";
import { durations, opacity, stagger, translate } from "@/lib/motion";

type Item = {
  label: string;
  icon: string;
  onPress: () => void;
};

type Props = {
  visible: boolean;
  items: Item[];
  onClose: () => void;
};

function AttachmentRow({
  item,
  index,
}: {
  item: Item;
  index: number;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      index * stagger.sm,
      withTiming(1, {
        duration: durations.normal,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [index, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 10 }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable style={styles.row} onPress={item.onPress}>
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.label}>{item.label}</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function AttachmentSheet({ visible, items, onClose }: Props) {
  const overlayProgress = useSharedValue(opacity.hidden);
  const sheetProgress = useSharedValue(opacity.hidden);

  useEffect(() => {
    if (!visible) {
      return;
    }

    overlayProgress.value = withTiming(opacity.visible, {
      duration: durations.normal,
      easing: Easing.out(Easing.cubic),
    });

    sheetProgress.value = withTiming(1, {
      duration: durations.medium,
      easing: Easing.out(Easing.cubic),
    });
  }, [overlayProgress, sheetProgress, visible]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayProgress.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    opacity: sheetProgress.value,
    transform: [{ translateY: (1 - sheetProgress.value) * 300 }],
  }));

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.container}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <Animated.View style={[styles.overlay, overlayStyle]} />

        <Animated.View style={[styles.sheet, sheetStyle]}>
          {items.map((item, index) => (
            <AttachmentRow key={item.label} item={item} index={index} />
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayDark,
  },
  sheet: {
    backgroundColor: colors.mintSoft,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
    ...shadows.strong,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  icon: {
    fontSize: 22,
    marginRight: spacing.md,
  },
  label: {
    ...typography.bodyLg,
    color: colors.text,
  },
});
