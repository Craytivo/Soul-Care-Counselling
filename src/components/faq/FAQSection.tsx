import FAQAccordion from './FAQAccordion'

interface FAQ {
  question: string
  answer: string
  order?: number
}

interface FAQSectionProps {
  title: string
  id: string
  faqs: FAQ[]
  startIndex: number
}

export default function FAQSection({ title, id, faqs, startIndex }: FAQSectionProps) {
  if (faqs.length === 0) return null

  return (
    <section id={id} className="mt-14 md:mt-16">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-charcoal/5" />
        <h2 className="font-heading text-xs uppercase tracking-[.2em] text-charcoal/40">{title}</h2>
        <div className="h-px flex-1 bg-charcoal/5" />
      </div>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <FAQAccordion
            key={`${faq.question}-${faq.order || i}`}
            question={faq.question}
            answer={faq.answer}
            index={startIndex + i}
            defaultOpen={i === 0 && startIndex === 0}
          />
        ))}
      </div>
    </section>
  )
}
