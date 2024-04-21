import LoginForm from "../../LoginForm";

export default function LoginPage() {
  return (
    <main className="flex flex-col gap-8 px-5 container max-w-sm mx-auto">
      <div>
        <h1>Login</h1>
        <p className="text-primary font-heading font-bold text-lg">to your account</p>
      </div>

      <section>
        <LoginForm />
      </section>
    </main>
  );
}
