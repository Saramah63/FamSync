import { StyleSheet, Text } from "react-native";
import { AppScreen } from "@/components/app-screen";
import { Card } from "@/components/card";
import { Pill } from "@/components/pill";
import { palette } from "@/constants/theme";
import { useAppStore } from "@/store/app-store";

export default function MessageScreen() {
  const notifications = useAppStore((state) => state.notifications);
  const markNotificationRead = useAppStore((state) => state.markNotificationRead);

  return (
    <AppScreen
      title="Notifications"
      subtitle="Every event create, edit, reassignment, and reminder is gathered here with clear status."
    >
      {notifications.map((notification) => (
        <Card key={notification.id}>
          <Pill
            label={notification.isRead ? "READ" : "NEW"}
            tint={notification.isRead ? palette.line : palette.coralSoft}
            textColor={notification.isRead ? palette.inkSoft : palette.red}
          />
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.body}>{notification.body}</Text>
          {!notification.isRead ? (
            <Text style={styles.cta} onPress={() => markNotificationRead(notification.id)}>
              Mark as read
            </Text>
          ) : null}
        </Card>
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: palette.ink,
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
    color: palette.inkSoft,
  },
  cta: {
    fontSize: 14,
    fontWeight: "800",
    color: palette.green,
  },
});
