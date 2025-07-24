import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in the MERN stack (MongoDB, Express, React, Node.js) and have extensive experience with Next.js, Firebase, and Tailwind CSS. I'm always learning and adapting to new technologies in the web development ecosystem.",
  },
  {
    question: "Are you available for freelance projects?",
    answer:
      "Yes, I am currently open to new freelance opportunities. Please use the contact form on this website to get in touch with details about your project, and I'll get back to you as soon as possible.",
  },
  {
    question: "How do you stay updated with the latest industry trends?",
    answer:
      "I am a lifelong learner. I regularly read tech blogs, follow industry leaders on social media, contribute to open-source projects, and take online courses to keep my skills sharp and up-to-date.",
  },
  {
    question: "Can I see the source code for this website?",
    answer:
      "Absolutely! This website is open source. You can find the complete source code on my GitHub profile. Feel free to explore, fork, or use it as a template for your own site.",
  },
  {
    question: "What is your process for starting a new project?",
    answer:
      "My process begins with a discovery phase to understand the project goals and requirements. This is followed by planning, design mockups, development, testing, and deployment. I believe in clear communication and collaboration throughout the entire lifecycle of a project.",
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Here are some common questions I get.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-lg hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
