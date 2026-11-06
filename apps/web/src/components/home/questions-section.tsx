import { HomeSection } from "@/components/home/home-section";
import { HOME_FAQ } from "@/lib/marketing/content/home";

export function QuestionsSection() {
  return (
    <HomeSection id="questions" label="Questions" title="Before you adopt it.">
      <dl className="home-faq">
        {HOME_FAQ.map((item) => (
          <div key={item.id} className="home-faq__item">
            <dt className="home-faq__question">{item.question}</dt>
            <dd className="home-faq__answer">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </HomeSection>
  );
}
