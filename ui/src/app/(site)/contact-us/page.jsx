import ContactForm from "@/components/Contact/ContactForm";
import ContactHero from "@/components/Contact/ContactHero";

export const metadata = {
  title: "Contact Us — Mumbai96",
  description: "Get in touch with Mumbai96 — report issues, partnerships, press enquiries, or say hello.",
};

export default function Page() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}
