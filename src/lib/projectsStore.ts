import { AdminProjectSprint, initialAdminProjects } from "@/data/adminData";

/**
 * Server-side singleton projects registry.
 *
 * Keeps the admin API routes consistent with each other, falling back to the
 * seeded enterprise records when a Supabase service role is not configured.
 *
 * This used to be shared with a client-facing portal, which is why it once
 * carried credential lookup, milestone approval and profile-editing helpers.
 * The portal is gone, so the store is now admin-only: read, upsert, delete.
 */

// Global cache across hot reloads in development
declare global {
  var __DIVANEX_PROJECTS_CACHE__: AdminProjectSprint[] | undefined;
}

function getMemoryStore(): AdminProjectSprint[] {
  if (!globalThis.__DIVANEX_PROJECTS_CACHE__) {
    // Deep clone initial projects
    globalThis.__DIVANEX_PROJECTS_CACHE__ = JSON.parse(JSON.stringify(initialAdminProjects));
  } else {
    // Filter out removed mock projects if initialAdminProjects is empty
    if (initialAdminProjects.length === 0) {
      globalThis.__DIVANEX_PROJECTS_CACHE__ = globalThis.__DIVANEX_PROJECTS_CACHE__.filter(
        (p) => !["proj-200", "proj-201", "proj-202", "proj-203"].includes(p.id)
      );
    }
  }
  // Sanitize any mock auto-generated SOW docs from submitted proposals
  for (const p of globalThis.__DIVANEX_PROJECTS_CACHE__!) {
    if (p.proposalStatus === "submitted" && p.documents) {
      p.documents = p.documents.filter((d) => !d.id.endsWith("-sow"));
    }
  }
  return globalThis.__DIVANEX_PROJECTS_CACHE__!;
}

export function getAllProjects(): AdminProjectSprint[] {
  return getMemoryStore();
}

export function getProjectById(id: string): AdminProjectSprint | null {
  const store = getMemoryStore();
  return store.find((p) => p.id === id) || null;
}

export function upsertProject(project: AdminProjectSprint): AdminProjectSprint {
  const store = getMemoryStore();
  const index = store.findIndex((p) => p.id === project.id);

  if (index >= 0) {
    store[index] = { ...store[index], ...project };
    return store[index];
  }

  store.unshift(project);
  return project;
}

export function deleteProject(id: string): boolean {
  const store = getMemoryStore();
  const index = store.findIndex((p) => p.id === id);
  if (index >= 0) {
    store.splice(index, 1);
    return true;
  }
  return false;
}
