import RegisterForm from "../../RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex flex-col gap-8 px-5 container max-w-sm">
      <div>
        <h1>Register</h1>
        <p className="text-primary font-heading font-bold text-lg">a new account</p>
      </div>

      <section>
        <RegisterForm />
      </section>
    </main>
  );
}
