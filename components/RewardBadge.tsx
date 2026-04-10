import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { colors, shadows } from "@/lib/theme";
import { loops, scale, springs } from "@/lib/motion";

type Props = {
  type?: "star" | "trophy";
  value?: number;
};

export default function RewardBadge({ type = "star", value }: Props) {
  const icon = type === "trophy" ? "🏆" : "⭐";
  const pop = useSharedValue(scale.popStart);
  const pulse = useSharedValue(1);

  useEffect(() => {
    pop.value = withSpring(scale.popEnd, springs.pop);
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.08, {
          duration: loops.glowPulseDuration,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(1, {
          duration: loops.glowPulseDuration,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      false,
    );
  }, [pop, pulse]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: 0.3 + pop.value * 0.7,
    transform: [{ scale: pop.value }],
  }));

  const innerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.inner, innerStyle]}>
        <Text style={styles.icon}>{icon}</Text>
        {value ? <Text style={styles.value}>{value}</Text> : null}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.strong,
  },
  inner: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 30,
  },
  value: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
});
