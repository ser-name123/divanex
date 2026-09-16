import AdminProjectDetailClient from "@/components/admin/AdminProjectDetailClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Command Center | Divanex Admin",
  description: "Enterprise project management, sprint milestones, and deliverable vault.",
};

export default async function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <AdminProjectDetailClient projectId={resolvedParams.id} />;
}
