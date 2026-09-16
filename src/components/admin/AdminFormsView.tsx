"use client";

import { useState } from "react";
import { CheckCircle2, ExternalLink, Mail, Send } from "lucide-react";
import { useAdminContent } from "@/lib/useAdminContent";
import { useUnsavedGuard } from "@/lib/useUnsavedGuard";
import {
  DEFAULT_FORM_SETTINGS,
  FORM_KINDS,
  FORM_KIND_LABELS,
  formFlow,
  type FormKind,
  type FormFlow,
  type ThankYouStep,
} from "@/data/formSettings";
import {
  Field,
  IconPicker,
  ListEditor,
  Panel,
  PlainField,
  SaveBar,
  StringListEditor,
  Tabs,
  TextInput,
  Toggle,
  makeId,
} from "@/components/admin/fields";

/**
 * Everything that happens after a visitor submits a form.
 *
 * Before this screen existed, the thank-you copy did not exist at all (each
 * form showed an inline banner hardcoded in its component), and no form sent
 * any email. Changing the wording of an acknowledgement meant editing a React
 * component and deploying.
 *
 * The email design is not editable here on purpose. Layout belongs in the
 * template, where it is reviewed; an admin textarea holding raw markup is
 * markup nobody reads until a client receives it broken.
 */

const AUDIENCES = [
  { id: "visitor" as const, label: "Visitor's copy" },
  { id: "team" as const, label: "Team alert" },
];

