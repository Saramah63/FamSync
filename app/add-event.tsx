import React, { useMemo, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import AppHeader from "@/components/AppHeader";
import AnimatedPillButton from "@/components/AnimatedPillButton";
import ConflictModal from "@/components/ConflictModal";
import { useEventStore } from "@/lib/event-store";
import { colors, radius, shadows, spacing, typography } from "@/lib/theme";
import type { FamEvent } from "@/lib/event-store";

const repeatOptions = ["Never", "Daily", "Weekly", "Monthly"];
const reminderOptions = [
  "None",
  "At time of event",
  "5 min before",
  "15 min before",
  "1 hour before",
];

type PickerTarget = "startsDate" | "startsTime" | "endsDate" | "endsTime" | null;

export default function AddEventScreen() {
  const addEvent = useEventStore((state) => state.addEvent);
  const events = useEventStore((state) => state.events);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [shareWith, setShareWith] = useState("Members' name");

  const [startsAt, setStartsAt] = useState(new Date(2024, 10, 18, 12, 30));
  const [endsAt, setEndsAt] = useState(new Date(2024, 10, 18, 13, 30));

  const [repeat, setRepeat] = useState("Never");
  const [reminder, setReminder] = useState("None");
  const [extraReminder, setExtraReminder] = useState("None");

  const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null);
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showExtraReminderModal, setShowExtraReminderModal] = useState(false);
  const [showConflict, setShowConflict] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<FamEvent | null>(null);

  const startsDateLabel = useMemo(() => formatDate(startsAt), [startsAt]);
  const startsTimeLabel = useMemo(() => formatTime(startsAt), [startsAt]);
  const endsDateLabel = useMemo(() => formatDate(endsAt), [endsAt]);
  const endsTimeLabel = useMemo(() => formatTime(endsAt), [endsAt]);

  const pickerValue = useMemo(() => {
    switch (pickerTarget) {
      case "startsDate":
      case "startsTime":
        return startsAt;
      case "endsDate":
      case "endsTime":
        return endsAt;
      default:
        return new Date();
    }
  }, [pickerTarget, startsAt, endsAt]);

  const pickerMode = useMemo<"date" | "time">(() => {
    if (pickerTarget === "startsTime" || pickerTarget === "endsTime") {
      return "time";
    }

    return "date";
  }, [pickerTarget]);

  function handleDateTimeChange(event: DateTimePickerEvent, selectedDate?: Date) {
    if (event.type === "dismissed") {
      setPickerTarget(null);
      return;
    }

    if (!selectedDate || !pickerTarget) {
      setPickerTarget(null);
      return;
    }

    if (pickerTarget === "startsDate") {
      const updated = mergeDate(startsAt, selectedDate);
      setStartsAt(updated);
      if (updated > endsAt) {
        setEndsAt(addMinutes(updated, 60));
      }
    }

    if (pickerTarget === "startsTime") {
      const updated = mergeTime(startsAt, selectedDate);
      setStartsAt(updated);
      if (updated > endsAt) {
        setEndsAt(addMinutes(updated, 60));
      }
    }

    if (pickerTarget === "endsDate") {
      const updated = mergeDate(endsAt, selectedDate);
      setEndsAt(updated);
    }

    if (pickerTarget === "endsTime") {
      const updated = mergeTime(endsAt, selectedDate);
      setEndsAt(updated);
    }

    setPickerTarget(null);
  }

  function buildPayload(): FamEvent {
    return {
      id: Date.now().toString(),
      title: title.trim(),
      location: location.trim(),
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
      repeat,
      reminder,
      extraReminder,
      notes: notes.trim(),
      shareWith: shareWith.trim(),
    };
  }

  function hasConflict(candidate: FamEvent) {
    const candidateStart = new Date(candidate.startsAt).getTime();
    const candidateEnd = new Date(candidate.endsAt).getTime();

    return events.some((event) => {
      const existingStart = new Date(event.startsAt).getTime();
      const existingEnd = new Date(event.endsAt).getTime();
      return candidateStart < existingEnd && candidateEnd > existingStart;
    });
  }

  async function persistEvent(payload: FamEvent) {
    await addEvent(payload);

    Alert.alert("Saved", "Your event/task has been created.", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  }

  async function validateAndSave(skipConflictCheck = false) {
    if (!title.trim()) {
      Alert.alert("Missing title", "Please enter a title for the event or task.");
      return;
    }

    if (endsAt <= startsAt) {
      Alert.alert("Invalid time", "End time must be later than start time.");
      return;
    }

    const payload = buildPayload();

    if (!skipConflictCheck && hasConflict(payload)) {
      setPendingEvent(payload);
      setShowConflict(true);
      return;
    }

    await persistEvent(payload);
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <AppHeader title="New event/task" showBack />

        <View style={styles.formCard}>
          <FormField label="Title">
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter title"
              placeholderTextColor={colors.textMuted}
            />
          </FormField>

          <FormField label="Location">
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter location"
              placeholderTextColor={colors.textMuted}
            />
          </FormField>

          <FormField label="Starts">
            <View style={styles.row}>
              <Pressable style={styles.pill} onPress={() => setPickerTarget("startsDate")}>
                <Text style={styles.pillText}>{startsDateLabel}</Text>
              </Pressable>

              <Pressable style={styles.pillSmall} onPress={() => setPickerTarget("startsTime")}>
                <Text style={styles.pillText}>{startsTimeLabel}</Text>
              </Pressable>
            </View>
          </FormField>

          <FormField label="Ends">
            <View style={styles.row}>
              <Pressable style={styles.pill} onPress={() => setPickerTarget("endsDate")}>
                <Text style={styles.pillText}>{endsDateLabel}</Text>
              </Pressable>

              <Pressable style={styles.pillSmall} onPress={() => setPickerTarget("endsTime")}>
                <Text style={styles.pillText}>{endsTimeLabel}</Text>
              </Pressable>
            </View>
          </FormField>

          <FormField label="Repeat">
            <Pressable style={styles.selector} onPress={() => setShowRepeatModal(true)}>
              <Text style={styles.selectorText}>{repeat}</Text>
            </Pressable>
          </FormField>

          <FormField label="Reminder">
            <Pressable style={styles.selector} onPress={() => setShowReminderModal(true)}>
              <Text style={styles.selectorText}>{reminder}</Text>
            </Pressable>
          </FormField>

          <FormField label="Add another reminder">
            <Pressable style={styles.selector} onPress={() => setShowExtraReminderModal(true)}>
              <Text style={styles.selectorText}>{extraReminder}</Text>
            </Pressable>
          </FormField>

          <FormField label="Notes">
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="Write notes..."
              placeholderTextColor={colors.textMuted}
              multiline
              textAlignVertical="top"
            />
          </FormField>

          <FormField label="Share with">
            <TextInput
              style={styles.input}
              value={shareWith}
              onChangeText={setShareWith}
              placeholder="Members' name"
              placeholderTextColor={colors.textMuted}
            />
          </FormField>
        </View>

        <AnimatedPillButton title="Add event/task" onPress={() => void validateAndSave()} />
      </ScrollView>

      {pickerTarget && (
        <DateTimePicker
          value={pickerValue}
          mode={pickerMode}
          display="default"
          onChange={handleDateTimeChange}
        />
      )}

      <OptionModal
        visible={showRepeatModal}
        title="Repeat"
        options={repeatOptions}
        selected={repeat}
        onClose={() => setShowRepeatModal(false)}
        onSelect={(value) => {
          setRepeat(value);
          setShowRepeatModal(false);
        }}
      />

      <OptionModal
        visible={showReminderModal}
        title="Reminder"
        options={reminderOptions}
        selected={reminder}
        onClose={() => setShowReminderModal(false)}
        onSelect={(value) => {
          setReminder(value);
          setShowReminderModal(false);
        }}
      />

      <OptionModal
        visible={showExtraReminderModal}
        title="Another reminder"
        options={reminderOptions}
        selected={extraReminder}
        onClose={() => setShowExtraReminderModal(false)}
        onSelect={(value) => {
          setExtraReminder(value);
          setShowExtraReminderModal(false);
        }}
      />

      <ConflictModal
        visible={showConflict}
        title="There is a scheduling conflict!"
        message="Do you want to reschedule or send a quick message to coordinate first?"
        primaryLabel="New Message"
        secondaryLabel="Add anyway"
        onPrimaryPress={() => {
          setShowConflict(false);
          setPendingEvent(null);
          router.push("/(tabs)/messages");
        }}
        onSecondaryPress={() => {
          if (!pendingEvent) {
            setShowConflict(false);
            return;
          }

          const payload = pendingEvent;
          setShowConflict(false);
          setPendingEvent(null);
          void persistEvent(payload);
        }}
        onClose={() => {
          setShowConflict(false);
          setPendingEvent(null);
        }}
      />
    </View>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

function OptionModal({
  visible,
  title,
  options,
  selected,
  onClose,
  onSelect,
}: {
  visible: boolean;
  title: string;
  options: string[];
  selected: string;
  onClose: () => void;
  onSelect: (value: string) => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{title}</Text>

          {options.map((option) => (
            <Pressable
              key={option}
              style={[styles.modalOption, option === selected && styles.modalOptionSelected]}
              onPress={() => onSelect(option)}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  option === selected && styles.modalOptionTextSelected,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          ))}

          <Pressable style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function mergeDate(base: Date, incoming: Date) {
  const updated = new Date(base);
  updated.setFullYear(incoming.getFullYear(), incoming.getMonth(), incoming.getDate());
  return updated;
}

function mergeTime(base: Date, incoming: Date) {
  const updated = new Date(base);
  updated.setHours(incoming.getHours(), incoming.getMinutes(), 0, 0);
  return updated;
}

function addMinutes(date: Date, minutes: number) {
  const updated = new Date(date);
  updated.setMinutes(updated.getMinutes() + minutes);
  return updated;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  formCard: {
    backgroundColor: colors.mintBg,
    borderRadius: radius.lg,
    borderWidth: 1.2,
    borderColor: colors.border,
    padding: spacing.lg,
    ...shadows.soft,
  },
  fieldBlock: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    marginBottom: 12,
    ...typography.body,
    color: colors.text,
  },
  notesInput: {
    minHeight: 96,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    ...typography.body,
    color: colors.text,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  pill: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1.2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.soft,
  },
  pillSmall: {
    width: 92,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1.2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.soft,
  },
  pillText: {
    fontSize: 13,
    color: colors.text,
  },
  selector: {
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1.2,
    borderColor: colors.border,
    justifyContent: "center",
    paddingHorizontal: 12,
    alignItems: "flex-end",
    ...shadows.soft,
  },
  selectorText: {
    fontSize: 13,
    color: colors.textSoft,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlaySoft,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1.2,
    borderColor: colors.border,
    padding: spacing.lg,
    ...shadows.strong,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    marginBottom: 8,
    backgroundColor: colors.surface,
    borderWidth: 1.2,
    borderColor: colors.borderSoft,
  },
  modalOptionSelected: {
    backgroundColor: colors.mintCard,
    borderColor: colors.border,
  },
  modalOptionText: {
    ...typography.body,
    color: colors.text,
  },
  modalOptionTextSelected: {
    fontWeight: "700",
  },
  modalCloseButton: {
    marginTop: 8,
    alignSelf: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  modalCloseText: {
    ...typography.bodyMedium,
    color: colors.text,
  },
});
