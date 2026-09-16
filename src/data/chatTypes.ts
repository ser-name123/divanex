export type MessageSender = "user" | "ai" | "admin" | "system";

export interface ChatQuickReply {
  id: string;
  label: string;
  payload: string;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  sender: MessageSender;
  senderName?: string;
  text: string;
  timestamp: string; // ISO string
  quickReplies?: ChatQuickReply[];
  isAudioChime?: boolean;
}

export type ChatSessionStatus = "ai_active" | "admin_active" | "resolved" | "archived";

export interface ClientIntel {
  ip?: string;
  country?: string;
  countryCode?: string;
  city?: string;
  region?: string;
  timezone?: string;
  localTime?: string;
  userAgent?: string;
  browser?: string;
  browserVersion?: string;
  os?: string;
  deviceType?: "Desktop" | "Mobile" | "Tablet";
  screenResolution?: string;
  windowSize?: string;
  colorDepth?: string;
  devicePixelRatio?: number;
  cpuCores?: number;
  deviceMemoryGb?: number;
  language?: string;
  languages?: string[];
  connectionType?: string;
  downlinkSpeed?: string;
  roundTripTime?: string;
  referrerUrl?: string;
  currentPageUrl?: string;
  platform?: string;
  cookiesEnabled?: boolean;
  online?: boolean;
  touchPoints?: number;
  batteryStatus?: string;
}

export interface ChatSession {
  id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  isVerified: boolean;
  otpCode?: string;
  otpExpiresAt?: number;
  status: ChatSessionStatus;
  adminAssigned?: string;
  createdAt: string;
  updatedAt: string;
  lastMessageSnippet: string;
  unreadAdminCount: number;
  unreadUserCount: number;
  messages: ChatMessage[];
  notes?: string;
  clientIntel?: ClientIntel;
}

export interface LeadVerificationForm {
  name: string;
  email: string;
  phone: string;
}

