import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ReferenceShell } from "@/components/reference-shell";
import { MintPillButton, OutlinedPanel } from "@/components/reference-ui";
import { useAppStore } from "@/store/app-store";
import { unassignedEvents } from "@/lib/selectors";

function ProgressTube({ score }: { score: number }) {
  return (
    <View style={styles.tube}>
      <View style={[styles.tubeFill, { height: `${score}%` }]} />
      <View style={styles.tubeDots}>
        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={styles.tubeDot} />
        ))}
      </View>
      <Text style={styles.tubeLabel}>Task progress</Text>
    </View>
  );
}

export default function TasksScreen() {
  const users = useAppStore((state) => state.users);
  const events = useAppStore((state) => state.events);
  const reassignEvent = useAppStore((state) => state.reassignEvent);
  const unassigned = unassignedEvents(events);

  return (
    <ReferenceShell
      topLeft={{ icon: "person-circle-outline", label: "me", target: "/profile" }}
      topRight={{ icon: "home", label: "Home", target: "/(tabs)/today" }}
      bottomLeft={{ icon: "settings-outline", label: "Setting", target: "/(tabs)/settings" }}
      bottomRight={{ icon: "notifications-outline", label: "Notification", target: "/(tabs)/notifications" }}
      bottomCenter={
        <View style={styles.starBadge}>
          <Ionicons name="star" size={34} color="#F5CF2F" />
        </View>
      }
    >
      <View style={styles.wrap}>
        {unassigned.slice(0, 2).map((event, index) => (
          <OutlinedPanel key={event.id} style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <View style={styles.nameRow}>
                <Ionicons
                  name="person-circle"
                  size={20}
                  color={index === 0 ? "#56D7EB" : "#FF6191"}
                />
                <Text style={styles.nameText}>
                  {index === 0 ? "My today's tasks" : "Suvi"}
                </Text>
              </View>
              <View style={styles.dateRow}>
                <Text style={styles.dateText}>18. Nov</Text>
                <Ionicons name="calendar-outline" size={16} color="#222222" />
              </View>
            </View>

            <View style={styles.taskBody}>
              <View style={styles.taskList}>
                {[event.title, "Meeting", "Pick-up Suvi", "Shopping", "Laundry"].map((task, taskIndex) => (
                  <View key={`${event.id}-${taskIndex}`} style={styles.taskLine}>
                    <Ionicons
                      name={taskIndex < 2 ? "checkmark-circle" : "ellipse-outline"}
                      size={18}
                      color={taskIndex < 2 ? "#27B36A" : "#9C9C9C"}
                    />
                    <Text style={[styles.taskText, taskIndex < 2 ? styles.taskDone : undefined]}>
                      {task}
                    </Text>
                  </View>
                ))}
              </View>

              <ProgressTube score={index === 0 ? 78 : 30} />
            </View>

            <MintPillButton
              label="Add Task"
              left={<Ionicons name="newspaper-outline" size={20} color="#111111" />}
              onPress={() => router.push("/add-event")}
              style={styles.addTaskButton}
            />

            <View style={styles.assignRow}>
              {users.map((user) => (
                <Pressable key={user.id} onPress={() => reassignEvent(event.id, user.id)}>
                  <Text style={styles.assignText}>Assign {user.name}</Text>
                </Pressable>
              ))}
            </View>
          </OutlinedPanel>
        ))}
      </View>
    </ReferenceShell>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },
  taskCard: {
    padding: 12,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  nameText: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "700",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#444444",
  },
  taskBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  taskList: {
    flex: 1,
    gap: 8,
  },
  taskLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  taskText: {
    fontSize: 13,
    color: "#333333",
  },
  taskDone: {
    textDecorationLine: "line-through",
  },
  tube: {
    width: 44,
    height: 150,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#666666",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  tubeFill: {
    width: "100%",
    backgroundColor: "#FF4D4D",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tubeDots: {
    position: "absolute",
    top: 14,
    gap: 18,
    alignItems: "center",
  },
  tubeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#777777",
    backgroundColor: "#FFFFFF",
  },
  tubeLabel: {
    position: "absolute",
    right: -34,
    top: 50,
    transform: [{ rotate: "90deg" }],
    fontSize: 9,
    color: "#555555",
    width: 100,
    textAlign: "center",
  },
  addTaskButton: {
    marginTop: 12,
    marginHorizontal: 18,
  },
  assignRow: {
    marginTop: 8,
    gap: 4,
  },
  assignText: {
    fontSize: 12,
    color: "#3E6E9B",
  },
  starBadge: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#F5CF2F",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -18,
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
});
