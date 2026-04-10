import { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import type { Href } from "expo-router";
import { useEventStore } from "@/lib/event-store";
import { colors, components, radius, shadows, spacing, typography } from "@/lib/theme";

export default function CalendarScreen() {
  const events = useEventStore((state) => state.events);
  const isHydrated = useEventStore((state) => state.isHydrated);
  const hydrateEvents = useEventStore((state) => state.hydrateEvents);

  useEffect(() => {
    hydrateEvents();
  }, [hydrateEvents]);

  const groupedEvents = useMemo(() => {
    const groups: Record<string, typeof events> = {};

    [...events]
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
      .forEach((event) => {
        const dayKey = formatDayKey(event.startsAt);
        if (!groups[dayKey]) {
          groups[dayKey] = [];
        }
        groups[dayKey].push(event);
      });

    return Object.entries(groups);
  }, [events]);

  if (!isHydrated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.mintStrong} />
        <Text style={styles.loadingText}>Loading calendar...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Calendar</Text>
          <Text style={styles.subtitle}>Grouped by day so changes are easy to scan.</Text>
        </View>
        <Pressable style={styles.addMiniButton} onPress={() => router.push("/add-event")}>
          <Text style={styles.addMiniText}>+ Add</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {groupedEvents.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No events yet</Text>
            <Text style={styles.emptyText}>
              Add your first family event to populate the calendar.
            </Text>
          </View>
        ) : (
          groupedEvents.map(([day, dayEvents]) => (
            <View key={day} style={styles.daySection}>
              <Text style={styles.dayTitle}>{formatDayHeading(day)}</Text>

              {dayEvents.map((event) => (
                <Pressable
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => router.push(`/edit-event/${event.id}` as Href)}
                >
                  <View style={styles.timelineDot} />
                  <View style={styles.eventContent}>
                    <View style={styles.eventTopRow}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventTime}>
                        {formatTime(event.startsAt)} - {formatTime(event.endsAt)}
                      </Text>
                    </View>

                    {!!event.location && <Text style={styles.eventMeta}>📍 {event.location}</Text>}

                    {!!event.shareWith && <Text style={styles.eventMeta}>👥 {event.shareWith}</Text>}

                    {!!event.notes && (
                      <Text style={styles.eventNotes} numberOfLines={2}>
                        {event.notes}
                      </Text>
                    )}
                  </View>
                </Pressable>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

function formatDayKey(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function formatDayHeading(dayKey: string) {
  const [year, month, day] = dayKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
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
    marginBottom: 16,
    gap: spacing.md,
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
  addMiniButton: {
    ...components.smallPill,
    minHeight: 36,
    paddingHorizontal: 14,
    backgroundColor: colors.mintBg,
  },
  addMiniText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  scrollContent: {
    paddingBottom: 12,
  },
  emptyState: {
    ...components.outlinedCard,
    padding: 18,
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
  daySection: {
    marginBottom: 20,
  },
  dayTitle: {
    color: colors.text,
    ...typography.h3,
    marginBottom: 10,
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1.2,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
    ...shadows.medium,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.mintStrong,
    marginTop: 6,
    marginRight: 12,
    shadowColor: shadows.soft.shadowColor,
    shadowOpacity: shadows.soft.shadowOpacity,
    shadowRadius: shadows.soft.shadowRadius,
    shadowOffset: shadows.soft.shadowOffset,
  },
  eventContent: {
    flex: 1,
  },
  eventTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  eventTitle: {
    flex: 1,
    color: colors.text,
    ...typography.h3,
  },
  eventTime: {
    fontSize: 12,
    color: colors.textSoft,
  },
  eventMeta: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textSoft,
  },
  eventNotes: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    color: colors.text,
  },
});
