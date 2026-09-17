import { ok, serverError } from "@/lib/api";
import { requirePermission } from "@/lib/guard";
import { listAuditActions, queryAudit, type AuditEvent } from "@/lib/auditStore";

/**
 * The audit trail, read side.
 *
 * `?format=csv` returns the same rows as a download rather than a second
 * endpoint, so a filtered view and its export can never disagree about what
 * they contain.
 *
 * The export is capped well below the query limit. An audit trail is read to
 * answer a question, and a question that needs every row since the beginning
 * is one for the database, not for a browser download.
 */

const EXPORT_LIMIT = 5000;

/** RFC 4180: quotes doubled, the whole field quoted if it holds a separator. */
function csvCell(value: unknown): string {
  const text =
    value === null || value === undefined
      ? ""
      : typeof value === "string"
        ? value
        : JSON.stringify(value);

  if (/[",\r\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function toCsv(events: AuditEvent[]): string {
  const header = [
    "time",
    "actor",
    "actor_role",
    "action",
    "target",
    "outcome",
    "ip",
    "detail",
    "changes",
  ];

  const rows = events.map((event) =>
    [
      event.at,
      event.actorName ? `${event.actorName} <${event.actorEmail ?? ""}>` : (event.actorEmail ?? ""),
      event.actorRole ?? "",
      event.action,
      event.targetLabel ?? "",
      event.outcome,
      event.ipAddress ?? "",
      event.detail ?? "",
      event.changes
        .map((c) => `${c.field}: ${JSON.stringify(c.before)} -> ${JSON.stringify(c.after)}`)
        .join(" | "),
    ]
      .map(csvCell)
      .join(",")
  );

  // Excel reads a bare UTF-8 CSV as the local codepage and mangles any name
  // with an accent in it. The BOM is what makes it open correctly.
  return `﻿${[header.join(","), ...rows].join("\r\n")}\r\n`;
}

export async function GET(request: Request) {
  try {
    const check = await requirePermission("audit.view");
    if (!check.ok) return check.response;

    const url = new URL(request.url);
    const params = url.searchParams;
    const format = params.get("format");

    const query = {
      actor: params.get("actor") || undefined,
      action: params.get("action") || undefined,
      outcome: params.get("outcome") || undefined,
      from: params.get("from") || undefined,
      to: params.get("to") || undefined,
      search: params.get("search") || undefined,
      limit: format === "csv" ? EXPORT_LIMIT : Number(params.get("limit")) || 50,
      offset: format === "csv" ? 0 : Number(params.get("offset")) || 0,
    };

    const { events, total } = await queryAudit(query);

    if (format === "csv") {
      const stamp = new Date().toISOString().slice(0, 10);
      return new Response(toCsv(events), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="audit-trail-${stamp}.csv"`,
          "Cache-Control": "no-store",
        },
      });
    }

    return ok({
      events,
      total,
      actions: await listAuditActions(),
      limit: query.limit,
      offset: query.offset,
    });
  } catch (error) {
    return serverError("audit:list", error);
  }
}
