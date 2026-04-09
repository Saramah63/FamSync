import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/components/app-screen";
import { Card } from "@/components/card";
import { FormField } from "@/components/form-field";
import { SelectChipGroup } from "@/components/select-chip-group";
import { ActionButton } from "@/components/action-button";
import { palette, spacing } from "@/constants/theme";
import { EventType, ReminderSetting } from "@/types/domain";
import { useAppStore } from "@/store/app-store";

const reminderOptions: ReminderSetting[] = [10, 30, 60, 120, 1440];

export default function AddEventScreen() {
  const users = useAppStore((state) => state.users);
  const children = useAppStore((state) => state.children);
  const createEvent = useAppStore((state) => state.createEvent);
  const currentUserId = useAppStore((state) => state.currentUserId) ?? "user-1";

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("15:00");
  const [endTime, setEndTime] = useState("16:00");
  const [eventType, setEventType] = useState<EventType>("school");
  const [childId, setChildId] = useState<string>("family");
  const [assignedUserId, setAssignedUserId] = useState<string>("unassigned");
  const [reminder, setReminder] = useState<ReminderSetting>(30);

  const saveEvent = () => {
    if (!title.trim()) {
      Alert.alert("Add a title", "Every event needs a clear title.");
      return;
    }

    createEvent({
      familyId: "family-1",
      childId: childId === "family" ? null : childId,
      title: title.trim(),
      description: description.trim(),
      eventType,
      date: new Date(date).toISOString(),
      startTime,
      endTime,
      location: location.trim(),
      assignedUserId: assignedUserId === "unassigned" ? null : assignedUserId,
      createdBy: currentUserId,
      updatedBy: currentUserId,
      reminderMinutesBefore: reminder,
      recurrenceRule: null,
      status: "scheduled",
    });
    router.back();
  };

  return (
    <AppScreen
      title="Quick add"
      subtitle="Create an event in one pass: who, when, where, and who owns it."
    >
      <Card>
        <FormField
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="School concert"
        />
        <FormField
          label="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="School hall"
        />
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
        <FormField
          label="Notes"
          value={description}
          onChangeText={setDescription}
          placeholder="Anything another caregiver should know?"
          multiline
        />
      </Card>
      <View style={styles.footer}>
        <ActionButton label="Save event" onPress={saveEvent} />
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
