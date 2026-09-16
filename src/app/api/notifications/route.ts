import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getAdminNotifications,
  createNotification,
  markNotificationRead,
  markAllNotificationsRead,
  AppNotification,
} from "@/lib/notificationsStore";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { readJson, serverError } from "@/lib/api";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    const session = verifySessionToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized admin session." }, { status: 401 });
    }

    const notifications = getAdminNotifications();
    const unreadCount = notifications.filter((n) => !n.read).length;

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (err: unknown) {
    return serverError("notifications", err);
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    const session = verifySessionToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized admin session." }, { status: 401 });
    }

    const body = await readJson<{
      title: string;
      message: string;
      priority?: AppNotification["priority"];
      type?: AppNotification["type"];
      target?: "client" | "all" | "admin";
      clientId?: string;
      clientName?: string;
      projectId?: string;
      projectName?: string;
      actionUrl?: string;
    }>(request);

    if (!body?.title?.trim() || !body?.message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Notification Title and Message are required." },
        { status: 400 }
      );
    }

    const newNotification = createNotification({
      target: body.target || "client",
      clientId: body.clientId,
      clientName: body.clientName,
      projectId: body.projectId,
      projectName: body.projectName,
      sender: "admin",
      senderName: session.sub || "Divanex Administration",
      title: body.title.trim(),
      message: body.message.trim(),
      type: body.type || "admin_alert",
      priority: body.priority || "normal",
      actionUrl: body.actionUrl || "overview",
    });

    return NextResponse.json({
      success: true,
      notification: newNotification,
    });
  } catch (err: unknown) {
    return serverError("notifications", err);
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    const session = verifySessionToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized admin session." }, { status: 401 });
    }

    const body = await readJson<{ id?: string; markAll?: boolean }>(request);

    if (body?.markAll) {
      markAllNotificationsRead("admin");
      return NextResponse.json({ success: true, message: "All notifications marked as read." });
    }

    if (body?.id) {
      const ok = markNotificationRead(body.id);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ success: false, error: "Invalid request payload." }, { status: 400 });
  } catch (err: unknown) {
    return serverError("notifications", err);
  }
}
