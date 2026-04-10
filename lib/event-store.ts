import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const EVENTS_STORAGE_KEY = "famsync_events";

export type FamEvent = {
  id: string;
  title: string;
  location: string;
  startsAt: string;
  endsAt: string;
  repeat: string;
  reminder: string;
  extraReminder: string;
  notes: string;
  shareWith: string;
};

type EventStore = {
  events: FamEvent[];
  isHydrated: boolean;
  hydrateEvents: () => Promise<void>;
  addEvent: (event: FamEvent) => Promise<void>;
  updateEvent: (updatedEvent: FamEvent) => Promise<void>;
  getEventById: (id: string) => FamEvent | undefined;
  removeEvent: (id: string) => Promise<void>;
  clearEvents: () => Promise<void>;
};

async function saveEventsToStorage(events: FamEvent[]) {
  await AsyncStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  isHydrated: false,

  hydrateEvents: async () => {
    try {
      const raw = await AsyncStorage.getItem(EVENTS_STORAGE_KEY);
      const parsed: FamEvent[] = raw ? JSON.parse(raw) : [];
      set({ events: parsed, isHydrated: true });
    } catch (error) {
      console.error("Failed to hydrate events:", error);
      set({ events: [], isHydrated: true });
    }
  },

  addEvent: async (event) => {
    const nextEvents = [event, ...get().events];
    set({ events: nextEvents });
    try {
      await saveEventsToStorage(nextEvents);
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  },

  updateEvent: async (updatedEvent) => {
    const nextEvents = get().events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event,
    );
    set({ events: nextEvents });
    try {
      await saveEventsToStorage(nextEvents);
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  },

  getEventById: (id) => {
    return get().events.find((event) => event.id === id);
  },

  removeEvent: async (id) => {
    const nextEvents = get().events.filter((event) => event.id !== id);
    set({ events: nextEvents });
    try {
      await saveEventsToStorage(nextEvents);
    } catch (error) {
      console.error("Failed to remove event:", error);
    }
  },

  clearEvents: async () => {
    set({ events: [] });
    try {
      await AsyncStorage.removeItem(EVENTS_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear events:", error);
    }
  },
}));
