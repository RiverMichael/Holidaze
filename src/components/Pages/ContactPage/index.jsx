import useUpdateHead from "../../../hooks/useUpdateHead";
import ContactForm from "../../forms/ContactForm";

export default function ContactPage() {
  useUpdateHead("Contact", "Contact us if you have any questions or concerns");

  return (
    <main className="flex flex-col gap-8 px-5 container max-w-sm">
      <div>
        <h1>Contact</h1>
        <p className="text-primary font-heading font-bold text-lg">us at Holidaze</p>
      </div>

      <section className="flex flex-col gap-5">
        <p>Please send us a message if you have any questions or concerns. Our normal response time is up to 48h.</p>

        <ContactForm />
      </section>
    </main>
  );
}
