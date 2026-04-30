'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQAccordionProps {
  question: string
  answer: string
  index: number
  defaultOpen?: boolean
}

export default function FAQAccordion({ question, answer, index, defaultOpen = false }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="rounded-2xl bg-white ring-1 ring-charcoal/5 overflow-hidden hover:ring-charcoal/10 hover:shadow-lg hover:shadow-charcoal/[0.03] transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="flex items-start gap-3">
          <span className="text-xs font-mono text-clay/50 mt-0.5 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-heading font-semibold text-charcoal leading-snug">{question}</span>
        </span>
        <span className="flex-shrink-0 w-6 h-6 text-clay">
          {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </span>
      </button>
      {isOpen && (
        <div className="px-5 md:px-6 pb-5 md:pb-6">
          <div className="h-px bg-charcoal/5 mb-4" />
          <p className="text-charcoal/75 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}
