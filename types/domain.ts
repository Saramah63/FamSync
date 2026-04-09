export type FamilyRole = "parent" | "co-parent" | "caregiver";
export type EventType =
  | "school"
  | "hobby"
  | "doctor"
  | "family"
  | "task";
export type EventStatus = "scheduled" | "updated" | "cancelled" | "completed";
export type ReminderSetting = 10 | 30 | 60 | 120 | 1440;
export type ChangeType = "created" | "edited" | "cancelled" | "reassigned";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface Family {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string;
}

export interface FamilyMember {
  id: string;
  familyId: string;
  userId: string;
  role: FamilyRole;
}

export interface Child {
  id: string;
  familyId: string;
  name: string;
  birthYear: number;
  colorTag: string;
  avatar?: string;
}

export interface FamilyInvite {
  id: string;
  familyId: string;
  email: string;
  invitedBy: string;
  status: "pending" | "accepted";
  createdAt: string;
}

export interface EventItem {
  id: string;
  familyId: string;
  childId?: string | null;
  title: string;
  description: string;
  eventType: EventType;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  assignedUserId?: string | null;
  createdBy: string;
  updatedBy: string;
  reminderMinutesBefore: ReminderSetting;
  recurrenceRule?: string | null;
  status: EventStatus;
  updatedLabel?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventChange {
  id: string;
  eventId: string;
  changedBy: string;
  changeType: ChangeType;
  previousValueJson: string;
  newValueJson: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  familyId: string;
  type: "event_created" | "event_updated" | "event_conflict" | "event_reminder";
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export interface SetupDraft {
  familyName: string;
  partnerEmail: string;
  children: Pick<Child, "name" | "birthYear" | "colorTag">[];
}

export interface CalendarViewMode {
  label: string;
  value: "month" | "week" | "day";
}
