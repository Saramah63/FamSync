import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AttachmentSheet from "@/components/AttachmentSheet";
import AnimatedPillButton from "@/components/AnimatedPillButton";
import { colors, radius, shadows, spacing, typography } from "@/lib/theme";

type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMine?: boolean;
};

export default function MessagesScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Ali",
      text: "Today we are going to restaurant for dinner.",
      time: "09:15",
      isMine: false,
    },
    {
      id: 2,
      sender: "Matti",
      text: "Hello, how is everything going?",
      time: "10:20",
      isMine: false,
    },
    {
      id: 3,
      sender: "Suvi",
      text: "I do not see any progress in your tasks for today.",
      time: "11:05",
      isMine: false,
    },
  ]);

  const [input, setInput] = useState("");
  const [openSheet, setOpenSheet] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) {
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      sender: "Me",
      text: input.trim(),
      time: "Now",
      isMine: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.backgroundBlob, styles.blobTop]} />
      <View style={[styles.backgroundBlob, styles.blobBottom]} />
      <View style={styles.headerRow}>
        <View style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[styles.messageCard, message.isMine && styles.myMessageCard]}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>{message.sender}</Text>
              <Text style={styles.timeText}>{message.time}</Text>
            </View>

            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}

      </ScrollView>

      <AnimatedPillButton title="✎ New Message" onPress={() => setOpenSheet(true)} />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Write a message..."
          placeholderTextColor={colors.textMuted}
        />
        <Pressable style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>➤</Text>
        </Pressable>
      </View>

      <AttachmentSheet
        visible={openSheet}
        onClose={() => setOpenSheet(false)}
        items={[
          { label: "Video", icon: "🎥", onPress: () => setOpenSheet(false) },
          { label: "Audio", icon: "🎤", onPress: () => setOpenSheet(false) },
          { label: "Location", icon: "📍", onPress: () => setOpenSheet(false) },
          { label: "Camera", icon: "📷", onPress: () => setOpenSheet(false) },
          { label: "Photos", icon: "🖼", onPress: () => setOpenSheet(false) },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    position: "relative",
  },
  backgroundBlob: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.2,
  },
  blobTop: {
    top: 50,
    left: -40,
    backgroundColor: colors.pinkSoft,
  },
  blobBottom: {
    right: -50,
    bottom: 140,
    backgroundColor: colors.cyanSoft,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  headerIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.cyan,
    marginRight: 8,
  },
  headerTitle: {
    color: colors.text,
    ...typography.h2,
  },
  messagesContainer: {
    paddingBottom: spacing.sm,
  },
  messageCard: {
    backgroundColor: colors.surface,
    borderWidth: 1.2,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 12,
    marginBottom: 12,
    ...shadows.soft,
  },
  myMessageCard: {
    backgroundColor: colors.mintBg,
    borderColor: colors.mintStrong,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  senderName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  timeText: {
    fontSize: 11,
    color: colors.textSoft,
  },
  messageText: {
    ...typography.body,
    lineHeight: 20,
    color: colors.text,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: radius.pill,
    borderWidth: 1.4,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.text,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginLeft: 8,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  sendButtonText: {
    fontSize: 18,
    color: colors.surface,
    marginLeft: 2,
  },
});
