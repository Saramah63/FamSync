import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import { AppScreen } from "@/components/app-screen";
import { Card } from "@/components/card";
import { FormField } from "@/components/form-field";
import { ActionButton } from "@/components/action-button";
import { useAppStore } from "@/store/app-store";
import { palette } from "@/constants/theme";

export default function InviteCoparentScreen() {
  const setupDraft = useAppStore((state) => state.setupDraft);
  const updateSetupDraft = useAppStore((state) => state.updateSetupDraft);
  const [partnerEmail, setPartnerEmail] = useState(setupDraft.partnerEmail);

  return (
    <AppScreen
      title="Invite co-parent"
      subtitle="Send the first invite now, or leave it blank and keep building the family calendar."
    >
      <Card>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: palette.ink,
          }}
        >
          Invite by email
        </Text>
        <FormField
          label="Email"
          value={partnerEmail}
          onChangeText={setPartnerEmail}
          placeholder="partner@example.com"
        />
        <ActionButton
          label="Next: add children"
          onPress={() => {
            updateSetupDraft({ partnerEmail });
            router.push("/(auth)/children");
          }}
        />
      </Card>
    </AppScreen>
  );
}
