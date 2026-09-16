"use client";

import { useState } from "react";
import { CheckCircle2, LayoutTemplate } from "lucide-react";
import { useAdminContent } from "@/lib/useAdminContent";
import { useUnsavedGuard } from "@/lib/useUnsavedGuard";
import {
  DEFAULT_PAGE_CONTENT,
  type CadenceStep,
  type EngagementModel,
  type HeaderStat,
  type PageHeaderContent,
  type PartnerItem,
  type SecurityPillar,
  type SectionHeading,
  type StatCounter,
} from "@/data/pageContent";
import type { FAQItem } from "@/data/testimonials";
import type { ComparisonRow, WhyPillar } from "@/data/whyChooseUs";
import type { ProcessStep } from "@/data/process";
import {
  AccentPicker,
  Field,
  IconPicker,
  LinesInput,
  ListEditor,
  NumberInput,
  Panel,
  SaveBar,
  Tabs,
  RichField,
  TextInput,
  makeId,
} from "@/components/admin/fields";

/**
 * Page copy editor.
 *
 * Page headers, the home-page sections, the why-us pillars, the process
 * timeline and the FAQ list were all literals inside components. Everything
 * here writes to the record those components now render from.
 */
export default function AdminPagesView() {
  const {
    data: content,
    setData: setContent,
    save,
    reset,
    loading,
    saving,
  } = useAdminContent("pages", DEFAULT_PAGE_CONTENT);

  const [tab, setTab] = useState("headers");
  const [route, setRoute] = useState("/services");
  const [dirty, setDirty] = useState(false);
  useUnsavedGuard(dirty);
  const [toast, setToast] = useState<string | null>(null);

  const notify = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  const patch = (next: Partial<typeof content>) => {
    setContent({ ...content, ...next });
    setDirty(true);
  };

  const handleSave = async () => {
    const ok = await save(content);
    setDirty(!ok);
    notify(
      ok ? "Page content saved and published." : "Could not save. Nothing was published."
    );
  };

  const handleReset = async () => {
    if (!confirm("Restore all page copy to the built-in defaults? Your edits are lost.")) return;
    const ok = await reset();
    setDirty(false);
    notify(ok ? "Page content restored to defaults." : "Could not reset.");
  };

  const routes = Object.keys(content.headers ?? {});
  const header: PageHeaderContent | undefined = content.headers?.[route];

  const setHeader = (next: Partial<PageHeaderContent>) => {
    if (!header) return;
    patch({ headers: { ...content.headers, [route]: { ...header, ...next } } });
  };

  const headingFields = (
    heading: SectionHeading,
    update: (next: SectionHeading) => void,
    options: { highlight?: boolean } = { highlight: true }
  ) => (
    <div className="space-y-3">
      <Field label="Eyebrow" hint="The small label above the heading.">
        <TextInput value={heading.eyebrow} onChange={(eyebrow) => update({ ...heading, eyebrow })} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Heading">
          <TextInput value={heading.title} onChange={(title) => update({ ...heading, title })} />
        </Field>
        {options.highlight !== false && (
          <Field label="Highlighted part" hint="Rendered in the gradient accent.">
            <TextInput
              value={heading.highlight}
              onChange={(highlight) => update({ ...heading, highlight })}
            />
          </Field>
        )}
      </div>
      <Field label="Description">
        <RichField inline
          value={heading.description}
          onChange={(description) => update({ ...heading, description })}
        />
      </Field>
    </div>
  );

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
            <LayoutTemplate className="w-3.5 h-3.5 text-sky-600" />
            <span>PAGE HEADERS & SECTION COPY</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-sans">
            Page Content
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            The header at the top of each page, the home-page sections, the why-us pillars,
            the process timeline and the FAQ list.
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

      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "headers", label: "Page headers" },
          { id: "home", label: "Home sections" },
          { id: "why", label: "Why us" },
          { id: "process", label: "Process" },
          { id: "faqs", label: "FAQs" },
          { id: "cta", label: "Call to action" },
          { id: "extra", label: "Engagement & trust" },
        ]}
      />

      {tab === "headers" && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {routes.map((path) => (
              <button
                key={path}
                type="button"
                onClick={() => setRoute(path)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                  route === path
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:border-sky-300"
                }`}
              >
                {path}
              </button>
            ))}
          </div>

          {header && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Panel title={`Header copy — ${route}`} description="Badge, headline, description and the action button.">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Badge">
                      <TextInput value={header.badge} onChange={(badge) => setHeader({ badge })} />
                    </Field>
                    <Field label="Badge icon">
                      <IconPicker
                        value={header.badgeIcon}
                        onChange={(badgeIcon) => setHeader({ badgeIcon })}
                      />
                    </Field>
                    <Field label="Breadcrumb label">
                      <TextInput
                        value={header.breadcrumbLabel}
                        onChange={(breadcrumbLabel) => setHeader({ breadcrumbLabel })}
                      />
                    </Field>
                    <Field label="Status line" hint="Shown above the telemetry card.">
                      <TextInput
                        value={header.statusText}
                        onChange={(statusText) => setHeader({ statusText })}
                      />
                    </Field>
                    <Field label="Headline">
                      <TextInput value={header.title} onChange={(title) => setHeader({ title })} />
                    </Field>
                    <Field label="Highlighted part">
                      <TextInput
                        value={header.titleHighlight}
                        onChange={(titleHighlight) => setHeader({ titleHighlight })}
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <RichField inline
                      value={header.description}
                      rows={4}
                      onChange={(description) => setHeader({ description })}
                    />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Button label">
                      <TextInput
                        value={header.actionLabel}
                        onChange={(actionLabel) => setHeader({ actionLabel })}
                      />
                    </Field>
                    <Field label="Button link">
                      <TextInput
                        value={header.actionHref}
                        onChange={(actionHref) => setHeader({ actionHref })}
                      />
                    </Field>
                  </div>
                </div>
              </Panel>

              <Panel
                title="Telemetry figures"
                description="The 2×2 metric card beside the headline. Four entries fill it."
              >
                <ListEditor<HeaderStat>
                  items={header.stats}
                  onChange={(stats) => setHeader({ stats })}
                  addLabel="Add figure"
                  makeItem={() => ({
                    id: makeId("stat"),
                    label: "New metric",
                    value: "0",
                    detail: "",
                    icon: "Activity",
                    accent: "sky",
                  })}
                  itemLabel={(stat) => `${stat.label} — ${stat.value}`}
                  renderItem={(stat, update) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Label">
                        <TextInput value={stat.label} onChange={(label) => update({ ...stat, label })} />
                      </Field>
                      <Field label="Value">
                        <TextInput value={stat.value} onChange={(value) => update({ ...stat, value })} />
                      </Field>
                      <Field label="Detail">
                        <TextInput
                          value={stat.detail}
                          onChange={(detail) => update({ ...stat, detail })}
                        />
                      </Field>
                      <Field label="Icon">
                        <IconPicker value={stat.icon} onChange={(icon) => update({ ...stat, icon })} />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Accent">
                          <AccentPicker
                            value={stat.accent}
                            onChange={(accentName) => update({ ...stat, accent: accentName })}
                          />
                        </Field>
                      </div>
                    </div>
                  )}
                />
              </Panel>
            </div>
          )}
        </div>
      )}

      {tab === "home" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Panel
            title="Partner marquee"
            description="The scrolling logo strip under the hero."
          >
            <div className="space-y-4">
              <Field label="Strip heading">
                <RichField inline
                  value={content.partnersEyebrow}
                  rows={2}
                  onChange={(partnersEyebrow) => patch({ partnersEyebrow })}
                />
              </Field>
              <ListEditor<PartnerItem>
                items={content.partners}
                onChange={(partners) => patch({ partners })}
                title="Partners"
                addLabel="Add partner"
                makeItem={() => ({
                  id: makeId("partner"),
                  name: "New partner",
                  category: "",
                  badge: "⚡",
                })}
                itemLabel={(partner) => partner.name}
                renderItem={(partner, update) => (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Field label="Name">
                      <TextInput value={partner.name} onChange={(name) => update({ ...partner, name })} />
                    </Field>
                    <Field label="Category">
                      <TextInput
                        value={partner.category}
                        onChange={(category) => update({ ...partner, category })}
                      />
                    </Field>
                    <Field label="Emoji" hint="One or two characters.">
                      <TextInput
                        value={partner.badge}
                        maxLength={4}
                        onChange={(badge) => update({ ...partner, badge })}
                      />
                    </Field>
                  </div>
                )}
              />
            </div>
          </Panel>

          <Panel
            title="Impact counters"
            description="The animated figures further down the home page."
          >
            <ListEditor<StatCounter>
              items={content.statCounters}
              onChange={(statCounters) => patch({ statCounters })}
              addLabel="Add counter"
              makeItem={() => ({
                id: makeId("counter"),
                target: 0,
                suffix: "+",
                label: "New counter",
                subtitle: "",
                icon: "Activity",
                accent: "sky",
              })}
              itemLabel={(counter) => `${counter.label} — ${counter.target}${counter.suffix}`}
              renderItem={(counter, update) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Label">
                    <TextInput value={counter.label} onChange={(label) => update({ ...counter, label })} />
                  </Field>
                  <Field label="Subtitle">
                    <TextInput
                      value={counter.subtitle}
                      onChange={(subtitle) => update({ ...counter, subtitle })}
                    />
                  </Field>
                  <Field label="Counts up to" hint="Whole numbers only — the counter animates to this.">
                    <NumberInput
                      value={counter.target}
                      onChange={(target) => update({ ...counter, target })}
                    />
                  </Field>
                  <Field label="Suffix" hint="Rendered after the number, e.g. + or %.">
                    <TextInput
                      value={counter.suffix}
                      maxLength={4}
                      onChange={(suffix) => update({ ...counter, suffix })}
                    />
                  </Field>
                  <Field label="Icon">
                    <IconPicker value={counter.icon} onChange={(icon) => update({ ...counter, icon })} />
                  </Field>
                  <Field label="Accent">
                    <AccentPicker
                      value={counter.accent}
                      onChange={(accentName) => update({ ...counter, accent: accentName })}
                    />
                  </Field>
                </div>
              )}
            />
          </Panel>
        </div>
      )}

      {tab === "why" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Panel title="Section heading" description="Above the four pillars.">
              {headingFields(content.whyUsHeading, (whyUsHeading) => patch({ whyUsHeading }))}
            </Panel>
            <Panel title="Comparison heading" description="Above the benchmark table.">
              <div className="space-y-4">
                {headingFields(
                  content.comparisonHeading,
                  (comparisonHeading) => patch({ comparisonHeading }),
                  { highlight: false }
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                  {(["feature", "divanex", "traditional", "freelancers"] as const).map((key) => (
                    <Field key={key} label={`Column: ${key}`}>
                      <TextInput
                        value={content.comparisonColumns[key]}
                        onChange={(next) =>
                          patch({
                            comparisonColumns: { ...content.comparisonColumns, [key]: next },
                          })
                        }
                      />
                    </Field>
                  ))}
                </div>
              </div>
            </Panel>
          </div>

          <Panel title="Pillars" description="The four advantage cards.">
            <ListEditor<WhyPillar>
              items={content.whyUsPillars}
              onChange={(whyUsPillars) => patch({ whyUsPillars })}
              addLabel="Add pillar"
              makeItem={() => ({
                id: makeId("pillar"),
                title: "New pillar",
                subtitle: "",
                description: "",
                iconName: "Sparkles",
                badge: "",
                metrics: "",
                color: "#189a91",
              })}
              itemLabel={(pillar) => pillar.title}
              renderItem={(pillar, update) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Title">
                    <TextInput value={pillar.title} onChange={(title) => update({ ...pillar, title })} />
                  </Field>
                  <Field label="Subtitle">
                    <TextInput
                      value={pillar.subtitle}
                      onChange={(subtitle) => update({ ...pillar, subtitle })}
                    />
                  </Field>
                  <Field label="Metric pill" hint="Top-right of the card.">
                    <TextInput
                      value={pillar.metrics}
                      onChange={(metrics) => update({ ...pillar, metrics })}
                    />
                  </Field>
                  <Field label="Footer badge">
                    <TextInput value={pillar.badge} onChange={(badge) => update({ ...pillar, badge })} />
                  </Field>
                  <Field label="Icon">
                    <IconPicker
                      value={pillar.iconName}
                      onChange={(iconName) => update({ ...pillar, iconName })}
                    />
                  </Field>
                  <Field label="Accent bar colour" hint="A hex value, used for the top stripe only.">
                    <TextInput value={pillar.color} onChange={(color) => update({ ...pillar, color })} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Description">
                      <RichField inline
                        value={pillar.description}
                        onChange={(description) => update({ ...pillar, description })}
                      />
                    </Field>
                  </div>
                </div>
              )}
            />
          </Panel>

          <Panel title="Comparison rows" description="One row per evaluation vector.">
            <ListEditor<ComparisonRow>
              items={content.whyUsComparison}
              onChange={(whyUsComparison) => patch({ whyUsComparison })}
              addLabel="Add row"
              makeItem={() => ({
                feature: "New vector",
                divanex: "",
                traditional: "",
                freelancers: "",
              })}
              itemLabel={(row) => row.feature}
              renderItem={(row, update) => (
                <div className="space-y-3">
                  <Field label="Evaluation vector">
                    <TextInput value={row.feature} onChange={(feature) => update({ ...row, feature })} />
                  </Field>
                  <Field label="Divanex">
                    <RichField inline
                      value={row.divanex}
                      rows={2}
                      onChange={(divanex) => update({ ...row, divanex })}
                    />
                  </Field>
                  <Field label="Traditional agency">
                    <RichField inline
                      value={row.traditional}
                      rows={2}
                      onChange={(traditional) => update({ ...row, traditional })}
                    />
                  </Field>
                  <Field label="Freelancers">
                    <RichField inline
                      value={row.freelancers}
                      rows={2}
                      onChange={(freelancers) => update({ ...row, freelancers })}
                    />
                  </Field>
                </div>
              )}
            />
          </Panel>
        </div>
      )}

      {tab === "process" && (
        <div className="space-y-6">
          <Panel title="Section heading" description="Above the delivery timeline.">
            {headingFields(content.processHeading, (processHeading) => patch({ processHeading }))}
          </Panel>

          <Panel title="Phases" description="One card per phase, in delivery order.">
            <ListEditor<ProcessStep>
              items={content.processSteps}
              onChange={(processSteps) => patch({ processSteps })}
              addLabel="Add phase"
              makeItem={() => ({
                stepNumber: String((content.processSteps?.length ?? 0) + 1).padStart(2, "0"),
                title: "New phase",
                hindiSummary: "",
                description: "",
                duration: "",
                deliverables: [],
                color: "#189a91",
                icon: "Layers",
              })}
              itemLabel={(step) => `${step.stepNumber}. ${step.title}`}
              renderItem={(step, update) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Number">
                    <TextInput
                      value={step.stepNumber}
                      maxLength={4}
                      onChange={(stepNumber) => update({ ...step, stepNumber })}
                    />
                  </Field>
                  <Field label="Title">
                    <TextInput value={step.title} onChange={(title) => update({ ...step, title })} />
                  </Field>
                  <Field label="Short summary">
                    <TextInput
                      value={step.hindiSummary}
                      onChange={(hindiSummary) => update({ ...step, hindiSummary })}
                    />
                  </Field>
                  <Field label="Duration">
                    <TextInput
                      value={step.duration}
                      onChange={(duration) => update({ ...step, duration })}
                    />
                  </Field>
                  <Field label="Icon">
                    <IconPicker value={step.icon} onChange={(icon) => update({ ...step, icon })} />
                  </Field>
                  <Field label="Colour" hint="A hex value for the timeline marker.">
                    <TextInput value={step.color} onChange={(color) => update({ ...step, color })} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Description">
                      <RichField inline
                        value={step.description}
                        onChange={(description) => update({ ...step, description })}
                      />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Deliverables" hint="What the client receives at the end of this phase.">
                      <LinesInput
                        value={step.deliverables}
                        onChange={(deliverables) => update({ ...step, deliverables })}
                      />
                    </Field>
                  </div>
                </div>
              )}
            />
          </Panel>
        </div>
      )}

      {tab === "faqs" && (
        <div className="space-y-6">
          <Panel title="Section heading" description="Above the accordion.">
            {headingFields(content.faqHeading, (faqHeading) => patch({ faqHeading }))}
          </Panel>

          <Panel
            title="Questions"
            description="Shown on the home page and /faqs, and published as FAQ structured data for search engines."
          >
            <ListEditor<FAQItem>
              items={content.faqs}
              onChange={(faqs) => patch({ faqs })}
              addLabel="Add question"
              makeItem={() => ({
                id: makeId("faq"),
                question: "New question",
                answer: "",
                category: "General",
              })}
              itemLabel={(faq) => faq.question}
              renderItem={(faq, update) => (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <Field label="Question">
                        <TextInput
                          value={faq.question}
                          onChange={(question) => update({ ...faq, question })}
                        />
                      </Field>
                    </div>
                    <Field label="Category">
                      <TextInput
                        value={faq.category ?? ""}
                        onChange={(category) => update({ ...faq, category })}
                      />
                    </Field>
                  </div>
                  <Field label="Answer" hint="Headings, lists and links are all allowed here.">
                    <RichField
                      value={faq.answer}
                      rows={5}
                      onChange={(answer) => update({ ...faq, answer })}
                    />
                  </Field>
                </div>
              )}
            />
          </Panel>
        </div>
      )}

      {tab === "cta" && (
        <div className="space-y-6">
          <Panel
            title="Default call to action"
            description="The banner at the foot of most pages. Pages without their own copy use this."
          >
            <div className="space-y-3">
              <Field label="Badge">
                <TextInput
                  value={content.ctaBanner.badge}
                  onChange={(badge) => patch({ ctaBanner: { ...content.ctaBanner, badge } })}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Headline">
                  <TextInput
                    value={content.ctaBanner.title}
                    onChange={(title) => patch({ ctaBanner: { ...content.ctaBanner, title } })}
                  />
                </Field>
                <Field label="Highlighted part">
                  <TextInput
                    value={content.ctaBanner.highlight}
                    onChange={(highlight) =>
                      patch({ ctaBanner: { ...content.ctaBanner, highlight } })
                    }
                  />
                </Field>
              </div>
              <Field label="Body">
                <RichField inline
                  value={content.ctaBanner.subtitle}
                  onChange={(subtitle) => patch({ ctaBanner: { ...content.ctaBanner, subtitle } })}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Primary button label">
                  <TextInput
                    value={content.ctaBanner.primaryLabel}
                    onChange={(primaryLabel) =>
                      patch({ ctaBanner: { ...content.ctaBanner, primaryLabel } })
                    }
                  />
                </Field>
                <Field label="Primary button link">
                  <TextInput
                    value={content.ctaBanner.primaryHref}
                    onChange={(primaryHref) =>
                      patch({ ctaBanner: { ...content.ctaBanner, primaryHref } })
                    }
                  />
                </Field>
                <Field label="Secondary button label">
                  <TextInput
                    value={content.ctaBanner.secondaryLabel}
                    onChange={(secondaryLabel) =>
                      patch({ ctaBanner: { ...content.ctaBanner, secondaryLabel } })
                    }
                  />
                </Field>
                <Field label="Secondary button link">
                  <TextInput
                    value={content.ctaBanner.secondaryHref}
                    onChange={(secondaryHref) =>
                      patch({ ctaBanner: { ...content.ctaBanner, secondaryHref } })
                    }
                  />
                </Field>
              </div>
            </div>
          </Panel>

          <Panel
            title="Per-page headlines"
            description="Each page can replace the headline and body above. The buttons stay shared."
          >
            <div className="space-y-3">
              {Object.entries(content.ctaOverrides ?? {}).map(([path, override]) => (
                <details key={path} className="rounded-xl border border-slate-200 bg-slate-50/60">
                  <summary className="px-3 py-2 text-xs font-semibold text-slate-800 cursor-pointer">
                    {path}
                  </summary>
                  <div className="px-3 pb-3 pt-1 border-t border-slate-200 bg-white space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Headline">
                        <TextInput
                          value={override.title}
                          onChange={(title) =>
                            patch({
                              ctaOverrides: {
                                ...content.ctaOverrides,
                                [path]: { ...override, title },
                              },
                            })
                          }
                        />
                      </Field>
                      <Field label="Highlighted part">
                        <TextInput
                          value={override.highlight}
                          onChange={(highlight) =>
                            patch({
                              ctaOverrides: {
                                ...content.ctaOverrides,
                                [path]: { ...override, highlight },
                              },
                            })
                          }
                        />
                      </Field>
                    </div>
                    <Field label="Body">
                      <RichField inline
                        value={override.subtitle}
                        onChange={(subtitle) =>
                          patch({
                            ctaOverrides: {
                              ...content.ctaOverrides,
                              [path]: { ...override, subtitle },
                            },
                          })
                        }
                      />
                    </Field>
                  </div>
                </details>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {tab === "extra" && (
        <div className="space-y-6">
          <Panel title="Engagement models" description="The three contract shapes.">
            <div className="space-y-4">
              {headingFields(
                content.engagementHeading,
                (engagementHeading) => patch({ engagementHeading })
              )}
              <ListEditor<EngagementModel>
                items={content.engagementModels}
                onChange={(engagementModels) => patch({ engagementModels })}
                title="Models"
                addLabel="Add model"
                makeItem={() => ({
                  id: makeId("model"),
                  badge: "",
                  title: "New model",
                  tagline: "",
                  description: "",
                  features: [],
                  ctaLabel: "Talk to us",
                  ctaHref: "/contact",
                  accent: "sky",
                })}
                itemLabel={(model) => model.title}
                renderItem={(model, update) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Badge">
                      <TextInput value={model.badge} onChange={(badge) => update({ ...model, badge })} />
                    </Field>
                    <Field label="Title">
                      <TextInput value={model.title} onChange={(title) => update({ ...model, title })} />
                    </Field>
                    <Field label="Tagline">
                      <TextInput
                        value={model.tagline}
                        onChange={(tagline) => update({ ...model, tagline })}
                      />
                    </Field>
                    <Field label="Accent">
                      <AccentPicker
                        value={model.accent}
                        onChange={(accentName) => update({ ...model, accent: accentName })}
                      />
                    </Field>
                    <Field label="Button label">
                      <TextInput
                        value={model.ctaLabel}
                        onChange={(ctaLabel) => update({ ...model, ctaLabel })}
                      />
                    </Field>
                    <Field label="Button link">
                      <TextInput
                        value={model.ctaHref}
                        onChange={(ctaHref) => update({ ...model, ctaHref })}
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Description">
                        <RichField inline
                          value={model.description}
                          onChange={(description) => update({ ...model, description })}
                        />
                      </Field>
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Features" hint="The ticked list on the model card.">
                        <LinesInput
                          value={model.features}
                          onChange={(features) => update({ ...model, features })}
                        />
                      </Field>
                    </div>
                  </div>
                )}
              />
            </div>
          </Panel>

          <Panel title="Trust pillars" description="The security and compliance strip.">
            <div className="space-y-4">
              {headingFields(content.securityHeading, (securityHeading) => patch({ securityHeading }))}
              <ListEditor<SecurityPillar>
                items={content.securityPillars}
                onChange={(securityPillars) => patch({ securityPillars })}
                title="Pillars"
                addLabel="Add pillar"
                makeItem={() => ({
                  id: makeId("trust"),
                  icon: "ShieldCheck",
                  title: "New pillar",
                  subtitle: "",
                  description: "",
                  accent: "emerald",
                })}
                itemLabel={(pillar) => pillar.title}
                renderItem={(pillar, update) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Title">
                      <TextInput value={pillar.title} onChange={(title) => update({ ...pillar, title })} />
                    </Field>
                    <Field label="Subtitle">
                      <TextInput
                        value={pillar.subtitle}
                        onChange={(subtitle) => update({ ...pillar, subtitle })}
                      />
                    </Field>
                    <Field label="Icon">
                      <IconPicker value={pillar.icon} onChange={(icon) => update({ ...pillar, icon })} />
                    </Field>
                    <Field label="Accent">
                      <AccentPicker
                        value={pillar.accent}
                        onChange={(accentName) => update({ ...pillar, accent: accentName })}
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Description">
                        <RichField inline
                          value={pillar.description}
                          onChange={(description) => update({ ...pillar, description })}
                        />
                      </Field>
                    </div>
                  </div>
                )}
              />
            </div>
          </Panel>

          <Panel title="Sprint cadence" description="What a fortnight looks like, shown on /process.">
            <div className="space-y-4">
              {headingFields(content.cadenceHeading, (cadenceHeading) => patch({ cadenceHeading }))}
              <ListEditor<CadenceStep>
                items={content.cadenceSteps}
                onChange={(cadenceSteps) => patch({ cadenceSteps })}
                title="Steps"
                addLabel="Add step"
                makeItem={() => ({
                  id: makeId("cadence"),
                  num: String((content.cadenceSteps?.length ?? 0) + 1).padStart(2, "0"),
                  title: "New step",
                  time: "",
                  description: "",
                  icon: "Terminal",
                  accent: "sky",
                })}
                itemLabel={(step) => `${step.num}. ${step.title}`}
                renderItem={(step, update) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Number">
                      <TextInput
                        value={step.num}
                        maxLength={4}
                        onChange={(num) => update({ ...step, num })}
                      />
                    </Field>
                    <Field label="Title">
                      <TextInput value={step.title} onChange={(title) => update({ ...step, title })} />
                    </Field>
                    <Field label="When">
                      <TextInput value={step.time} onChange={(time) => update({ ...step, time })} />
                    </Field>
                    <Field label="Icon">
                      <IconPicker value={step.icon} onChange={(icon) => update({ ...step, icon })} />
                    </Field>
                    <Field label="Accent">
                      <AccentPicker
                        value={step.accent}
                        onChange={(accentName) => update({ ...step, accent: accentName })}
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Description">
                        <RichField inline
                          value={step.description}
                          onChange={(description) => update({ ...step, description })}
                        />
                      </Field>
                    </div>
                  </div>
                )}
              />
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
