import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';

type FAQItemProps = {
  value: string;
  question: string;
  answer: string;
};

export default function FAQItem({ value, question, answer }: FAQItemProps) {
  return (
    <Accordion.Item
      value={value}
      data-orientation="vertical"
      className="border-b border-border-primary first:border-t"
    >
      <Accordion.Header className="flex w-full">
        <Accordion.Trigger
          id={`faq-trigger-${value}`}
          className="flex flex-1 items-center justify-between py-4 font-bold transition-all
                     [&[data-state=open]>svg]:rotate-180 md:py-5 md:text-md"
        >
          {question}
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="0"
            viewBox="0 0 15 15"
            className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
              fill="currentColor"
            />
          </svg>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content
        className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        style={{
          // Radix recommended inline styles for smooth animations
          '--radix-accordion-content-height': 'var(--radix-collapsible-content-height)',
          '--radix-accordion-content-width': 'var(--radix-collapsible-content-width)',
        } as React.CSSProperties}
      >
        <p className="py-2">{answer}</p>
      </Accordion.Content>
    </Accordion.Item>
  );
}
