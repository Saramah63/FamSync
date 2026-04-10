import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import type { TextStyle, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { colors, components, typography } from "@/lib/theme";
import { scale, springs } from "@/lib/motion";

type Props = {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AnimatedPillButton({
  title,
  onPress,
  icon,
  style,
  textStyle,
  disabled = false,
}: Props) {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const buttonScale = interpolate(pressed.value, [0, 1], [1, scale.pressIn]);
    const shadowOpacity = interpolate(pressed.value, [0, 1], [0.18, 0.1]);
    const translateY = interpolate(pressed.value, [0, 1], [0, 1]);

    return {
      transform: [{ scale: buttonScale }, { translateY }],
      shadowOpacity,
    };
  });

  return (
    <AnimatedPressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => {
        pressed.value = withSpring(1, springs.button);
      }}
      onPressOut={() => {
        pressed.value = withSpring(0, springs.button);
      }}
      style={[styles.button, animatedStyle, disabled && styles.disabled, style]}
    >
      {icon ? <Animated.View style={styles.iconWrap}>{icon}</Animated.View> : null}
      <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>{title}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    ...components.pillButton,
    paddingHorizontal: 20,
  },
  iconWrap: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.text,
    ...typography.bodyLg,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.55,
  },
  disabledText: {
    color: colors.textSoft,
  },
});
