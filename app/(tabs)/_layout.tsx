import { Tabs } from "expo-router";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { colors, radius, shadows } from "@/lib/theme";

function TabBadge({ label, focused }: { label: string; focused: boolean }) {
  return (
    <View style={[styles.badge, focused && styles.badgeActive]}>
      <Text style={[styles.badgeText, focused && styles.badgeTextActive]}>{label}</Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabBadge label="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ focused }) => <TabBadge label="Tasks" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerWrap}>
              <View style={styles.centerButton}>
                <Text style={styles.centerButtonText}>★</Text>
              </View>
              <Text style={[styles.centerLabel, focused && styles.badgeTextActive]}>Calendar</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ focused }) => <TabBadge label="Messages" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => <TabBadge label="Profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 82,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: colors.background,
    borderTopColor: colors.borderSoft,
  },
  badge: {
    minWidth: 68,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "transparent",
  },
  badgeActive: {
    backgroundColor: colors.mintCard,
    borderWidth: 1.2,
    borderColor: colors.border,
    ...shadows.soft,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textSoft,
  },
  badgeTextActive: {
    color: colors.text,
    fontWeight: "700",
  },
  centerWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -18,
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.strong,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  centerButtonText: {
    fontSize: 28,
    color: colors.surface,
    fontWeight: "700",
  },
  centerLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
    color: colors.textSoft,
  },
});
