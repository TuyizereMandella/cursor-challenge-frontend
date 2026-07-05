import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { generateLeadTimeNotifications, applyDemoNotificationDueDates } from "@/data/notificationEngine";
import { countDueSoonMilestones, createChildProfile } from "@/data/timelineEngine";
import type { AddChildInput, ChildProfile, ParentUser } from "@/types/user";
import type { AppNotification, LeadTimeDays } from "@/types/notification";
import { DEFAULT_REMINDER_CHANNELS } from "@/types/auth";
import { useAuth } from "@/contexts/AuthContext";

interface ParentContextValue {
  user: ParentUser;
  children: ChildProfile[];
  unreadReminders: number;
  activeChildId: string | null;
  activeChild: ChildProfile | null;
  notifications: AppNotification[];
  unreadNotificationCount: number;
  notificationLeadTime: LeadTimeDays;
  setActiveChildId: (id: string | null) => void;
  setNotificationLeadTime: (days: LeadTimeDays) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  readNotificationIds: Set<string>;
  addChild: (input: AddChildInput) => ChildProfile;
  toggleMilestone: (childId: string, milestoneId: string) => void;
  setPreferredHospital: (childId: string, hospitalId: string) => void;
  setVaccinationCardImage: (childId: string, imageUrl: string | null) => void;
}

const ParentContext = createContext<ParentContextValue | null>(null);

function createChildId(): string {
  return `child-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function ParentProvider({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth();
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [activeChildId, setActiveChildId] = useState<string | null>(null);
  const [notificationLeadTime, setNotificationLeadTime] = useState<LeadTimeDays>(3);
  const [readNotificationIds, setReadNotificationIds] = useState<Set<string>>(new Set());

  const addChild = useCallback((input: AddChildInput) => {
    const newChild = applyDemoNotificationDueDates(
      createChildProfile({
        id: createChildId(),
        name: input.name.trim(),
        dateOfBirth: input.dateOfBirth,
        sex: input.sex,
      }),
    );

    setChildProfiles((current) => [...current, newChild]);
    setActiveChildId(newChild.id);

    return newChild;
  }, []);

  const toggleMilestone = useCallback((childId: string, milestoneId: string) => {
    setChildProfiles((current) =>
      current.map((child) => {
        if (child.id !== childId) {
          return child;
        }

        return {
          ...child,
          milestones: child.milestones.map((milestone) => {
            if (milestone.id !== milestoneId) {
              return milestone;
            }

            const completed = !milestone.completed;

            return {
              ...milestone,
              completed,
              completedAt: completed ? new Date().toISOString().split("T")[0] : undefined,
            };
          }),
        };
      }),
    );
  }, []);

  const setPreferredHospital = useCallback((childId: string, hospitalId: string) => {
    setChildProfiles((current) =>
      current.map((child) => {
        if (child.id !== childId) {
          return child;
        }

        const isCurrentlyPreferred = child.preferredHospitalId === hospitalId;

        return {
          ...child,
          preferredHospitalId: isCurrentlyPreferred ? null : hospitalId,
        };
      }),
    );
  }, []);

  const setVaccinationCardImage = useCallback(
    (childId: string, imageUrl: string | null) => {
      setChildProfiles((current) =>
        current.map((child) =>
          child.id === childId
            ? { ...child, vaccinationCardImageUrl: imageUrl }
            : child,
        ),
      );
    },
    [],
  );

  const activeChild = useMemo(
    () => childProfiles.find((child) => child.id === activeChildId) ?? null,
    [childProfiles, activeChildId],
  );

  const notifications = useMemo(
    () => generateLeadTimeNotifications(childProfiles, notificationLeadTime),
    [childProfiles, notificationLeadTime],
  );

  const unreadNotificationCount = useMemo(
    () => notifications.filter((n) => !readNotificationIds.has(n.id)).length,
    [notifications, readNotificationIds],
  );

  const unreadReminders = useMemo(
    () =>
      childProfiles.reduce(
        (total, child) => total + countDueSoonMilestones(child.milestones),
        0,
      ),
    [childProfiles],
  );

  const markNotificationRead = useCallback((id: string) => {
    setReadNotificationIds((current) => new Set([...current, id]));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setReadNotificationIds(
      (current) => new Set([...current, ...notifications.map((n) => n.id)]),
    );
  }, [notifications]);

  const value = useMemo<ParentContextValue>(
    () => ({
      user: {
        id: authUser?.id ?? "parent-unknown",
        name: authUser?.name ?? "Parent",
        email: authUser?.email ?? "",
        initials: authUser?.initials ?? "PA",
        phone: authUser?.phone ?? "",
        reminderChannels: authUser?.reminderChannels ?? DEFAULT_REMINDER_CHANNELS,
      },
      children: childProfiles,
      unreadReminders,
      activeChildId,
      activeChild,
      notifications,
      unreadNotificationCount,
      notificationLeadTime,
      readNotificationIds,
      setActiveChildId,
      setNotificationLeadTime,
      markNotificationRead,
      markAllNotificationsRead,
      addChild,
      toggleMilestone,
      setPreferredHospital,
      setVaccinationCardImage,
    }),
    [
      authUser,
      childProfiles,
      unreadReminders,
      activeChildId,
      activeChild,
      notifications,
      unreadNotificationCount,
      notificationLeadTime,
      readNotificationIds,
      markNotificationRead,
      markAllNotificationsRead,
      addChild,
      toggleMilestone,
      setPreferredHospital,
      setVaccinationCardImage,
    ],
  );

  return (
    <ParentContext.Provider value={value}>{children}</ParentContext.Provider>
  );
}

export function useParentContext(): ParentContextValue {
  const context = useContext(ParentContext);
  if (!context) {
    throw new Error("useParentContext must be used within a ParentProvider");
  }
  return context;
}
