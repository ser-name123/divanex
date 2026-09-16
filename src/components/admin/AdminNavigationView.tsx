"use client";

import { useState } from "react";
import { CheckCircle2, Navigation } from "lucide-react";
import { useAdminContent } from "@/lib/useAdminContent";
import { useUnsavedGuard } from "@/lib/useUnsavedGuard";
import {
  DEFAULT_NAVIGATION,
  type NavCta,
  type NavGroup,
  type NavLink,
} from "@/data/navigation";
import {
  AccentPicker,
  Field,
  IconPicker,
  ListEditor,
  Panel,
  SaveBar,
  Tabs,
  RichField,
  StringListEditor,
  TextInput,
  Toggle,
  makeId,
} from "@/components/admin/fields";

/**
 * Header and footer navigation editor.
 *
 * These menus were arrays inside Navbar.tsx and Footer.tsx: adding a link, or
 * even correcting a label, was a code change and a deploy. Everything here
 * writes to the same database record the live site renders from.
 */
export default function AdminNavigationView() {
  const {
    data: nav,
    setData: setNav,
    save,
    reset,
    loading,
    saving,
  } = useAdminContent("navigation", DEFAULT_NAVIGATION);

  const [tab, setTab] = useState("header");
  const [dirty, setDirty] = useState(false);
  useUnsavedGuard(dirty);
  const [toast, setToast] = useState<string | null>(null);

  const notify = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  const edit = (next: typeof nav) => {
    setNav(next);
    setDirty(true);
  };

  const header = nav.header;
  const footer = nav.footer;

  const setHeader = (patch: Partial<typeof header>) =>
    edit({ ...nav, header: { ...header, ...patch } });
  const setFooter = (patch: Partial<typeof footer>) =>
    edit({ ...nav, footer: { ...footer, ...patch } });

  const handleSave = async () => {
    const ok = await save(nav);
    setDirty(!ok);
    notify(
      ok
        ? "Navigation saved. The header and footer update on the next page load."
        : "Could not save. Nothing was published."
    );
  };

  const handleReset = async () => {
    if (!confirm("Restore the built-in header and footer menus? Your edits are lost.")) return;
    const ok = await reset();
    setDirty(false);
    notify(ok ? "Navigation restored to defaults." : "Could not reset.");
  };

  /** One link's fields. Shared by every menu on this screen. */
  const linkFields = (
    link: NavLink,
    update: (next: NavLink) => void,
    options: { description?: boolean; icon?: boolean } = {}
  ) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Field label="Label">
        <TextInput value={link.label} onChange={(label) => update({ ...link, label })} />
      </Field>
      <Field label="Link" hint="A path like /services, or a full https:// URL.">
        <TextInput value={link.href} onChange={(href) => update({ ...link, href })} />
      </Field>
      <Field label="Badge" hint="Optional pill beside the label.">
        <TextInput
          value={link.badge ?? ""}
          onChange={(badge) => update({ ...link, badge })}
        />
      </Field>
      {options.icon && (
        <Field label="Icon">
          <IconPicker value={link.icon} onChange={(icon) => update({ ...link, icon })} />
        </Field>
      )}
      {options.description && (
        <div className="sm:col-span-2">
          <Field label="Description" hint="The supporting line in the mega menu.">
            <RichField
              value={link.description ?? ""}
              rows={2}
              inline
              onChange={(description) => update({ ...link, description })}
            />
          </Field>
        </div>
      )}
      <div className="sm:col-span-2 flex flex-wrap items-center gap-2">
        <Toggle
          checked={!link.hidden}
          label={link.hidden ? "Hidden from the site" : "Visible"}
          onChange={(visible) => update({ ...link, hidden: !visible })}
        />
        <Toggle
          checked={Boolean(link.external)}
          label="Opens in a new tab"
          onChange={(external) => update({ ...link, external })}
        />
      </div>
    </div>
  );

  const newLink = (prefix: string): NavLink => ({
    id: makeId(prefix),
    label: "New link",
    href: "/",
  });

  const groupEditor = (
    group: NavGroup,
    update: (next: NavGroup) => void,
    options: { footer?: boolean } = {}
  ) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Column title">
          <TextInput value={group.title} onChange={(title) => update({ ...group, title })} />
        </Field>
        {options.footer ? (
          <Field label="Icon">
            <IconPicker value={group.icon} onChange={(icon) => update({ ...group, icon })} />
          </Field>
        ) : (
          <Field label="Eyebrow" hint="Small label above the title.">
            <TextInput
              value={group.eyebrow ?? ""}
              onChange={(eyebrow) => update({ ...group, eyebrow })}
            />
          </Field>
        )}
        {options.footer && (
          <>
            <Field label="Accent">
              <AccentPicker
                value={group.accent}
                onChange={(accentName) => update({ ...group, accent: accentName })}
              />
            </Field>
            <Field label="Width" hint="Out of 12 columns. The brand block takes 3.">
              <select
                value={group.span ?? 2}
                onChange={(event) => update({ ...group, span: Number(event.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
              >
                {[1, 2, 3, 4, 5, 6].map((span) => (
                  <option key={span} value={span}>
                    {span} of 12
                  </option>
                ))}
              </select>
            </Field>
          </>
        )}
      </div>

      <Toggle
        checked={!group.hidden}
        label={group.hidden ? "Column hidden" : "Column visible"}
        onChange={(visible) => update({ ...group, hidden: !visible })}
      />

      <ListEditor<NavLink>
        items={group.links}
        onChange={(links) => update({ ...group, links })}
        title="Links"
        addLabel="Add link"
        makeItem={() => newLink("link")}
        itemLabel={(link) => link.label}
        renderItem={(link, update2) =>
          linkFields(link, update2, { description: !options.footer, icon: !options.footer })
        }
      />
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
            <Navigation className="w-3.5 h-3.5 text-sky-600" />
            <span>HEADER & FOOTER NAVIGATION</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-sans">
            Site Navigation
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            Every menu on the site: the top bar, the mega menu, the footer columns and the
            bottom strip. Links can be hidden without deleting them.
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
          { id: "header", label: "Header bar" },
          { id: "mega", label: "Mega menu" },
          { id: "footer", label: "Footer columns" },
          { id: "footer-extra", label: "Footer strip" },
        ]}
      />

      {tab === "header" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Panel
            title="Main menu"
            description="The links rendered directly in the top bar."
          >
            <ListEditor<NavLink>
              items={header.primary}
              onChange={(primary) => setHeader({ primary })}
              addLabel="Add menu item"
              makeItem={() => newLink("nav")}
              itemLabel={(link) => link.label}
              renderItem={(link, update) => linkFields(link, update)}
            />
          </Panel>

          <Panel
            title="Action buttons"
            description="Shown at the right of the bar and at the foot of the mobile menu. The primary style is the accented button."
          >
            <ListEditor<NavCta>
              items={header.ctas}
              onChange={(ctas) => setHeader({ ctas })}
              addLabel="Add button"
              makeItem={() => ({
                id: makeId("cta"),
                label: "New button",
                href: "/contact",
                style: "ghost",
              })}
              itemLabel={(cta) => cta.label}
              renderItem={(cta, update) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Label">
                    <TextInput value={cta.label} onChange={(label) => update({ ...cta, label })} />
                  </Field>
                  <Field label="Link">
                    <TextInput value={cta.href} onChange={(href) => update({ ...cta, href })} />
                  </Field>
                  <Field label="Style">
                    <select
                      value={cta.style}
                      onChange={(event) =>
                        update({ ...cta, style: event.target.value as NavCta["style"] })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
                    >
                      <option value="ghost">Ghost</option>
                      <option value="primary">Primary</option>
                    </select>
                  </Field>
                  <Field label="Icon" hint="Ghost buttons only.">
                    <IconPicker value={cta.icon} onChange={(icon) => update({ ...cta, icon })} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Toggle
                      checked={!cta.hidden}
                      label={cta.hidden ? "Hidden" : "Visible"}
                      onChange={(visible) => update({ ...cta, hidden: !visible })}
                    />
                  </div>
                </div>
              )}
            />
          </Panel>
        </div>
      )}

      {tab === "mega" && (
        <div className="space-y-6">
          <Panel
            title="Mega menu columns"
            description="The dropdown behind the More trigger. Each column is rendered four grid columns wide, so three columns fill the panel."
            right={
              <div className="w-48">
                <Field label="Trigger label">
                  <TextInput
                    value={header.moreLabel}
                    onChange={(moreLabel) => setHeader({ moreLabel })}
                  />
                </Field>
              </div>
            }
          >
            <ListEditor<NavGroup>
              items={header.megaMenu}
              onChange={(megaMenu) => setHeader({ megaMenu })}
              addLabel="Add column"
              makeItem={() => ({ id: makeId("mega"), title: "New column", links: [] })}
              itemLabel={(group) => `${group.title} (${group.links?.length ?? 0} links)`}
              renderItem={(group, update) => groupEditor(group, update)}
            />
          </Panel>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Panel
              title="Promo panel"
              description="The highlighted card at the right of the mega menu."
            >
              <div className="space-y-3">
                <Field label="Heading">
                  <TextInput
                    value={header.megaMenuPromoTitle}
                    onChange={(megaMenuPromoTitle) => setHeader({ megaMenuPromoTitle })}
                  />
                </Field>
                <Field label="Body">
                  <RichField
                    value={header.megaMenuPromoText}
                    inline
                    onChange={(megaMenuPromoText) => setHeader({ megaMenuPromoText })}
                  />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Button label">
                    <TextInput
                      value={header.megaMenuPromoCtaLabel}
                      onChange={(megaMenuPromoCtaLabel) => setHeader({ megaMenuPromoCtaLabel })}
                    />
                  </Field>
                  <Field label="Button link">
                    <TextInput
                      value={header.megaMenuPromoCtaHref}
                      onChange={(megaMenuPromoCtaHref) => setHeader({ megaMenuPromoCtaHref })}
                    />
                  </Field>
                </div>
              </div>
            </Panel>

            <Panel
              title="Bottom strip"
              description="The status line and quick links along the foot of the mega menu. The last link is rendered as the accented button."
            >
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Status text">
                    <TextInput
                      value={header.megaMenuStatusText}
                      onChange={(megaMenuStatusText) => setHeader({ megaMenuStatusText })}
                    />
                  </Field>
                  <Field label="Status detail" hint="Rendered after a // separator.">
                    <TextInput
                      value={header.megaMenuStatusDetail}
                      onChange={(megaMenuStatusDetail) => setHeader({ megaMenuStatusDetail })}
                    />
                  </Field>
                </div>
                <ListEditor<NavLink>
                  items={header.megaMenuQuickLinks}
                  onChange={(megaMenuQuickLinks) => setHeader({ megaMenuQuickLinks })}
                  title="Quick links"
                  addLabel="Add quick link"
                  makeItem={() => newLink("quick")}
                  itemLabel={(link) => link.label}
                  renderItem={(link, update) => linkFields(link, update, { icon: true })}
                />
              </div>
            </Panel>
          </div>
        </div>
      )}

      {tab === "footer" && (
        <Panel
          title="Footer columns"
          description="The link matrix above the bottom bar. Widths are out of 12; the brand block already takes 3."
        >
          <ListEditor<NavGroup>
            items={footer.columns}
            onChange={(columns) => setFooter({ columns })}
            addLabel="Add column"
            makeItem={() => ({
              id: makeId("col"),
              title: "New column",
              accent: "sky",
              span: 2,
              links: [],
            })}
            itemLabel={(group) => `${group.title} (${group.links?.length ?? 0} links)`}
            renderItem={(group, update) => groupEditor(group, update, { footer: true })}
          />
        </Panel>
      )}

      {tab === "footer-extra" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Panel title="Brand & newsletter" description="The block under the logo, and the dispatch form.">
            <div className="space-y-3">
              <Field label="Tagline" hint="The paragraph under the footer logo.">
                <RichField
                  value={footer.tagline}
                  inline
                  onChange={(tagline) => setFooter({ tagline })}
                />
              </Field>
              <Field label="Newsletter heading">
                <TextInput
                  value={footer.newsletterTitle}
                  onChange={(newsletterTitle) => setFooter({ newsletterTitle })}
                />
              </Field>
              <Field label="Newsletter body">
                <RichField
                  value={footer.newsletterText}
                  inline
                  onChange={(newsletterText) => setFooter({ newsletterText })}
                />
              </Field>
              <Field label="Subscribe button label">
                <TextInput
                  value={footer.newsletterButtonLabel}
                  onChange={(newsletterButtonLabel) => setFooter({ newsletterButtonLabel })}
                />
              </Field>
            </div>
          </Panel>

          <Panel title="Bottom bar" description="Copyright, trust badges and the quick link strip.">
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Legal name">
                  <TextInput
                    value={footer.copyrightName}
                    onChange={(copyrightName) => setFooter({ copyrightName })}
                  />
                </Field>
                <Field
                  label="Copyright line"
                  hint="{year} becomes the current year, {name} the legal name."
                >
                  <TextInput
                    value={footer.copyrightText}
                    onChange={(copyrightText) => setFooter({ copyrightText })}
                  />
                </Field>
              </div>

              <Field label="Trust badges" hint="The pills above the bottom bar. Emoji are fine.">
                <StringListEditor
                  value={footer.badges}
                  placeholder="SOC 2 Type II"
                  addLabel="Add badge"
                  onChange={(badges) => setFooter({ badges })}
                />
              </Field>

              <ListEditor<NavLink>
                items={footer.bottomLinks}
                onChange={(bottomLinks) => setFooter({ bottomLinks })}
                title="Bottom strip links"
                addLabel="Add link"
                makeItem={() => newLink("bottom")}
                itemLabel={(link) => link.label}
                renderItem={(link, update) => linkFields(link, update)}
              />
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
