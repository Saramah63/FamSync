import { EventItem } from "@/types/domain";
import { eventDateTime, isOverlapping, isUpcoming, sameDay, startOfToday } from "@/lib/date";

export const sortEventsChronologically = (events: EventItem[]) =>
  [...events].sort(
    (a, b) =>
      eventDateTime(a.date, a.startTime).getTime() -
      eventDateTime(b.date, b.startTime).getTime()
  );

export const todayEvents = (events: EventItem[]) =>
  sortEventsChronologically(
    events.filter((event) => sameDay(event.date, startOfToday().toISOString()))
  );

export const upcomingEvents = (events: EventItem[]) =>
  sortEventsChronologically(events.filter((event) => isUpcoming(event.date, event.startTime)));

export const nextUpcomingEvent = (events: EventItem[]) => upcomingEvents(events)[0];

export const unassignedEvents = (events: EventItem[]) =>
  sortEventsChronologically(events.filter((event) => !event.assignedUserId));

export const updatedEvents = (events: EventItem[]) =>
  sortEventsChronologically(events.filter((event) => event.status === "updated"));

export const conflictingEvents = (events: EventItem[]) => {
  const sorted = sortEventsChronologically(events);
  const conflicts: EventItem[] = [];

  sorted.forEach((event, index) => {
    const hasConflict = sorted.some(
      (comparison, comparisonIndex) =>
        index !== comparisonIndex && isOverlapping(event, comparison)
    );

    if (hasConflict) {
      conflicts.push(event);
    }
  });

  return conflicts;
};
