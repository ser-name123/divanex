import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * A link that knows when not to be a router link.
 *
 * Several buttons take their destination from admin-editable content, so the
 * same component renders "/contact" one day and "#contact-form" the next. Given
 * a bare fragment, next/link claims the click, writes the hash into the address
 * bar and then does not scroll — the reader presses "Send an Inquiry" and
 * nothing at all happens. Measured on the live site: a plain <a> to the same id
 * moves the page 720px, the Link moves it 0.
 *
 * So a fragment gets a plain anchor and the browser's own behaviour, which also
 * skips a needless soft navigation. Everything else stays a router link.
 */

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/** True for "#id" — a destination on the page the reader is already on. */
export function isSamePageHash(href: string): boolean {
  return href.startsWith("#");
}

export default function SmartLink({ href, children, ...rest }: Props) {
  if (isSamePageHash(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
