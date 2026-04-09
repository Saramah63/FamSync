import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import { AppScreen } from "@/components/app-screen";
import { Card } from "@/components/card";
import { FormField } from "@/components/form-field";
import { ActionButton } from "@/components/action-button";
import { useAppStore } from "@/store/app-store";
import { palette } from "@/constants/theme";

export default function CreateFamilyScreen() {
  const setupDraft = useAppStore((state) => state.setupDraft);
  const updateSetupDraft = useAppStore((state) => state.updateSetupDraft);
  const [familyName, setFamilyName] = useState(setupDraft.familyName);

  return (
    <AppScreen
      title="Create family"
      subtitle="Start with one shared home base for schedules, handoffs, and change alerts."
    >
      <Card>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: palette.ink,
          }}
        >
          Family name
        </Text>
        <FormField
          label="Name"
          value={familyName}
          onChangeText={setFamilyName}
          placeholder="Nordlund Family"
        />
        <ActionButton
          label="Next: invite co-parent"
          onPress={() => {
            updateSetupDraft({ familyName });
            router.push("/(auth)/invite-coparent");
          }}
        />
      </Card>
    </AppScreen>
  );
}