export default function AdminFormsView() {
  const {
    data: settings,
    setData: setSettings,
    save,
    reset,
    loading,
    saving,
  } = useAdminContent("forms", DEFAULT_FORM_SETTINGS);

  const [tab, setTab] = useState("delivery");
  const [dirty, setDirty] = useState(false);
  useUnsavedGuard(dirty);
  const [toast, setToast] = useState<string | null>(null);

  const [previewKind, setPreviewKind] = useState<FormKind>("contact");
  const [previewAudience, setPreviewAudience] = useState<"visitor" | "team">("visitor");
  // Remounts the iframe so a preview reloads after a save rather than showing
  // the version from before the edit.
  const [previewNonce, setPreviewNonce] = useState(0);
  const [testAddress, setTestAddress] = useState("");
  const [sendingTest, setSendingTest] = useState(false);
  const [checking, setChecking] = useState(false);

  const notify = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 5000);
  };

  const edit = (next: typeof settings) => {
    setSettings(next);
    setDirty(true);
  };

  const setGlobal = (patch: Partial<typeof settings>) => edit({ ...settings, ...patch });

  const setFlow = (kind: FormKind, patch: Partial<FormFlow>) =>
    edit({
      ...settings,
      forms: {
        ...settings.forms,
        [kind]: { ...formFlow(settings, kind), ...patch },
      },
    });

  const handleSave = async () => {
    const ok = await save(settings);
    setDirty(!ok);
    setPreviewNonce((n) => n + 1);
    notify(
      ok
        ? "Saved. The thank-you pages and both emails use this from the next submission."
        : "Could not save. Nothing was published."
    );
  };

  const handleReset = async () => {
    if (!confirm("Restore the built-in thank-you copy and email wording? Your edits are lost."))
      return;
    const ok = await reset();
    setDirty(false);
    setPreviewNonce((n) => n + 1);
    notify(ok ? "Restored to the built-in wording." : "Could not reset.");
  };

  const handleSendTest = async () => {
    if (dirty) {
      notify("Save your changes first — a test sends the stored wording, not the draft.");
      return;
    }
    setSendingTest(true);
    try {
      const res = await fetch("/api/forms/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: previewKind,
          audience: previewAudience,
          to: testAddress,
        }),
      });
      const json = await res.json();
      notify(json?.success ? json.message : json?.error || "Could not send the test.");
    } catch {
      notify("Could not reach the server.");
    } finally {
      setSendingTest(false);
    }
  };

  /**
   * Confirms the mail server accepts our credentials.
   *
   * Sending is best-effort everywhere else — a submission must never fail
   * because SMTP is down — so a broken mailbox is otherwise invisible until
   * somebody notices the enquiries stopped arriving.
   */
  const handleVerify = async () => {
    setChecking(true);
    try {
      const res = await fetch("/api/forms/verify");
      const json = await res.json();
      notify(
        json?.success
          ? json.message
          : `Mail server check failed: ${json?.error || "no response"}`
      );
    } catch {
      notify("Could not reach the server.");
    } finally {
      setChecking(false);
    }
  };

  const tabs = [
    { id: "delivery", label: "Delivery & branding" },
    ...FORM_KINDS.map((kind) => ({ id: kind, label: FORM_KIND_LABELS[kind] })),
    { id: "preview", label: "Preview & test" },
  ];

  const activeKind = FORM_KINDS.find((kind) => kind === tab);

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-4.5 h-4.5 text-sky-600" />
            Forms, thank-you pages & notifications
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Every website form lands on a thank-you page and sends two emails — one to the person
            who wrote in, one to your team. This is where all three are worded.
          </p>
        </div>
        <SaveBar
          onSave={handleSave}
          onReset={handleReset}
          saving={saving}
          loading={loading}
          dirty={dirty}
        />
      </header>

      {toast && (
        <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
          {toast}
        </div>
      )}

      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "delivery" && (
        <div className="space-y-5">
          <Panel
            title="Where team alerts go"
            description="Every form notification is sent to these addresses. One per line."
          >
            <Field
              label="Team recipients"
              hint="Leave empty to fall back to the contact address in Search & Metadata, so notifications always reach somebody."
            >
              <StringListEditor
                value={settings.teamRecipients}
                onChange={(teamRecipients) => setGlobal({ teamRecipients })}
                placeholder="name@yourcompany.com"
                addLabel="Add recipient"
              />
            </Field>
          </Panel>

          <Panel
            title="Sender identity"
            description="How the emails present themselves. The sending address itself is an environment secret, not editable here."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="From name" hint="Shown as the sender in the recipient's inbox.">
                <TextInput
                  value={settings.senderName}
                  onChange={(senderName) => setGlobal({ senderName })}
                />
              </Field>
              <Field
                label="Reply-to address"
                hint="Where a visitor's reply lands. Leave empty to use the sending address."
              >
                <TextInput
                  value={settings.replyToEmail}
                  onChange={(replyToEmail) => setGlobal({ replyToEmail })}
                  placeholder="hello@yourcompany.com"
                />
              </Field>
              <Field label="Brand name" hint="The wordmark at the top of every email.">
                <TextInput
                  value={settings.brandName}
                  onChange={(brandName) => setGlobal({ brandName })}
                />
              </Field>
              <Field label="Tagline" hint="The line under the wordmark.">
                <TextInput
                  value={settings.brandTagline}
                  onChange={(brandTagline) => setGlobal({ brandTagline })}
                />
              </Field>
              <Field
                label="Accent colour"
                hint="Buttons and the rule at the top of the card. A hex value, because email clients have no Tailwind."
              >
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={/^#[0-9a-f]{6}$/i.test(settings.accentColor) ? settings.accentColor : "#0f7670"}
                    onChange={(event) => setGlobal({ accentColor: event.target.value })}
                    className="w-9 h-9 rounded-xl border border-slate-200 bg-white cursor-pointer shrink-0"
                    aria-label="Accent colour"
                  />
                  <TextInput
                    value={settings.accentColor}
                    onChange={(accentColor) => setGlobal({ accentColor })}
                    placeholder="#0f7670"
                  />
                </div>
              </Field>
            </div>
          </Panel>

          <Panel title="Email footer" description="The small print under every message.">
            <div className="space-y-4">
              <Field label="Footer note">
                <PlainField
                  value={settings.footerNote}
                  rows={2}
                  limit={200}
                  onChange={(footerNote) => setGlobal({ footerNote })}
                />
              </Field>
              <Field
                label="Unsubscribe note"
                hint="Added to the visitor's copy only. Leave empty to omit it."
              >
                <PlainField
                  value={settings.unsubscribeNote}
                  rows={2}
                  limit={200}
                  onChange={(unsubscribeNote) => setGlobal({ unsubscribeNote })}
                />
              </Field>
            </div>
          </Panel>
        </div>
      )}

      {activeKind && (
        <FormEditor
          kind={activeKind}
          flow={formFlow(settings, activeKind)}
          onChange={(patch) => setFlow(activeKind, patch)}
        />
      )}

      {tab === "preview" && (
        <div className="space-y-5">
          <Panel
            title="Preview the real email"
            description="Rendered from what is stored, with sample submission data filled in."
            right={
              <a
                href={`/api/forms/preview?kind=${previewKind}&audience=${previewAudience}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-all"
              >
                Open in a tab
                <ExternalLink className="w-3 h-3" />
              </a>
            }
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {FORM_KINDS.map((kind) => (
                  <button
                    key={kind}
                    type="button"
                    onClick={() => setPreviewKind(kind)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                      previewKind === kind
                        ? "bg-sky-600 border-sky-600 text-white"
                        : "bg-white border-slate-200 text-slate-600 hover:border-sky-300"
                    }`}
                  >
                    {FORM_KIND_LABELS[kind]}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {AUDIENCES.map((audience) => (
                  <button
                    key={audience.id}
                    type="button"
                    onClick={() => setPreviewAudience(audience.id)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                      previewAudience === audience.id
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    {audience.label}
                  </button>
                ))}
              </div>

              {dirty && (
                <p className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl">
                  The preview shows what is saved. Save to see your current edits.
                </p>
              )}

              {/*
                Sandboxed with no allow-scripts: parts of this markup are
                operator-authored, and the console is the one page where a
                script would be running beside an authenticated session.
              */}
              <iframe
                key={`${previewKind}-${previewAudience}-${previewNonce}`}
                title="Email preview"
                sandbox=""
                src={`/api/forms/preview?kind=${previewKind}&audience=${previewAudience}`}
                className="w-full h-[640px] rounded-2xl border border-slate-200 bg-slate-100"
              />
            </div>
          </Panel>

          <Panel
            title="Send yourself a test"
            description="Delivers this exact message to one address, so you can check it in a real client before a visitor does."
            right={
              <button
                type="button"
                onClick={handleVerify}
                disabled={checking}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-all disabled:opacity-50 cursor-pointer"
              >
                {checking ? "Checking…" : "Check mail server"}
              </button>
            }
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
              <div className="flex-1">
                <Field label="Send to">
                  <TextInput
                    value={testAddress}
                    onChange={setTestAddress}
                    placeholder="you@yourcompany.com"
                  />
                </Field>
              </div>
              <button
                type="button"
                onClick={handleSendTest}
                disabled={sendingTest || !testAddress.includes("@")}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-sm transition-all disabled:opacity-50 cursor-pointer inline-flex items-center gap-2 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                {sendingTest ? "Sending…" : "Send test"}
              </button>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}

/** The three panels for one form: its landing page and its two emails. */
function FormEditor({
  kind,
  flow,
  onChange,
}: {
  kind: FormKind;
  flow: FormFlow;
  onChange: (patch: Partial<FormFlow>) => void;
}) {
  const thankYou = flow.thankYou;
  const visitor = flow.visitorEmail;
  const team = flow.teamEmail;

  const setThankYou = (patch: Partial<typeof thankYou>) =>
    onChange({ thankYou: { ...thankYou, ...patch } });
  const setVisitor = (patch: Partial<typeof visitor>) =>
    onChange({ visitorEmail: { ...visitor, ...patch } });
  const setTeam = (patch: Partial<typeof team>) => onChange({ teamEmail: { ...team, ...patch } });

  return (
    <div className="space-y-5">
      <Panel
        title="Thank-you page"
        description={`Where the visitor lands after submitting. Preview it at /thank-you?kind=${kind}`}
        right={
          <a
            href={`/thank-you?kind=${kind}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-all"
          >
            View page
            <ExternalLink className="w-3 h-3" />
          </a>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Eyebrow" hint="The small pill above the headline.">
              <TextInput value={thankYou.eyebrow} onChange={(eyebrow) => setThankYou({ eyebrow })} />
            </Field>
            <Field label="Headline">
              <TextInput
                value={thankYou.headline}
                onChange={(headline) => setThankYou({ headline })}
              />
            </Field>
            <Field label="Headline highlight" hint="Rendered in the accent colour after the headline.">
              <TextInput
                value={thankYou.headlineHighlight}
                onChange={(headlineHighlight) => setThankYou({ headlineHighlight })}
              />
            </Field>
            <Field label="Response note" hint="The reassurance under the steps. Leave empty to omit.">
              <TextInput
                value={thankYou.responseNote}
                onChange={(responseNote) => setThankYou({ responseNote })}
              />
            </Field>
          </div>

          <Field label="Subhead">
            <PlainField
              value={thankYou.subhead}
              rows={3}
              limit={320}
              onChange={(subhead) => setThankYou({ subhead })}
            />
          </Field>

          <ListEditor<ThankYouStep>
            title="What happens next"
            addLabel="Add step"
            items={thankYou.steps}
            onChange={(steps) => setThankYou({ steps })}
            makeItem={() => ({
              id: makeId("step"),
              title: "New step",
              description: "",
              iconName: "CheckCircle2",
            })}
            itemLabel={(step, index) => step.title || `Step ${index + 1}`}
            renderItem={(step, update) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Title">
                  <TextInput value={step.title} onChange={(title) => update({ ...step, title })} />
                </Field>
                <Field label="Icon">
                  <IconPicker
                    value={step.iconName}
                    onChange={(iconName) => update({ ...step, iconName })}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Description">
                    <PlainField
                      value={step.description}
                      rows={2}
                      limit={200}
                      onChange={(description) => update({ ...step, description })}
                    />
                  </Field>
                </div>
              </div>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Primary button label" hint="Leave empty to hide the button.">
              <TextInput
                value={thankYou.primaryCtaLabel}
                onChange={(primaryCtaLabel) => setThankYou({ primaryCtaLabel })}
              />
            </Field>
            <Field label="Primary button link">
              <TextInput
                value={thankYou.primaryCtaHref}
                onChange={(primaryCtaHref) => setThankYou({ primaryCtaHref })}
              />
            </Field>
            <Field label="Secondary button label">
              <TextInput
                value={thankYou.secondaryCtaLabel}
                onChange={(secondaryCtaLabel) => setThankYou({ secondaryCtaLabel })}
              />
            </Field>
            <Field label="Secondary button link">
              <TextInput
                value={thankYou.secondaryCtaHref}
                onChange={(secondaryCtaHref) => setThankYou({ secondaryCtaHref })}
              />
            </Field>
            <Field label="Reference label" hint="Shown above the submission id.">
              <TextInput
                value={thankYou.referenceLabel}
                onChange={(referenceLabel) => setThankYou({ referenceLabel })}
              />
            </Field>
          </div>

          <Toggle
            checked={thankYou.showReference}
            label={
              thankYou.showReference
                ? "Showing the submission reference"
                : "Reference hidden from the visitor"
            }
            onChange={(showReference) => setThankYou({ showReference })}
          />
        </div>
      </Panel>

      <Panel
        title="Visitor's acknowledgement"
        description="The letter sent to whoever filled the form in."
        right={
          <Toggle
            checked={flow.notifyVisitor && visitor.enabled}
            label={flow.notifyVisitor && visitor.enabled ? "Sending" : "Not sending"}
            onChange={(enabled) => onChange({ notifyVisitor: enabled, visitorEmail: { ...visitor, enabled } })}
          />
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Subject"
              hint="{{name}} and {{siteName}} are replaced with the submitter's details."
            >
              <TextInput value={visitor.subject} onChange={(subject) => setVisitor({ subject })} />
            </Field>
            <Field label="Heading">
              <TextInput value={visitor.heading} onChange={(heading) => setVisitor({ heading })} />
            </Field>
          </div>

          <Field label="Opening paragraph" hint="{{name}} is replaced with the submitter's name.">
            <PlainField
              value={visitor.intro}
              rows={3}
              limit={400}
              onChange={(intro) => setVisitor({ intro })}
            />
          </Field>

          <Field label="What they can expect" hint="Rendered as a ticked list under the opening.">
            <StringListEditor
              value={visitor.highlights}
              onChange={(highlights) => setVisitor({ highlights })}
              placeholder="A solutions architect reviews your brief personally."
              addLabel="Add point"
            />
          </Field>

          <Field label="Closing paragraph">
            <PlainField
              value={visitor.outro}
              rows={2}
              limit={300}
              onChange={(outro) => setVisitor({ outro })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Button label" hint="Leave empty to send a message with no button.">
              <TextInput value={visitor.ctaLabel} onChange={(ctaLabel) => setVisitor({ ctaLabel })} />
            </Field>
            <Field label="Button link">
              <TextInput value={visitor.ctaHref} onChange={(ctaHref) => setVisitor({ ctaHref })} />
            </Field>
            <Field label="Sign-off">
              <TextInput value={visitor.signOff} onChange={(signOff) => setVisitor({ signOff })} />
            </Field>
            <Field label="Signature">
              <TextInput
                value={visitor.signature}
                onChange={(signature) => setVisitor({ signature })}
              />
            </Field>
          </div>
        </div>
      </Panel>

      <Panel
        title="Team alert"
        description="The record sent to your inbox. The submitted fields are added automatically."
        right={
          <Toggle
            checked={flow.notifyTeam && team.enabled}
            label={flow.notifyTeam && team.enabled ? "Sending" : "Not sending"}
            onChange={(enabled) => onChange({ notifyTeam: enabled, teamEmail: { ...team, enabled } })}
          />
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Subject"
              hint="{{name}}, {{email}} and {{kind}} are replaced with the submission's details."
            >
              <TextInput value={team.subject} onChange={(subject) => setTeam({ subject })} />
            </Field>
            <Field label="Heading">
              <TextInput value={team.heading} onChange={(heading) => setTeam({ heading })} />
            </Field>
          </div>

          <Field label="Opening line">
            <PlainField
              value={team.intro}
              rows={2}
              limit={240}
              onChange={(intro) => setTeam({ intro })}
            />
          </Field>

          <Field
            label="Extra recipients for this form"
            hint="Added to the shared team recipients, not instead of them."
          >
            <StringListEditor
              value={team.extraRecipients}
              onChange={(extraRecipients) => setTeam({ extraRecipients })}
              placeholder="sales@yourcompany.com"
              addLabel="Add recipient"
            />
          </Field>
        </div>
      </Panel>
    </div>
  );
}
