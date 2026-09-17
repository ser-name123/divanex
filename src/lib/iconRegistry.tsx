"use client";

import { createElement } from "react";
import {
  Activity,
  Award,
  BarChart3,
  Bot,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Globe,
  GraduationCap,
  HeartPulse,
  HelpCircle,
  Layers,
  LifeBuoy,
  LineChart,
  Lock,
  LogIn,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
  Network,
  Package,
  Phone,
  Rocket,
  Search,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Users,
  Workflow,
  Zap,
  Compass,
  DollarSign,
  FileCheck,
  GitPullRequest,
  HeartHandshake,
  Key,
  KeyRound,
  Laptop,
  MessageSquare,
  MessageSquareQuote,
  Star,
  Timer,
  Wallet,
  Wrench,
  Cookie,
  EyeOff,
  Clock,
  Banknote,
  Scale,
  RefreshCw,
  ArrowRight,
  FileSignature,
  Gavel,
  Palette,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon names the admin console can store.
 *
 * A database row cannot hold a React component, so navigation entries, feature
 * cards and process steps store one of these strings and the site resolves it
 * here. Keeping the map explicit rather than importing all of lucide keeps the
 * bundle to the icons actually used, and gives the admin a fixed list to pick
 * from instead of a free-text field that silently renders nothing when
 * misspelled.
 */
export const ICON_REGISTRY: Record<string, LucideIcon> = {
  Wrench,
  Wallet,
  Timer,
  Star,
  MessageSquareQuote,
  MessageSquare,
  Laptop,
  KeyRound,
  Key,
  HeartHandshake,
  GitPullRequest,
  FileCheck,
  DollarSign,
  Compass,
  Activity,
  Award,
  BarChart3,
  Bot,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Globe,
  GraduationCap,
  HeartPulse,
  HelpCircle,
  Layers,
  LifeBuoy,
  LineChart,
  Lock,
  LogIn,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
  Network,
  Package,
  Phone,
  Rocket,
  Search,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Users,
  Workflow,
  Zap,
  Cookie,
  EyeOff,
  Clock,
  Banknote,
  Scale,
  RefreshCw,
  ArrowRight,
  FileSignature,
  Gavel,
  Palette,
};

/** Sorted names, for the icon picker in the admin console. */
export const ICON_NAMES = Object.keys(ICON_REGISTRY).sort();

/** Resolves a stored name, falling back so a bad value never renders blank. */
export function resolveIcon(name: string | undefined): LucideIcon {
  return (name && ICON_REGISTRY[name]) || Sparkles;
}

/**
 * Renders a stored icon name.
 *
 * Built with createElement rather than `<Resolved />`: a component read out of
 * a lookup during render looks to React (and to the lint rule that guards
 * against it) like a component defined during render, which would reset its
 * state on every pass. These icons are stateless, and createElement expresses
 * that this is a call, not a declaration.
 */
export function Icon({
  name,
  className,
  strokeWidth,
}: {
  name: string | undefined;
  className?: string;
  strokeWidth?: number;
}) {
  return createElement(resolveIcon(name), { className, strokeWidth });
}
