"use client";

import { useState } from "react";
import { CheckCircle2, Layers } from "lucide-react";
import { useAdminContent } from "@/lib/useAdminContent";
import { useUnsavedGuard } from "@/lib/useUnsavedGuard";
import { servicesData, type ServiceItem } from "@/data/services";
import {
  Field,
  LinesInput,
  ListEditor,
  Panel,
  SaveBar,
  RichField,
  TextInput,
  slugify,
} from "@/components/admin/fields";

/**
 * The service catalogue: the cards on the home page and /services.
 *
 * Each entry's id is also the slug of its detail page, so the card and
 * /services/[id] stay in step. The longer write-up for that page is edited
 * under Service Pages.
 */
export default function AdminServiceCatalogView() {
  const {
    data: services,
    setData: setServices,
    save,
    reset,
    loading,
    saving,
  } = useAdminContent("services", servicesData);

  const [dirty, setDirty] = useState(false);
  useUnsavedGuard(dirty);
  const [toast, setToast] = useState<string | null>(null);

  const notify = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = async () => {
    const ok = await save(services);
    setDirty(!ok);
    notify(ok ? "Catalogue saved and published." : "Could not save. Nothing was published.");
  };

  const handleReset = async () => {
    if (!confirm("Restore the built-in service catalogue? Your edits are lost.")) return;
    const ok = await reset();
    setDirty(false);
    notify(ok ? "Catalogue restored to defaults." : "Could not reset.");
  };

  return (
    <div className="space-y-6 animate-fadeIn font-mono">
      {toast && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>SERVICE CATALOGUE</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-sans">
            Services Catalogue
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            The cards shown on the home page and /services. Each entry&apos;s id is the URL of
            its detail page.
          </p>
        </div>

        <SaveBar
          onSave={handleSave}
          onReset={handleReset}
          saving={saving}
          loading={loading}
          dirty={dirty}
        />
      </div>

      <Panel
        title="Services"
        description="Order here is the order on the site. The bento layout on /services features the first four and the ninth entry, so keep the headline services near the top."
      >
        <ListEditor<ServiceItem>
          items={services}
          onChange={(next) => {
            setServices(next);
            setDirty(true);
          }}
          addLabel="Add service"
          makeItem={() => ({
            id: "new-service",
            title: "New Service",
            tagline: "",
            description: "",
            iconName: "Sparkles",
            color: "#189a91",
            gradient: "from-sky-600/20 via-cyan-500/10 to-transparent",
            features: [],
            deliverables: [],
            idealFor: "",
          })}
          itemLabel={(service) => service.title}
          renderItem={(service, update) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Title">
                <TextInput
                  value={service.title}
                  onChange={(title) => update({ ...service, title })}
                />
              </Field>
              <Field
                label="Id / slug"
                hint="Becomes /services/<id>. Must match the detail page's slug."
              >
                <TextInput
                  value={service.id}
                  onChange={(id) => update({ ...service, id: slugify(id) })}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Tagline">
                  <RichField
                    value={service.tagline}
                    rows={2}
                    inline
                    onChange={(tagline) => update({ ...service, tagline })}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Description">
                  <RichField
                    value={service.description}
                    rows={4}
                    inline
                    onChange={(description) => update({ ...service, description })}
                  />
                </Field>
              </div>
              <Field label="Ideal for">
                <TextInput
                  value={service.idealFor}
                  onChange={(idealFor) => update({ ...service, idealFor })}
                />
              </Field>
              <Field label="Icon name" hint="A lucide icon name, e.g. Stethoscope.">
                <TextInput
                  value={service.iconName}
                  onChange={(iconName) => update({ ...service, iconName })}
                />
              </Field>
              <Field label="Accent colour" hint="A hex value used for the card's glow.">
                <TextInput
                  value={service.color}
                  onChange={(color) => update({ ...service, color })}
                />
              </Field>
              <Field
                label="Gradient"
                hint="Tailwind gradient stops. Only values already used elsewhere in the site will render."
              >
                <TextInput
                  value={service.gradient}
                  onChange={(gradient) => update({ ...service, gradient })}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Features" hint="Shown as the card&apos;s bullet list.">
                  <LinesInput
                    value={service.features}
                    rows={6}
                    onChange={(features) => update({ ...service, features })}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Deliverables" hint="What the client receives.">
                  <LinesInput
                    value={service.deliverables}
                    onChange={(deliverables) => update({ ...service, deliverables })}
                  />
                </Field>
              </div>
            </div>
          )}
        />
      </Panel>
    </div>
  );
}
