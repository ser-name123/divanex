import { randomUUID } from "node:crypto";

export interface AppNotification {
  id: string;
  target: "admin" | "client" | "all";
  clientId?: string;
  clientName?: string;
  projectId?: string;
  projectName?: string;
  sender: "admin" | "client" | "system";
  senderName: string;
  title: string;
  message: string;
  type: "payment" | "feedback" | "document" | "project" | "profile" | "admin_alert" | "system" | "milestone";
  priority: "normal" | "urgent" | "success" | "info";
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Global cache across hot reloads in development
declare global {
  var __DIVANEX_NOTIFICATIONS_CACHE__: AppNotification[] | undefined;
}

const initialNotifications: AppNotification[] = [];

function getNotificationStore(): AppNotification[] {
  if (!globalThis.__DIVANEX_NOTIFICATIONS_CACHE__) {
    globalThis.__DIVANEX_NOTIFICATIONS_CACHE__ = JSON.parse(JSON.stringify(initialNotifications));
  }
  return globalThis.__DIVANEX_NOTIFICATIONS_CACHE__!;
}

export function getAdminNotifications(): AppNotification[] {
  const store = getNotificationStore();
  return store
    .filter((n) => n.target === "admin" || n.target === "all")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getClientNotifications(clientId?: string, username?: string): AppNotification[] {
  const store = getNotificationStore();
  return store
    .filter((n) => {
      if (n.target === "all") return true;
      if (n.target === "client") {
        if (!n.clientId) return true;
        if (clientId && n.clientId === clientId) return true;
        if (username && n.clientId.toLowerCase().includes(username.toLowerCase())) return true;
      }
      return false;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createNotification(params: Omit<AppNotification, "id" | "createdAt" | "read">): AppNotification {
  const store = getNotificationStore();
  const newNotif: AppNotification = {
    ...params,
    id: `notif-${randomUUID().slice(0, 8)}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  store.unshift(newNotif);
  return newNotif;
}

export function markNotificationRead(id: string): boolean {
  const store = getNotificationStore();
  const notif = store.find((n) => n.id === id);
  if (notif) {
    notif.read = true;
    return true;
  }
  return false;
}

export function markAllNotificationsRead(target: "admin" | "client", clientId?: string): void {
  const store = getNotificationStore();
  for (const notif of store) {
    if (target === "admin" && (notif.target === "admin" || notif.target === "all")) {
      notif.read = true;
    } else if (target === "client" && (notif.target === "client" || notif.target === "all")) {
      if (!clientId || !notif.clientId || notif.clientId === clientId) {
        notif.read = true;
      }
    }
  }
}

export function deleteNotification(id: string): boolean {
  const store = getNotificationStore();
  const index = store.findIndex((n) => n.id === id);
  if (index >= 0) {
    store.splice(index, 1);
    return true;
  }
  return false;
}
