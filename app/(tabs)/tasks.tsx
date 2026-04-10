import { useEffect } from "react";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AnimatedPillButton from "@/components/AnimatedPillButton";
import RewardBadge from "@/components/RewardBadge";
import { useEventStore } from "@/lib/event-store";
import { colors, radius, shadows, spacing, typography } from "@/lib/theme";

export default function TasksScreen() {
  const events = useEventStore((state) => state.events);
  const isHydrated = useEventStore((state) => state.isHydrated);
  const hydrateEvents = useEventStore((state) => state.hydrateEvents);
  const removeEvent = useEventStore((state) => state.removeEvent);
  const clearEvents = useEventStore((state) => state.clearEvents);
  const completedCount = events.length;

  useEffect(() => {
    hydrateEvents();
  }, [hydrateEvents]);

  if (!isHydrated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.mintStrong} />
        <Text style={styles.loadingText}>Loading your tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerTitleGroup}>
          <Text style={styles.title}>My today&apos;s tasks</Text>
          {events.length > 0 ? <Text style={styles.subtitle}>You&apos;re building momentum.</Text> : null}
        </View>
        {events.length > 0 ? (
          <View style={styles.headerActions}>
            <RewardBadge type={events.length >= 3 ? "trophy" : "star"} value={completedCount} />
            <Pressable onPress={clearEvents}>
              <Text style={styles.clearAllText}>Clear all</Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {events.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.emptyText}>
              Add your first event or task to start organizing your family schedule.
            </Text>
          </View>
        ) : (
          events.map((event) => (
            <View key={event.id} style={styles.taskCard}>
              <View style={styles.cardMain}>
                <View style={styles.cardContent}>
                  <View style={styles.cardTop}>
                    <Text style={styles.taskTitle}>{event.title}</Text>
                    <Pressable onPress={() => removeEvent(event.id)}>
                      <Text style={styles.deleteText}>Delete</Text>
                    </Pressable>
                  </View>

                  <Text style={styles.taskMeta}>
                    {formatDate(event.startsAt)} • {formatTime(event.startsAt)} -{" "}
                    {formatTime(event.endsAt)}
                  </Text>

                  {!!event.location && <Text style={styles.taskSubtext}>📍 {event.location}</Text>}
                  {!!event.shareWith && <Text style={styles.taskSubtext}>👥 {event.shareWith}</Text>}
                  {!!event.reminder && event.reminder !== "None" && (
                    <Text style={styles.taskSubtext}>⏰ {event.reminder}</Text>
                  )}
                  {!!event.notes && <Text style={styles.notesText}>{event.notes}</Text>}
                </View>

                <View style={styles.progressBar}>
                  <View style={[styles.progressSegment, styles.progressSegmentDone]} />
                  <View style={[styles.progressSegment, styles.progressSegmentMid]} />
                  <View style={[styles.progressSegment, styles.progressSegmentTodo]} />
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <AnimatedPillButton title="+ Add Task" onPress={() => router.push("/add-event")} />
    </View>
  );
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function formatTime(dateString: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(dateString));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  headerTitleGroup: {
    flex: 1,
    paddingRight: spacing.md,
  },
  headerActions: {
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    ...typography.h2,
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.textSoft,
    ...typography.caption,
  },
  clearAllText: {
    fontSize: 13,
    color: colors.danger,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 12,
  },
  emptyState: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 18,
    borderWidth: 1.2,
    borderColor: colors.border,
    ...shadows.soft,
  },
  emptyTitle: {
    color: colors.text,
    ...typography.h3,
    marginBottom: 6,
  },
  emptyText: {
    ...typography.body,
    lineHeight: 20,
    color: colors.textSoft,
  },
  taskCard: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
    ...shadows.medium,
  },
  cardMain: {
    flex: 1,
    flexDirection: "row",
  },
  cardContent: {
    flex: 1,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    color: colors.text,
    ...typography.h3,
    flex: 1,
    marginRight: 12,
  },
  deleteText: {
    fontSize: 13,
    color: colors.danger,
    fontWeight: "600",
  },
  taskMeta: {
    fontSize: 13,
    color: colors.textSoft,
    marginTop: 6,
  },
  taskSubtext: {
    fontSize: 13,
    color: colors.textSoft,
    marginTop: 6,
  },
  notesText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    color: colors.text,
  },
  progressBar: {
    width: 30,
    borderRadius: 20,
    backgroundColor: colors.borderSoft,
    overflow: "hidden",
    marginLeft: 10,
    justifyContent: "flex-end",
  },
  progressSegment: {
    flex: 1,
  },
  progressSegmentDone: {
    backgroundColor: colors.mintStrong,
  },
  progressSegmentMid: {
    backgroundColor: colors.yellow,
  },
  progressSegmentTodo: {
    backgroundColor: colors.pink,
  },
});
