"use client";

import { useState } from "react";
import { Tabs } from "@/components/admin/fields";
import type { AdminServiceConfig } from "@/data/adminData";
import AdminServicesView from "@/components/admin/AdminServicesView";
import AdminServiceCatalogView from "@/components/admin/AdminServiceCatalogView";
import AdminServicePagesView from "@/components/admin/AdminServicePagesView";
import AdminPortfolioView from "@/components/admin/AdminPortfolioView";
import AdminCaseStudyPagesView from "@/components/admin/AdminCaseStudyPagesView";
import AdminTechStackView from "@/components/admin/AdminTechStackView";
import AdminTechPagesView from "@/components/admin/AdminTechPagesView";

/**
 * Sub-tab wrappers.
 *
 * Services, the portfolio and the tech stack each have two sides now: the cards
 * a visitor sees in a listing, and the full page behind each card. Splitting
 * them into sub-tabs keeps the sidebar the length it was while making the
 * detail pages reachable.
 */

export function AdminServicesTab({
  services,
  onUpdateService,
}: {
  services: AdminServiceConfig[];
  onUpdateService: (updated: AdminServiceConfig) => void;
}) {
  const [tab, setTab] = useState("operations");

  return (
    <div className="space-y-6">
      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "operations", label: "Delivery settings" },
          { id: "catalogue", label: "Website catalogue" },
          { id: "pages", label: "Service pages" },
        ]}
      />
      {tab === "operations" && (
        <AdminServicesView services={services} onUpdateService={onUpdateService} />
      )}
      {tab === "catalogue" && <AdminServiceCatalogView />}
      {tab === "pages" && <AdminServicePagesView />}
    </div>
  );
}

export function AdminPortfolioTab() {
  const [tab, setTab] = useState("cards");

  return (
    <div className="space-y-6">
      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "cards", label: "Portfolio cards" },
          { id: "pages", label: "Case study pages" },
        ]}
      />
      {tab === "cards" && <AdminPortfolioView />}
      {tab === "pages" && <AdminCaseStudyPagesView />}
    </div>
  );
}

export function AdminTechTab() {
  const [tab, setTab] = useState("registry");

  return (
    <div className="space-y-6">
      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "registry", label: "Technology grid" },
          { id: "pages", label: "Technology pages" },
        ]}
      />
      {tab === "registry" && <AdminTechStackView />}
      {tab === "pages" && <AdminTechPagesView />}
    </div>
  );
}
