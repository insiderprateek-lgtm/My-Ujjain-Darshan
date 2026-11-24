import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbCrumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({
  items,
  light = false,
}: {
  items: BreadcrumbCrumb[];
  light?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="inline-flex items-center gap-2">
              {idx > 0 && (
                <span
                  aria-hidden="true"
                  className={light ? 'text-white/50' : 'text-[#A09487]'}
                >
                  /
                </span>
              )}
              {isLast || !item.to ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={
                    light ? 'text-white/95 font-medium' : 'text-[#1F1A17] font-medium'
                  }
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className={
                    light
                      ? 'text-white/75 hover:text-white transition-colors'
                      : 'text-[#655C54] hover:text-[#7A0806] transition-colors'
                  }
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
