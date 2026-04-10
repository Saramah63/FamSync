import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MintPanel, OutlinedPanel, SmallPill } from "@/components/reference-ui";
import { useAppStore } from "@/store/app-store";
import { palette } from "@/constants/theme";

export default function EditEventScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const users = useAppStore((state) => state.users);
  const event = useAppStore((state) =>
    state.events.find((candidate) => candidate.id === params.id)
  );
  const updateEvent = useAppStore((state) => state.updateEvent);
  const [title, setTitle] = useState(event?.title ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [assignedUserId, setAssignedUserId] = useState<string>(
    event?.assignedUserId ?? "unassigned"
  );
  const [repeatState, setRepeatState] = useState(event?.recurrenceRule ? "weekly" : "never");

  if (!event) {
    return (
      <View style={styles.screen}>
        <OutlinedPanel style={styles.titleBox}>
          <Text style={styles.titleText}>Edit event/task</Text>
        </OutlinedPanel>
        <MintPanel style={styles.mainBox}>
          <Text style={styles.emptyText}>The selected event no longer exists.</Text>
        </MintPanel>
      </View>
    );
  }

  const saveEvent = () => {
    if (!title.trim()) {
      Alert.alert("Add a title", "Every event needs a clear title.");
      return;
    }

    updateEvent(event.id, {
      title: title.trim(),
      location: location.trim(),
      description: description.trim(),
      assignedUserId: assignedUserId === "unassigned" ? null : assignedUserId,
      recurrenceRule: repeatState === "never" ? null : "FREQ=WEEKLY",
    });

    router.back();
  };

  return (
    <View style={styles.screen}>
      <OutlinedPanel style={styles.titleBox}>
        <Text style={styles.titleText}>Edit event/task</Text>
      </OutlinedPanel>

      <MintPanel style={styles.mainBox}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          placeholderTextColor="#767676"
          style={styles.input}
        />
        <View style={styles.rule} />
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Location"
          placeholderTextColor="#767676"
          style={styles.input}
        />
        <View style={styles.rule} />

        <View style={styles.row}>
          <Text style={styles.label}>Starts</Text>
          <SmallPill label="18. Nov 2024" />
          <SmallPill label={event.startTime.replace(":", ".")} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ends</Text>
          <SmallPill label="18. Nov 2024" />
          <SmallPill label={event.endTime.replace(":", ".")} />
        </View>

        <View style={styles.rule} />
        <View style={styles.singleRow}>
          <Text style={styles.smallLabel}>Repeat</Text>
          <Pressable onPress={() => setRepeatState(repeatState === "never" ? "weekly" : "never")}>
            <SmallPill label={repeatState} />
          </Pressable>
        </View>
        <View style={styles.rule} />
        <View style={styles.singleRow}>
          <Text style={styles.smallLabel}>Reminder</Text>
          <SmallPill label="none" />
        </View>
      </MintPanel>

      <MintPanel style={styles.notesBox}>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Notes"
          placeholderTextColor="#767676"
          multiline
          style={styles.notesInput}
        />
      </MintPanel>

      <MintPanel style={styles.shareBox}>
        <View style={styles.shareRow}>
          <Text style={styles.shareTitle}>Share with:</Text>
          <Text style={styles.shareHint}>
            {assignedUserId === "unassigned"
              ? "Member's name"
              : users.find((user) => user.id === assignedUserId)?.name}
          </Text>
          <Pressable
            onPress={() =>
              setAssignedUserId(
                assignedUserId === "unassigned" ? (users[0]?.id ?? "unassigned") : "unassigned"
              )
            }
          >
            <Ionicons name="add-circle-outline" size={26} color="#111111" />
          </Pressable>
        </View>
      </MintPanel>

      <View style={styles.bottom}>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#FFFFFF" />
        </Pressable>

        <Pressable style={styles.addButton} onPress={saveEvent}>
          <Ionicons name="save-outline" size={30} color="#111111" />
          <Text style={styles.addLabel}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingTop: 32,
    paddingBottom: 20,
  },
  titleBox: {
    alignItems: "center",
    paddingVertical: 11,
  },
  titleText: {
    fontSize: 22,
    color: "#111111",
  },
  mainBox: {
    marginTop: 18,
  },
  input: {
    fontSize: 18,
    color: "#222222",
    paddingVertical: 8,
  },
  rule: {
    height: 1,
    backgroundColor: "#666666",
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  label: {
    width: 58,
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
  },
  singleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  smallLabel: {
    fontSize: 16,
    color: "#333333",
  },
  notesBox: {
    marginTop: 18,
    minHeight: 136,
  },
  notesInput: {
    flex: 1,
    fontSize: 18,
    color: "#222222",
    textAlignVertical: "top",
  },
  shareBox: {
    marginTop: 14,
  },
  shareRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  shareTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
  },
  shareHint: {
    flex: 1,
    fontSize: 14,
    color: "#777777",
  },
  bottom: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  closeButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: palette.coral,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  addLabel: {
    marginTop: 2,
    fontSize: 18,
    color: "#222222",
  },
  emptyText: {
    fontSize: 16,
    color: "#444444",
  },
});
