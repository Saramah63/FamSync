import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AppHeader from "@/components/AppHeader";
import PrimaryButton from "@/components/PrimaryButton";
import { useEventStore } from "@/lib/event-store";
import { colors, radius, shadows, spacing, typography } from "@/lib/theme";

export default function EditEventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const isHydrated = useEventStore((state) => state.isHydrated);
  const hydrateEvents = useEventStore((state) => state.hydrateEvents);
  const getEventById = useEventStore((state) => state.getEventById);
  const updateEvent = useEventStore((state) => state.updateEvent);
  const removeEvent = useEventStore((state) => state.removeEvent);

  const event = useMemo(() => {
    if (!id) {
      return undefined;
    }
    return getEventById(id);
  }, [getEventById, id]);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [shareWith, setShareWith] = useState("");

  useEffect(() => {
    if (!isHydrated) {
      hydrateEvents();
    }
  }, [hydrateEvents, isHydrated]);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setLocation(event.location);
      setNotes(event.notes);
      setShareWith(event.shareWith);
    }
  }, [event]);

  async function handleSave() {
    if (!event) {
      return;
    }

    if (!title.trim()) {
      Alert.alert("Missing title", "Please enter a title.");
      return;
    }

    await updateEvent({
      ...event,
      title: title.trim(),
      location: location.trim(),
      notes: notes.trim(),
      shareWith: shareWith.trim(),
    });

    Alert.alert("Updated", "Your event has been updated.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  }

  function handleDelete() {
    if (!event) {
      return;
    }

    Alert.alert("Delete event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await removeEvent(event.id);
          router.replace("/calendar");
        },
      },
    ]);
  }

  if (!isHydrated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.mintStrong} />
        <Text style={styles.loadingText}>Loading event...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.notFoundTitle}>Event not found</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <AppHeader title="Edit event" showBack />

        <View style={styles.formCard}>
          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter title"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter location"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Share with</Text>
            <TextInput
              style={styles.input}
              value={shareWith}
              onChangeText={setShareWith}
              placeholder="Members' name"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="Write notes..."
              placeholderTextColor={colors.textMuted}
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.readonlyCard}>
            <Text style={styles.readonlyTitle}>Schedule details</Text>
            <Text style={styles.readonlyText}>Start: {formatDateTime(event.startsAt)}</Text>
            <Text style={styles.readonlyText}>End: {formatDateTime(event.endsAt)}</Text>
            <Text style={styles.readonlyText}>Repeat: {event.repeat}</Text>
            <Text style={styles.readonlyText}>Reminder: {event.reminder}</Text>
            <Text style={styles.readonlyText}>Extra reminder: {event.extraReminder}</Text>
          </View>
        </View>

        <PrimaryButton title="Save changes" onPress={handleSave} />

        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete event</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function formatDateTime(dateString: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(dateString));
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
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 12,
    ...typography.body,
    color: colors.textSoft,
  },
  notFoundTitle: {
    color: colors.text,
    ...typography.h2,
    marginBottom: 14,
  },
  backButton: {
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 18,
    backgroundColor: colors.mintCard,
    borderWidth: 1.2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    ...typography.bodyMedium,
    color: colors.text,
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
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    height: 42,
    borderRadius: radius.sm,
    borderWidth: 1.2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    ...typography.body,
    color: colors.text,
  },
  notesInput: {
    minHeight: 96,
    borderRadius: radius.sm,
    borderWidth: 1.2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    ...typography.body,
    color: colors.text,
  },
  readonlyCard: {
    marginTop: 6,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderWidth: 1.2,
    borderColor: colors.border,
    padding: 12,
  },
  readonlyTitle: {
    color: colors.text,
    ...typography.bodyMedium,
    marginBottom: 8,
  },
  readonlyText: {
    fontSize: 13,
    color: colors.textSoft,
    marginBottom: 4,
  },
  deleteButton: {
    marginTop: 12,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.dangerSoft,
    borderWidth: 1.2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.danger,
  },
});
