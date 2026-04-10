import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/components/app-screen";
import { EventRow } from "@/components/event-row";
import { SectionTitle } from "@/components/section-title";
import { StatCard } from "@/components/stat-card";
import { Card } from "@/components/card";
import { ActionButton } from "@/components/action-button";
import { palette, spacing } from "@/constants/theme";
import { useAppStore } from "@/store/app-store";
import {
  conflictingEvents,
  nextUpcomingEvent,
  todayEvents,
  unassignedEvents,
  updatedEvents,
} from "@/lib/selectors";

export default function HomeScreen() {
  const users = useAppStore((state) => state.users);
  const children = useAppStore((state) => state.children);
  const events = useAppStore((state) => state.events);
  const familyName = useAppStore((state) => state.familyName);

  const today = todayEvents(events);
  const nextEvent = nextUpcomingEvent(events);
  const updated = updatedEvents(events);
  const unassigned = unassignedEvents(events);
  const conflicts = conflictingEvents(events);

  return (
    <AppScreen
      title="Today"
      subtitle={`${familyName} • fast scan for pickups, changes, conflicts, and handoffs.`}
      right={<ActionButton label="Add" onPress={() => router.push("/add-event")} />}
    >
      <View style={styles.stats}>
        <StatCard
          label="Next up"
          value={nextEvent ? nextEvent.title : "No upcoming events"}
          accent={[palette.mintStrong, palette.mint]}
        />
        <StatCard
          label="Needs owner"
          value={String(unassigned.length)}
          accent={[palette.coralSoft, "#FFF6E7"]}
        />
      </View>

      <SectionTitle
        title="Family agenda"
        caption="Built for fast decisions when everyone is already moving."
      />
      {today.length > 0 ? (
        today.map((event) => (
          <EventRow
            key={event.id}
            event={event}
            child={children.find((child) => child.id === event.childId)}
            owner={users.find((user) => user.id === event.assignedUserId)}
            onPress={() => router.push(`/edit-event/${event.id}`)}
          />
        ))
      ) : (
        <Card>
          <Text style={styles.empty}>No events scheduled for today.</Text>
        </Card>
      )}

      <SectionTitle title="What needs attention" />
      <Card>
        <Text style={styles.listTitle}>Updated items</Text>
        {updated.slice(0, 3).map((event) => (
          <Text key={event.id} style={styles.listLine}>
            • {event.title} — {event.updatedLabel}
          </Text>
        ))}
        <View style={styles.divider} />
        <Text style={styles.listTitle}>Conflicts & overlaps</Text>
        {conflicts.length > 0 ? (
          conflicts.slice(0, 3).map((event) => (
            <Text key={event.id} style={styles.listLine}>
              • {event.title} overlaps another family item
            </Text>
          ))
        ) : (
          <Text style={styles.listLine}>• No overlaps detected today.</Text>
        )}
        <View style={styles.divider} />
        <Text style={styles.listTitle}>Unassigned</Text>
        {unassigned.slice(0, 3).map((event) => (
          <Text key={event.id} style={styles.listLine}>
            • {event.title} still needs an adult owner
          </Text>
        ))}
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  empty: {
    color: palette.inkSoft,
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: palette.line,
    marginVertical: spacing.xs,
  },
  listTitle: {
    fontSize: 15,
    color: palette.ink,
    fontWeight: "800",
  },
  listLine: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 22,
  },
});
