import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id?: string | number;
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number | null;
}

export function FaqAccordion({ items, defaultOpenIndex = 0 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="divide-y divide-[#E5DCD0] border-t border-b border-[#E5DCD0]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.id ?? idx} className="py-5">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full flex items-start justify-between gap-6 text-left group"
            >
              <div>
                {item.category && (
                  <div className="text-[11px] uppercase tracking-widest text-[#7A0806] mb-1">
                    {item.category}
                  </div>
                )}
                <span className="font-editorial text-xl sm:text-2xl font-medium text-[#1F1A17] group-hover:text-[#7A0806] transition-colors">
                  {item.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-[#7A0806] shrink-0 mt-1.5 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div className="mt-3.5 pr-8 text-sm sm:text-[15px] text-[#524942] leading-relaxed max-w-3xl">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
