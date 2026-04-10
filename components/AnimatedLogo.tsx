import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { colors, shadows, spacing, typography } from "@/lib/theme";
import { durations, opacity, scale, stagger, translate } from "@/lib/motion";

type Props = {
  showSubtitle?: boolean;
};

type ShapeProps = {
  color: string;
  delay: number;
  height: number;
  width: number;
};

const shapes = [
  { color: colors.pink, height: 64, width: 34 },
  { color: colors.yellow, height: 86, width: 34 },
  { color: colors.cyan, height: 54, width: 34 },
  { color: colors.mintStrong, height: 64, width: 34 },
];

const AnimatedText = Animated.createAnimatedComponent(Text);

function LogoShape({ color, delay, height, width }: ShapeProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, {
        duration: durations.medium,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [delay, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: (1 - progress.value) * translate.lg },
      { scale: scale.subtleStart + (scale.subtleEnd - scale.subtleStart) * progress.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.shape,
        animatedStyle,
        {
          backgroundColor: color,
          height,
          width,
        },
      ]}
    />
  );
}

function FadingText({
  children,
  delay,
  style,
  withLift = false,
}: {
  children: React.ReactNode;
  delay: number;
  style?: object;
  withLift?: boolean;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, {
        duration: durations.medium,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [delay, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: withLift ? [{ translateY: (1 - progress.value) * 10 }] : undefined,
  }));

  return <AnimatedText style={[style, animatedStyle]}>{children}</AnimatedText>;
}

export default function AnimatedLogo({ showSubtitle = true }: Props) {
  const dividerProgress = useSharedValue(opacity.hidden);

  useEffect(() => {
    dividerProgress.value = withDelay(
      500,
      withTiming(opacity.visible, {
        duration: durations.slow,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [dividerProgress]);

  const dividerStyle = useAnimatedStyle(() => ({
    opacity: dividerProgress.value,
    transform: [{ scaleX: dividerProgress.value }],
  }));

  return (
    <View style={styles.wrapper}>
      <View style={styles.logoRow}>
        {shapes.map((shape, index) => (
          <LogoShape
            key={`${shape.color}-${index}`}
            color={shape.color}
            delay={index * stagger.sm}
            height={shape.height}
            width={shape.width}
          />
        ))}
      </View>

      <FadingText delay={320} style={styles.brand} withLift>
        FamSync
      </FadingText>

      {showSubtitle ? (
        <FadingText delay={420} style={styles.subtitle}>
          Family Schedule Management App
        </FadingText>
      ) : null}

      <Animated.View style={[styles.rainbowWrap, dividerStyle]}>
        <View style={[styles.rainbowStripe, { backgroundColor: colors.pink }]} />
        <View style={[styles.rainbowStripe, { backgroundColor: colors.yellow }]} />
        <View style={[styles.rainbowStripe, { backgroundColor: colors.cyan }]} />
        <View style={[styles.rainbowStripe, { backgroundColor: colors.mintStrong }]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    shadowColor: shadows.medium.shadowColor,
    shadowOpacity: shadows.medium.shadowOpacity,
    shadowRadius: shadows.medium.shadowRadius,
    shadowOffset: shadows.medium.shadowOffset,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    marginBottom: spacing.md,
  },
  shape: {
    borderRadius: 18,
  },
  brand: {
    color: colors.text,
    ...typography.h1,
    fontSize: 34,
    marginBottom: 2,
  },
  subtitle: {
    color: colors.textSoft,
    ...typography.caption,
    marginBottom: spacing.md,
    textTransform: "none",
  },
  rainbowWrap: {
    width: "100%",
    maxWidth: 340,
    overflow: "hidden",
    borderRadius: 999,
    transformOrigin: "left center",
  },
  rainbowStripe: {
    height: 3,
    width: "100%",
    marginBottom: 1,
  },
});
