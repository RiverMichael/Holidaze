import Logo from "../../../assets/holidaze_logo.png";

export default function Footer() {
  return (
    <footer className="bg-secondary md:rounded-lg md:shadow md:m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <figure className="mb-4 sm:mb-0">
            <img src={Logo} alt="Holidaze logotype" className="h-8" />
          </figure>
          <ul className="flex flex-wrap items-center gap-3 md:gap-6 text-sm font-medium mb-6 sm:mb-0">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <hr className="my-6 lg:my-8 w-full rounded border border-gray-300 " />
        <span className="block text-sm sm:text-center">Copyright &copy; 2024 | Michael Nilsson</span>
      </div>
    </footer>
  );
}
