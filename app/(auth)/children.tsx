import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/components/app-screen";
import { Card } from "@/components/card";
import { FormField } from "@/components/form-field";
import { SelectChipGroup } from "@/components/select-chip-group";
import { ActionButton } from "@/components/action-button";
import { useAppStore } from "@/store/app-store";
import { palette, spacing } from "@/constants/theme";

const colorOptions = ["#FDB63F", "#4A90E2", "#F77AA3", "#55C593"];

export default function ChildrenSetupScreen() {
  const setupDraft = useAppStore((state) => state.setupDraft);
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);

  const [childOne, setChildOne] = useState(setupDraft.children[0]?.name ?? "Ella");
  const [childTwo, setChildTwo] = useState(setupDraft.children[1]?.name ?? "Leo");
  const [childOneColor, setChildOneColor] = useState(
    setupDraft.children[0]?.colorTag ?? colorOptions[0]
  );
  const [childTwoColor, setChildTwoColor] = useState(
    setupDraft.children[1]?.colorTag ?? colorOptions[1]
  );

  const childColorOptions = useMemo(
    () => colorOptions.map((value, index) => ({ label: `Tag ${index + 1}`, value })),
    []
  );

  return (
    <AppScreen
      title="Add child profiles"
      subtitle="Profiles keep the shared calendar easy to scan by child and responsibility."
    >
      <Card>
        <Text style={styles.heading}>Child one</Text>
        <FormField label="Name" value={childOne} onChangeText={setChildOne} />
        <SelectChipGroup
          value={childOneColor}
          options={childColorOptions}
          onChange={setChildOneColor}
        />
      </Card>

      <Card>
        <Text style={styles.heading}>Child two</Text>
        <FormField label="Name" value={childTwo} onChangeText={setChildTwo} />
        <SelectChipGroup
          value={childTwoColor}
          options={childColorOptions}
          onChange={setChildTwoColor}
        />
      </Card>

      <View style={styles.footer}>
        <ActionButton
          label="Finish setup"
          onPress={() => {
            completeOnboarding({
              familyName: setupDraft.familyName,
              partnerEmail: setupDraft.partnerEmail,
              children: [
                {
                  name: childOne,
                  birthYear: 2016,
                  colorTag: childOneColor,
                },
                {
                  name: childTwo,
                  birthYear: 2019,
                  colorTag: childTwoColor,
                },
              ].filter((child) => child.name.trim().length > 0),
            });
            router.replace("/(tabs)/today");
          }}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "800",
    color: palette.ink,
  },
  footer: {
    gap: spacing.sm,
  },
});
