"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminServiceConfig } from "@/data/adminData";
import {
  ExternalLink,
  Edit3,
  Check,
  Save,
  Clock,
  ShieldCheck,
  Sparkles,
  TrendingUp
} from "lucide-react";

interface AdminServicesProps {
  services: AdminServiceConfig[];
  onUpdateService: (updated: AdminServiceConfig) => void;
}

export default function AdminServicesView({
  services,
  onUpdateService
}: AdminServicesProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<AdminServiceConfig>>({});
  const [saveSuccessId, setSaveSuccessId] = useState<string | null>(null);

  const startEdit = (svc: AdminServiceConfig) => {
    setEditingId(svc.id);
    setEditForm({ ...svc });
  };

  const handleSave = (id: string) => {
    const original = services.find((s) => s.id === id);
    if (!original) return;

    const updated: AdminServiceConfig = {
      ...original,
      ...editForm
    };

    onUpdateService(updated);
    setEditingId(null);
    setSaveSuccessId(id);
    setTimeout(() => setSaveSuccessId(null), 2500);
  };

  const toggleActive = (svc: AdminServiceConfig) => {
    const updated: AdminServiceConfig = {
      ...svc,
      active: !svc.active
    };
    onUpdateService(updated);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div>
          <div className="flex items-center gap-2 text-sky-700 font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>SERVICE CATALOG & PRICING CONTROLLER</span>
          </div>
          <p className="text-slate-500 mt-1">
            Configure live public pricing ranges, SLA guarantees, and service visibility across the platform.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-bold">6 Capabilities Live & Operational</span>
        </div>
      </div>

      {/* Services Grid (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((svc) => {
          const isEditing = editingId === svc.id;
          return (
            <div
              key={svc.id}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all shadow-sm space-y-5 relative"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-t-2xl pointer-events-none opacity-80" />

              {/* Header: Service Name, Active Toggle & Live Preview Link */}
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-sky-700 font-bold uppercase tracking-wider">
                    {svc.slug}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">{svc.name}</h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleActive(svc)}
                    className="flex items-center gap-1 font-mono text-xs text-slate-600 hover:text-slate-900"
                    title={svc.active ? "Deactivate Service" : "Activate Service"}
                  >
                    {svc.active ? (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-medium">
                        PAUSED
                      </span>
                    )}
                  </button>

                  <Link
                    href={`/services/${svc.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-sky-300 text-slate-500 hover:text-sky-700 hover:bg-slate-100 transition-colors"
                    title="Preview Live Service Page ↗"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Pricing Tiers (MVP, Scale, Enterprise) */}
              <div className="space-y-3 font-mono text-xs">
                {isEditing ? (
                  <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-bold">MVP Sprint Price:</label>
                      <input
                        type="text"
                        value={editForm.mvpPrice || ""}
                        onChange={(e) => setEditForm({ ...editForm, mvpPrice: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-xs focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-bold">Scale Pod Price:</label>
                      <input
                        type="text"
                        value={editForm.scalePrice || ""}
                        onChange={(e) => setEditForm({ ...editForm, scalePrice: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-xs focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-bold">Enterprise Core Price:</label>
                      <input
                        type="text"
                        value={editForm.enterprisePrice || ""}
                        onChange={(e) => setEditForm({ ...editForm, enterprisePrice: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-xs focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">MVP Sprint</span>
                      <div className="font-bold text-slate-900 text-xs truncate">{svc.mvpPrice}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-200 space-y-1">
                      <span className="text-[10px] text-sky-700 uppercase font-bold">Scale Pod</span>
                      <div className="font-bold text-sky-800 text-xs truncate">{svc.scalePrice}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1">
                      <span className="text-[10px] text-purple-700 uppercase font-bold">Enterprise</span>
                      <div className="font-bold text-purple-800 text-xs truncate">{svc.enterprisePrice}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Meta: Duration & SLA */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>Duration: <strong className="text-slate-900">{svc.sprintDuration}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SLA: <strong className="text-emerald-700 font-bold">{svc.slaUptime}</strong></span>
                </div>
              </div>

              {/* Action Buttons: Edit / Save */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-xs">
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-sky-600" />
                  <span>{svc.leadCountThisMonth} inquiries this month</span>
                </div>

                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSave(svc.id)}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold flex items-center gap-1 shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => startEdit(svc)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-medium transition-colors"
                  >
                    <Edit3 className="w-3 h-3 text-sky-600" />
                    <span>Adjust Pricing</span>
                  </button>
                )}

                {saveSuccessId === svc.id && (
                  <span className="text-emerald-700 text-xs font-bold flex items-center gap-1 animate-pulse">
                    <Check className="w-3 h-3" /> Updated!
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
