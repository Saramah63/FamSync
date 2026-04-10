import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import type { Href } from "expo-router";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import AnimatedLogo from "@/components/AnimatedLogo";
import AnimatedPillButton from "@/components/AnimatedPillButton";
import { colors, shadows, spacing, typography } from "@/lib/theme";
import { durations, opacity, stagger, translate } from "@/lib/motion";

function EntranceBlock({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const progress = useSharedValue(opacity.hidden);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(opacity.visible, {
        duration: durations.medium,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [delay, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * translate.sm }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.meta}>Family dashboard</Text>

        <AnimatedLogo />

        <EntranceBlock delay={420}>
          <View style={styles.dateCard}>
            <Text style={styles.dateText}>18 Nov 2024</Text>
          </View>
        </EntranceBlock>

        <EntranceBlock delay={500}>
          <AnimatedPillButton
            title="Tasks"
            icon={<Text style={styles.actionEmoji}>✓</Text>}
            onPress={() => router.push("/(tabs)/tasks" as Href)}
          />
          <Text style={styles.actionSub}>Track daily family responsibilities</Text>
        </EntranceBlock>

        <EntranceBlock delay={500 + stagger.sm}>
          <AnimatedPillButton
            title="Message"
            icon={<Text style={styles.actionEmoji}>💬</Text>}
            onPress={() => router.push("/(tabs)/messages" as Href)}
          />
          <Text style={styles.actionSub}>Coordinate with family members</Text>
        </EntranceBlock>

        <EntranceBlock delay={500 + stagger.sm * 2}>
          <AnimatedPillButton
            title="Calendar"
            icon={<Text style={styles.actionEmoji}>📅</Text>}
            onPress={() => router.push("/(tabs)/calendar" as Href)}
          />
          <Text style={styles.actionSub}>View events by day and time</Text>
        </EntranceBlock>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  meta: {
    color: colors.textSoft,
    ...typography.caption,
    marginBottom: spacing.md,
  },
  dateCard: {
    height: 50,
    borderRadius: 26,
    borderWidth: 1.2,
    borderColor: colors.border,
    backgroundColor: colors.mintCard,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    ...shadows.soft,
  },
  dateText: {
    color: colors.text,
    ...typography.bodyMedium,
    fontSize: 15,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionSub: {
    color: colors.textSoft,
    ...typography.caption,
    marginTop: 4,
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },
});
