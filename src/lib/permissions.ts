/**
 * Who may do what in the admin console.
 *
 * Roles used to be decorative: the operator directory carried a `role` string
 * that nothing ever read, and every signed-in session could reach every route.
 * This module is the single place that decides otherwise, so a permission
 * question has one answer rather than one per call site.
 *
 * It is deliberately free of imports. The same matrix has to hold on the server,
 * where it is enforced, and in the browser, where it only decides what to draw.
 * The browser copy is a convenience — hiding a button is not access control, and
 * every privileged route checks for itself.
 */

export const ROLES = ["owner", "manager", "editor", "viewer"] as const;
export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

/**
 * Permissions are `<resource>.<action>`.
 *
 * Resources follow the shape of the console rather than the shape of the
 * database: an operator thinks "can they edit content", not "can they update
 * the site_content row for the navigation collection".
 */
export const PERMISSIONS = [
  "content.view",
  "content.edit",
  "projects.view",
  "projects.edit",
  "chats.view",
  "chats.edit",
  "subscribers.view",
  "subscribers.edit",
  "settings.view",
  "settings.edit",
  "audit.view",
  "users.view",
  "users.manage",
] as const;
export type Permission = (typeof PERMISSIONS)[number];

const VIEW_ONLY: Permission[] = [
  "content.view",
  "projects.view",
  "chats.view",
  "subscribers.view",
];

/**
 * The matrix.
 *
 * Only `owner` may manage other admins, and only `owner` may change a role —
 * including their own. A console where a manager can promote themselves has
 * four roles and one privilege level.
 */
const MATRIX: Record<Role, readonly Permission[]> = {
  owner: PERMISSIONS,
  manager: [
    "content.view",
    "content.edit",
    "projects.view",
    "projects.edit",
    "chats.view",
    "chats.edit",
    "subscribers.view",
    "subscribers.edit",
    "settings.view",
    "settings.edit",
    "audit.view",
    "users.view",
  ],
  editor: [
    "content.view",
    "content.edit",
    "projects.view",
    "chats.view",
    "chats.edit",
    "subscribers.view",
  ],
  viewer: VIEW_ONLY,
};

export function permissionsFor(role: Role): readonly Permission[] {
  return MATRIX[role];
}

export function can(role: Role | null | undefined, permission: Permission): boolean {
  if (!role || !isRole(role)) return false;
  return MATRIX[role].includes(permission);
}

/** Human labels, used in the console and in the audit trail. */
export const ROLE_LABELS: Record<Role, string> = {
  owner: "Owner",
  manager: "Manager",
  editor: "Editor",
  viewer: "Viewer",
};

export const ROLE_SUMMARIES: Record<Role, string> = {
  owner: "Full access, including adding and removing admins.",
  manager: "Everything except managing admins.",
  editor: "Creates and edits content. No settings, no admins, no audit trail.",
  viewer: "Reads the console. Changes nothing.",
};

/**
 * The permission each console tab needs.
 *
 * Kept next to the matrix rather than in the sidebar, so adding a tab without
 * deciding who may see it is a type error rather than an accidentally public
 * page.
 */
export const TAB_PERMISSIONS: Record<string, Permission | null> = {
  overview: null,
  chats: "chats.view",
  subscribers: "subscribers.view",
  services: "content.view",
  projects: "projects.view",
  portfolio: "content.view",
  testimonials: "content.view",
  techstack: "content.view",
  blog: "content.view",
  seo: "content.view",
  sitemap: "content.view",
  siteconfig: "content.view",
  navigation: "content.view",
  pages: "content.view",
  sections: "content.view",
  forms: "content.view",
  "content-tools": "settings.view",
  cache: "settings.view",
  logs: "audit.view",
  audit: "audit.view",
  users: "users.view",
  settings: "settings.view",
};

export function canSeeTab(role: Role | null | undefined, tab: string): boolean {
  const needed = TAB_PERMISSIONS[tab];
  if (needed === null) return Boolean(role);
  if (needed === undefined) return false;
  return can(role, needed);
}
