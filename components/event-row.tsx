import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "@/components/card";
import { Pill } from "@/components/pill";
import { palette, spacing } from "@/constants/theme";
import { EventItem, User, Child } from "@/types/domain";
import { formatShortDate, formatTimeRange, formatWeekday } from "@/lib/date";

const eventTypeTint: Record<string, string> = {
  school: palette.sky,
  hobby: palette.coralSoft,
  doctor: palette.lavender,
  family: palette.mintStrong,
  task: "#FFF0C8",
};

interface EventRowProps {
  event: EventItem;
  child?: Child;
  owner?: User;
  onPress?: () => void;
}

export function EventRow({ event, child, owner, onPress }: EventRowProps) {
  const content = (
    <Card>
      <View style={styles.topLine}>
        <Pill
          label={event.eventType.toUpperCase()}
          tint={eventTypeTint[event.eventType]}
        />
        {event.updatedLabel ? (
          <Pill
            label={event.updatedLabel}
            tint={palette.coralSoft}
            textColor={palette.red}
          />
        ) : null}
      </View>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        {formatWeekday(event.date)} {formatShortDate(event.date)}  •  {formatTimeRange(event.startTime, event.endTime)}
      </Text>
      <Text style={styles.meta}>{event.location}</Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {child ? child.name : "Whole family"}
        </Text>
        <Text style={styles.footerText}>
          {owner ? `Owner: ${owner.name}` : "Needs owner"}
        </Text>
      </View>
    </Card>
  );

  if (!onPress) {
    return content;
  }

  return <Pressable onPress={onPress}>{content}</Pressable>;
}

const styles = StyleSheet.create({
  topLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  title: {
    fontSize: 19,
    color: palette.ink,
    fontWeight: "800",
  },
  meta: {
    fontSize: 14,
    color: palette.inkSoft,
    lineHeight: 20,
  },
  footer: {
    marginTop: spacing.xs,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  footerText: {
    fontSize: 13,
    color: palette.ink,
    fontWeight: "700",
  },
});
