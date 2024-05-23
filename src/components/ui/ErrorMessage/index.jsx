export default function ErrorMessage({ message = "Oooops! Something went wrong, please try again." }) {
  return <div className="text-center text-lg bg-neutral text-error border border-error rounded p-5 shadow mx-auto">{message}</div>;
}
