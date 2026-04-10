import React, { useEffect } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { colors, radius, shadows, spacing, typography } from "@/lib/theme";
import { durations, loops, opacity, scale, translate } from "@/lib/motion";
import AnimatedPillButton from "@/components/AnimatedPillButton";

type Props = {
  visible: boolean;
  title?: string;
  message: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryPress: () => void;
  onSecondaryPress?: () => void;
  onClose: () => void;
};

const AnimatedText = Animated.createAnimatedComponent(Text);

export default function ConflictModal({
  visible,
  title = "Schedule conflict",
  message,
  primaryLabel = "New Message",
  secondaryLabel = "Add anyway",
  onPrimaryPress,
  onSecondaryPress,
  onClose,
}: Props) {
  const overlayProgress = useSharedValue(opacity.hidden);
  const cardProgress = useSharedValue(opacity.hidden);
  const bulbPulse = useSharedValue(1);

  useEffect(() => {
    if (!visible) {
      return;
    }

    overlayProgress.value = withTiming(opacity.visible, {
      duration: durations.normal,
      easing: Easing.out(Easing.cubic),
    });

    cardProgress.value = withTiming(opacity.visible, {
      duration: durations.medium,
      easing: Easing.out(Easing.cubic),
    });

    bulbPulse.value = withRepeat(
      withTiming(1.05, {
        duration: loops.idlePulseDuration,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [bulbPulse, cardProgress, overlayProgress, visible]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayProgress.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardProgress.value,
    transform: [
      { scale: 0.92 + (scale.popEnd - 0.92) * cardProgress.value },
      { translateY: (1 - cardProgress.value) * translate.md },
    ],
  }));

  const bulbStyle = useAnimatedStyle(() => ({
    opacity: 0.92 + (bulbPulse.value - 1) * 1.6,
    transform: [{ scale: bulbPulse.value }],
  }));

  const delayedTextStyle = (delay: number) =>
    useAnimatedStyle(() => {
      const start = Math.min(cardProgress.value + delay, 1);
      return {
        opacity: start,
        transform: [{ translateY: (1 - start) * 8 }],
      };
    });

  const titleStyle = delayedTextStyle(0.1);
  const messageStyle = delayedTextStyle(0.18);

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <Animated.View style={[styles.overlayShade, overlayStyle]} />

        <Animated.View style={[styles.card, cardStyle]}>
          <Animated.View style={[styles.bulbWrap, bulbStyle]}>
            <Text style={styles.bulb}>💡</Text>
          </Animated.View>

          <AnimatedText style={[styles.title, titleStyle]}>{title}</AnimatedText>
          <AnimatedText style={[styles.message, messageStyle]}>{message}</AnimatedText>

          <View style={styles.actions}>
            <AnimatedPillButton title={primaryLabel} onPress={onPrimaryPress} />
            {onSecondaryPress ? (
              <Pressable style={styles.secondaryAction} onPress={onSecondaryPress}>
                <Text style={styles.secondaryText}>{secondaryLabel}</Text>
              </Pressable>
            ) : null}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  overlayShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayDark,
  },
  card: {
    backgroundColor: colors.mintSoft,
    borderRadius: radius.lg,
    borderWidth: 1.2,
    borderColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    alignItems: "center",
    ...shadows.strong,
  },
  bulbWrap: {
    marginBottom: spacing.md,
  },
  bulb: {
    fontSize: 54,
  },
  title: {
    color: colors.text,
    ...typography.h3,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  message: {
    color: colors.text,
    ...typography.bodyLg,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  actions: {
    width: "100%",
    gap: spacing.sm,
  },
  secondaryAction: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  secondaryText: {
    color: colors.text,
    ...typography.bodyMedium,
  },
});
