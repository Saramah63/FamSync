import { StyleSheet, Text, View } from "react-native";
import { palette, radii, spacing } from "@/constants/theme";

interface MonthGridProps {
  selectedDate: Date;
  activeDays: number[];
}

export function MonthGrid({ selectedDate, activeDays }: MonthGridProps) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<number | null> = Array.from({ length: firstDay }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return (
    <View style={styles.card}>
      <View style={styles.weekdays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((weekday) => (
          <Text key={weekday} style={styles.weekday}>
            {weekday.slice(0, 2)}
          </Text>
        ))}
      </View>
      <View style={styles.grid}>
        {cells.map((day, index) => {
          const active = day ? activeDays.includes(day) : false;
          const isToday = day === selectedDate.getDate();
          return (
            <View
              key={`${day}-${index}`}
              style={[
                styles.cell,
                active ? styles.activeCell : undefined,
                isToday ? styles.todayCell : undefined,
              ]}
            >
              <Text style={[styles.day, active ? styles.activeDay : undefined]}>
                {day ?? ""}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.white,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: palette.border,
    gap: spacing.sm,
  },
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekday: {
    width: "14%",
    textAlign: "center",
    fontSize: 12,
    color: palette.inkSoft,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  cell: {
    width: "12.8%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.sm,
  },
  activeCell: {
    backgroundColor: palette.mint,
  },
  todayCell: {
    borderWidth: 1,
    borderColor: palette.coral,
  },
  day: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: "700",
  },
  activeDay: {
    color: palette.green,
  },
});
