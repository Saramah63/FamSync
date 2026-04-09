import { StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/components/app-screen";
import { Card } from "@/components/card";
import { SectionTitle } from "@/components/section-title";
import { ActionButton } from "@/components/action-button";
import { palette, spacing } from "@/constants/theme";
import { useAppStore } from "@/store/app-store";
import { unassignedEvents } from "@/lib/selectors";

export default function TasksScreen() {
  const users = useAppStore((state) => state.users);
  const events = useAppStore((state) => state.events);
  const reassignEvent = useAppStore((state) => state.reassignEvent);
  const unassigned = unassignedEvents(events);

  return (
    <AppScreen
      title="Assignments"
      subtitle="A simple owner view for pickups, drop-offs, and anything still waiting for an adult."
    >
      <SectionTitle title="Pending handoffs" />
      {unassigned.map((event) => (
        <Card key={event.id}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.meta}>
            {new Date(event.date).toLocaleDateString("en-GB")} • {event.startTime}
          </Text>
          <Text style={styles.meta}>{event.location}</Text>
          <View style={styles.actions}>
            {users.map((user) => (
              <ActionButton
                key={user.id}
                label={`Assign ${user.name}`}
                tone="secondary"
                onPress={() => reassignEvent(event.id, user.id)}
              />
            ))}
          </View>
        </Card>
      ))}
      {unassigned.length === 0 ? (
        <Card>
          <Text style={styles.empty}>Everything has an owner right now.</Text>
        </Card>
      ) : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: palette.ink,
  },
  meta: {
    color: palette.inkSoft,
    fontSize: 14,
  },
  actions: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  empty: {
    color: palette.inkSoft,
    fontSize: 15,
  },
});
