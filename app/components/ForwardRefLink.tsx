// ForwardRefLink.tsx
import Link, { LinkProps } from 'next/link';
import React, { forwardRef } from 'react';

type ForwardRefLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ForwardRefLink = forwardRef<HTMLAnchorElement, ForwardRefLinkProps>(
  ({ href, children, ...props }, ref) => {
    return (
      <Link href={href} passHref legacyBehavior>
        <a ref={ref} {...props}>
          {children}
        </a>
      </Link>
    );
  }
);

ForwardRefLink.displayName = 'ForwardRefLink';

export default ForwardRefLink;
