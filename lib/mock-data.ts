import {
  Child,
  EventChange,
  EventItem,
  Family,
  FamilyInvite,
  FamilyMember,
  NotificationItem,
  User,
} from "@/types/domain";
import { isoDateWithOffset } from "@/lib/date";

interface MockState {
  users: User[];
  family: Family;
  familyMembers: FamilyMember[];
  familyInvites: FamilyInvite[];
  children: Child[];
  events: EventItem[];
  eventChanges: EventChange[];
  notifications: NotificationItem[];
}

const now = new Date().toISOString();

export const buildMockState = (): MockState => {
  const users: User[] = [
    {
      id: "user-1",
      name: "Sara",
      email: "sara@famsync.app",
      createdAt: now,
    },
    {
      id: "user-2",
      name: "Mika",
      email: "mika@famsync.app",
      createdAt: now,
    },
  ];

  const family: Family = {
    id: "family-1",
    name: "Nordlund Family",
    createdBy: "user-1",
    createdAt: now,
  };

  const children: Child[] = [
    {
      id: "child-1",
      familyId: family.id,
      name: "Ella",
      birthYear: 2016,
      colorTag: "#FDB63F",
    },
    {
      id: "child-2",
      familyId: family.id,
      name: "Leo",
      birthYear: 2019,
      colorTag: "#4A90E2",
    },
  ];

  const events: EventItem[] = [
    {
      id: "event-1",
      familyId: family.id,
      childId: "child-1",
      title: "Piano lesson",
      description: "Bring practice notebook and payment card.",
      eventType: "hobby",
      date: isoDateWithOffset(0),
      startTime: "15:30",
      endTime: "16:15",
      location: "Helsinki Music House",
      assignedUserId: "user-2",
      createdBy: "user-1",
      updatedBy: "user-2",
      reminderMinutesBefore: 60,
      recurrenceRule: "FREQ=WEEKLY;BYDAY=TH",
      status: "updated",
      updatedLabel: "Time changed 2h ago",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "event-2",
      familyId: family.id,
      childId: "child-2",
      title: "Daycare pickup",
      description: "Take indoor shoes and art folder home.",
      eventType: "task",
      date: isoDateWithOffset(0),
      startTime: "17:00",
      endTime: "17:20",
      location: "Little Pines Daycare",
      assignedUserId: "user-1",
      createdBy: "user-1",
      updatedBy: "user-1",
      reminderMinutesBefore: 30,
      recurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
      status: "scheduled",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "event-3",
      familyId: family.id,
      childId: "child-1",
      title: "Dentist check-up",
      description: "Check if Mika can leave work early.",
      eventType: "doctor",
      date: isoDateWithOffset(1),
      startTime: "09:00",
      endTime: "10:00",
      location: "City Dental",
      assignedUserId: null,
      createdBy: "user-1",
      updatedBy: "user-1",
      reminderMinutesBefore: 1440,
      recurrenceRule: null,
      status: "scheduled",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "event-4",
      familyId: family.id,
      childId: "child-1",
      title: "Class play",
      description: "Parents arrive 15 minutes early.",
      eventType: "school",
      date: isoDateWithOffset(3),
      startTime: "18:00",
      endTime: "19:00",
      location: "Aurora Primary School",
      assignedUserId: "user-1",
      createdBy: "user-2",
      updatedBy: "user-2",
      reminderMinutesBefore: 120,
      recurrenceRule: null,
      status: "scheduled",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "event-5",
      familyId: family.id,
      childId: null,
      title: "Meal plan & groceries",
      description: "Review weekend dinner plan before shopping.",
      eventType: "family",
      date: isoDateWithOffset(0),
      startTime: "18:30",
      endTime: "19:00",
      location: "Home",
      assignedUserId: null,
      createdBy: "user-2",
      updatedBy: "user-2",
      reminderMinutesBefore: 30,
      recurrenceRule: null,
      status: "scheduled",
      createdAt: now,
      updatedAt: now,
    }
  ];

  return {
    users,
    family,
    familyMembers: [
      {
        id: "member-1",
        familyId: family.id,
        userId: "user-1",
        role: "parent",
      },
      {
        id: "member-2",
        familyId: family.id,
        userId: "user-2",
        role: "co-parent",
      },
    ],
    familyInvites: [
      {
        id: "invite-1",
        familyId: family.id,
        email: "mika@famsync.app",
        invitedBy: "user-1",
        status: "accepted",
        createdAt: now,
      },
    ],
    children,
    events,
    eventChanges: [
      {
        id: "change-1",
        eventId: "event-1",
        changedBy: "user-2",
        changeType: "edited",
        previousValueJson: JSON.stringify({ startTime: "16:00" }),
        newValueJson: JSON.stringify({ startTime: "15:30" }),
        createdAt: now,
      },
      {
        id: "change-2",
        eventId: "event-2",
        changedBy: "user-1",
        changeType: "created",
        previousValueJson: "{}",
        newValueJson: JSON.stringify({ title: "Daycare pickup" }),
        createdAt: now,
      },
    ],
    notifications: [
      {
        id: "notification-1",
        userId: "user-1",
        familyId: family.id,
        type: "event_updated",
        title: "Piano lesson updated",
        body: "Mika moved Ella's lesson earlier. New time: 15:30.",
        isRead: false,
        createdAt: now,
      },
      {
        id: "notification-2",
        userId: "user-1",
        familyId: family.id,
        type: "event_conflict",
        title: "One unassigned pickup",
        body: "Tomorrow's dentist check-up still needs an adult owner.",
        isRead: false,
        createdAt: now,
      },
    ],
  };
};
