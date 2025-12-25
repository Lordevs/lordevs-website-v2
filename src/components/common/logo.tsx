import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function Logo({
  href = ROUTES.HOME,
  containerClassName,
  className,
}: {
  href?: string;
  containerClassName?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn('flex items-center justify-center', containerClassName)}
    >
      <div className={cn('relative h-10 w-24', className)}>
        <Image src="/logo.svg" alt={siteConfig.name} fill priority />
      </div>
    </Link>
  );
}
