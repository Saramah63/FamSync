import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { buildMockState } from "@/lib/mock-data";
import {
  Child,
  EventChange,
  EventItem,
  NotificationItem,
  SetupDraft,
  User,
} from "@/types/domain";

interface AppState {
  hasCompletedOnboarding: boolean;
  isAuthenticated: boolean;
  currentUserId: string | null;
  setupDraft: SetupDraft;
  users: User[];
  familyName: string;
  partnerInviteEmail: string;
  children: Child[];
  events: EventItem[];
  eventChanges: EventChange[];
  notifications: NotificationItem[];
  signIn: (email: string) => void;
  signOut: () => void;
  updateSetupDraft: (draft: Partial<SetupDraft>) => void;
  completeOnboarding: (draft: SetupDraft) => void;
  createEvent: (event: Omit<EventItem, "id" | "createdAt" | "updatedAt">) => void;
  updateEvent: (
    eventId: string,
    updates: Partial<Omit<EventItem, "id" | "familyId" | "createdBy" | "createdAt">>
  ) => void;
  markNotificationRead: (id: string) => void;
  reassignEvent: (eventId: string, userId: string) => void;
}

const mock = buildMockState();

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasCompletedOnboarding: false,
      isAuthenticated: false,
      currentUserId: null,
      setupDraft: {
        familyName: "Nordlund Family",
        partnerEmail: "mika@famsync.app",
        children: [
          {
            name: "Ella",
            birthYear: 2016,
            colorTag: "#FDB63F",
          },
          {
            name: "Leo",
            birthYear: 2019,
            colorTag: "#4A90E2",
          },
        ],
      },
      users: mock.users,
      familyName: mock.family.name,
      partnerInviteEmail: "mika@famsync.app",
      children: mock.children,
      events: mock.events,
      eventChanges: mock.eventChanges,
      notifications: mock.notifications,
      signIn: (email) => {
        const existingUser =
          get().users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ??
          get().users[0];
        set({
          isAuthenticated: true,
          hasCompletedOnboarding: true,
          currentUserId: existingUser.id,
        });
      },
      signOut: () =>
        set({
          isAuthenticated: false,
          currentUserId: null,
        }),
      updateSetupDraft: (draft) =>
        set({
          setupDraft: {
            ...get().setupDraft,
            ...draft,
          },
        }),
      completeOnboarding: (draft) => {
        const currentUser = get().users[0];
        const nextChildren = draft.children.map((child, index) => ({
          id: `child-new-${index + 1}`,
          familyId: "family-1",
          avatar: undefined,
          ...child,
        }));

        set({
          hasCompletedOnboarding: true,
          isAuthenticated: true,
          currentUserId: currentUser.id,
          familyName: draft.familyName,
          partnerInviteEmail: draft.partnerEmail,
          children: nextChildren.length > 0 ? nextChildren : get().children,
          notifications: [
            {
              id: `notification-${Date.now()}`,
              userId: currentUser.id,
              familyId: "family-1",
              type: "event_created",
              title: "Family created",
              body: `${draft.familyName} is ready. Invite sent to ${draft.partnerEmail || "your co-parent"}.`,
              isRead: false,
              createdAt: new Date().toISOString(),
            },
            ...get().notifications,
          ],
        });
      },
      createEvent: (event) => {
        const createdAt = new Date().toISOString();
        const newEvent: EventItem = {
          ...event,
          id: `event-${Date.now()}`,
          createdAt,
          updatedAt: createdAt,
        };
        set({
          events: [newEvent, ...get().events],
          eventChanges: [
            {
              id: `change-${Date.now()}`,
              eventId: newEvent.id,
              changedBy: event.createdBy,
              changeType: "created",
              previousValueJson: "{}",
              newValueJson: JSON.stringify(newEvent),
              createdAt,
            },
            ...get().eventChanges,
          ],
          notifications: [
            {
              id: `notification-${Date.now()}`,
              userId: get().currentUserId ?? "user-1",
              familyId: event.familyId,
              type: "event_created",
              title: `${event.title} added`,
              body: `${event.title} is scheduled for ${new Date(event.date).toLocaleDateString("en-GB")}.`,
              isRead: false,
              createdAt,
            },
            ...get().notifications,
          ],
        });
      },
      updateEvent: (eventId, updates) => {
        const updatedAt = new Date().toISOString();
        const existingEvent = get().events.find((event) => event.id === eventId);
        if (!existingEvent) return;

        const nextEvent: EventItem = {
          ...existingEvent,
          ...updates,
          updatedBy: get().currentUserId ?? existingEvent.updatedBy,
          updatedAt,
          status: "updated",
          updatedLabel: "Updated just now",
        };

        set({
          events: get().events.map((event) => (event.id === eventId ? nextEvent : event)),
          eventChanges: [
            {
              id: `change-${Date.now()}`,
              eventId,
              changedBy: get().currentUserId ?? "user-1",
              changeType: "edited",
              previousValueJson: JSON.stringify(existingEvent),
              newValueJson: JSON.stringify(nextEvent),
              createdAt: updatedAt,
            },
            ...get().eventChanges,
          ],
          notifications: [
            {
              id: `notification-${Date.now()}`,
              userId: get().currentUserId ?? "user-1",
              familyId: existingEvent.familyId,
              type: "event_updated",
              title: `${nextEvent.title} updated`,
              body: "The event details changed and everyone affected should review it.",
              isRead: false,
              createdAt: updatedAt,
            },
            ...get().notifications,
          ],
        });
      },
      markNotificationRead: (id) =>
        set({
          notifications: get().notifications.map((notification) =>
            notification.id === id
              ? { ...notification, isRead: true }
              : notification
          ),
        }),
      reassignEvent: (eventId, userId) => {
        const updatedAt = new Date().toISOString();
        set({
          events: get().events.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  assignedUserId: userId,
                  updatedBy: get().currentUserId ?? "user-1",
                  updatedAt,
                  status: "updated",
                  updatedLabel: "Reassigned just now",
                }
              : event
          ),
        });
      },
    }),
    {
      name: "famsync-app-state",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        isAuthenticated: state.isAuthenticated,
        currentUserId: state.currentUserId,
        setupDraft: state.setupDraft,
        familyName: state.familyName,
        partnerInviteEmail: state.partnerInviteEmail,
        children: state.children,
        events: state.events,
        eventChanges: state.eventChanges,
        notifications: state.notifications,
        users: state.users,
      }),
    }
  )
);
