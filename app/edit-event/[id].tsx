import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/components/app-screen";
import { Card } from "@/components/card";
import { FormField } from "@/components/form-field";
import { SelectChipGroup } from "@/components/select-chip-group";
import { ActionButton } from "@/components/action-button";
import { EventType, ReminderSetting } from "@/types/domain";
import { useAppStore } from "@/store/app-store";
import { palette, spacing } from "@/constants/theme";

const reminderOptions: ReminderSetting[] = [10, 30, 60, 120, 1440];

export default function EditEventScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const users = useAppStore((state) => state.users);
  const children = useAppStore((state) => state.children);
  const event = useAppStore((state) =>
    state.events.find((candidate) => candidate.id === params.id)
  );
  const updateEvent = useAppStore((state) => state.updateEvent);

  const initialDate = useMemo(
    () => (event ? new Date(event.date).toISOString().slice(0, 10) : ""),
    [event]
  );

  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [date, setDate] = useState(initialDate);
  const [startTime, setStartTime] = useState(event?.startTime ?? "15:00");
  const [endTime, setEndTime] = useState(event?.endTime ?? "16:00");
  const [eventType, setEventType] = useState<EventType>(event?.eventType ?? "school");
  const [childId, setChildId] = useState<string>(event?.childId ?? "family");
  const [assignedUserId, setAssignedUserId] = useState<string>(
    event?.assignedUserId ?? "unassigned"
  );
  const [reminder, setReminder] = useState<ReminderSetting>(
    event?.reminderMinutesBefore ?? 30
  );

  if (!event) {
    return (
      <AppScreen title="Edit event" subtitle="This event could not be found.">
        <Card>
          <Text style={{ color: palette.inkSoft, fontSize: 15 }}>
            The selected event no longer exists.
          </Text>
        </Card>
      </AppScreen>
    );
  }

  const saveEvent = () => {
    if (!title.trim()) {
      Alert.alert("Add a title", "Every event needs a clear title.");
      return;
    }

    updateEvent(event.id, {
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      date: new Date(date).toISOString(),
      startTime,
      endTime,
      eventType,
      childId: childId === "family" ? null : childId,
      assignedUserId: assignedUserId === "unassigned" ? null : assignedUserId,
      reminderMinutesBefore: reminder,
    });

    router.back();
  };

  return (
    <AppScreen
      title="Edit event"
      subtitle="Keep changes obvious so every adult knows what changed and who owns the update."
    >
      <Card>
        <FormField label="Title" value={title} onChangeText={setTitle} />
        <FormField label="Location" value={location} onChangeText={setLocation} />
        <View style={styles.row}>
          <View style={styles.flex}>
            <FormField label="Date" value={date} onChangeText={setDate} />
          </View>
          <View style={styles.flex}>
            <FormField label="Start" value={startTime} onChangeText={setStartTime} />
          </View>
          <View style={styles.flex}>
            <FormField label="End" value={endTime} onChangeText={setEndTime} />
          </View>
        </View>
        <Text style={styles.label}>Event type</Text>
        <SelectChipGroup
          value={eventType}
          options={[
            { label: "School", value: "school" },
            { label: "Hobby", value: "hobby" },
            { label: "Doctor", value: "doctor" },
            { label: "Family", value: "family" },
            { label: "Task", value: "task" },
          ]}
          onChange={setEventType}
        />
        <Text style={styles.label}>Child / timeline</Text>
        <SelectChipGroup
          value={childId}
          options={[
            { label: "Whole family", value: "family" },
            ...children.map((child) => ({ label: child.name, value: child.id })),
          ]}
          onChange={setChildId}
        />
        <Text style={styles.label}>Assigned adult</Text>
        <SelectChipGroup
          value={assignedUserId}
          options={[
            { label: "Unassigned", value: "unassigned" },
            ...users.map((user) => ({ label: user.name, value: user.id })),
          ]}
          onChange={setAssignedUserId}
        />
        <Text style={styles.label}>Reminder</Text>
        <SelectChipGroup
          value={String(reminder)}
          options={reminderOptions.map((option) => ({
            label: option === 1440 ? "1 day" : `${option} min`,
            value: String(option),
          }))}
          onChange={(value) => setReminder(Number(value) as ReminderSetting)}
        />
        <FormField label="Notes" value={description} onChangeText={setDescription} multiline />
      </Card>
      <View style={styles.footer}>
        <ActionButton label="Save changes" onPress={saveEvent} />
        <ActionButton label="Cancel" tone="secondary" onPress={() => router.back()} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  flex: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: palette.ink,
    marginTop: spacing.xs,
  },
  footer: {
    gap: spacing.sm,
  },
});
