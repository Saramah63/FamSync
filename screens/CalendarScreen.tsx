import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/components/app-screen";
import { ActionButton } from "@/components/action-button";
import { EventRow } from "@/components/event-row";
import { SectionTitle } from "@/components/section-title";
import { SelectChipGroup } from "@/components/select-chip-group";
import { MonthGrid } from "@/features/calendar/month-grid";
import { palette, spacing } from "@/constants/theme";
import { useAppStore } from "@/store/app-store";
import { sameDay } from "@/lib/date";
import { sortEventsChronologically } from "@/lib/selectors";

export default function CalendarScreen() {
  const [mode, setMode] = useState<"month" | "week" | "day">("month");
  const [memberFilter, setMemberFilter] = useState<string>("all");
  const users = useAppStore((state) => state.users);
  const children = useAppStore((state) => state.children);
  const events = useAppStore((state) => state.events);

  const today = new Date();
  const visibleEvents = useMemo(() => {
    const base =
      memberFilter === "all"
        ? events
        : events.filter((event) => event.assignedUserId === memberFilter);

    if (mode === "day") {
      return sortEventsChronologically(
        base.filter((event) => sameDay(event.date, today.toISOString()))
      );
    }

    if (mode === "week") {
      const weekEnd = new Date();
      weekEnd.setDate(today.getDate() + 7);
      return sortEventsChronologically(
        base.filter((event) => {
          const date = new Date(event.date).getTime();
          return date >= today.getTime() && date <= weekEnd.getTime();
        })
      );
    }

    return sortEventsChronologically(base);
  }, [events, memberFilter, mode, today]);

  const activeDays = Array.from(
    new Set(events.map((event) => new Date(event.date).getDate()))
  );

  return (
    <AppScreen
      title="Calendar"
      subtitle="Month, week, and day views with quick family-member filtering."
      right={<ActionButton label="Add" onPress={() => router.push("/add-event")} />}
    >
      <SelectChipGroup
        value={mode}
        options={[
          { label: "Month", value: "month" },
          { label: "Week", value: "week" },
          { label: "Day", value: "day" },
        ]}
        onChange={setMode}
      />

      <SectionTitle title="Filter by adult" />
      <SelectChipGroup
        value={memberFilter}
        options={[
          { label: "All", value: "all" },
          ...users.map((user) => ({ label: user.name, value: user.id })),
        ]}
        onChange={setMemberFilter}
      />

      {mode === "month" ? <MonthGrid selectedDate={today} activeDays={activeDays} /> : null}

      <SectionTitle
        title={mode === "day" ? "Timeline" : mode === "week" ? "This week" : "Upcoming"}
        caption="Events stay color-coded by type, with the owner always visible."
      />

      <View style={styles.timeline}>
        {visibleEvents.map((event) => (
          <EventRow
            key={event.id}
            event={event}
            child={children.find((child) => child.id === event.childId)}
            owner={users.find((user) => user.id === event.assignedUserId)}
            onPress={() => router.push(`/edit-event/${event.id}`)}
          />
        ))}
        {visibleEvents.length === 0 ? (
          <Text style={styles.empty}>No events match this filter yet.</Text>
        ) : null}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  timeline: {
    gap: spacing.sm,
  },
  empty: {
    color: palette.inkSoft,
    fontSize: 15,
  },
});
